import { AzureFunction, Context } from "@azure/functions";
import { CanvasApiError } from "@kth/canvas-api";
import { XMLParser } from "fast-xml-parser";
import { createCourseEnrollment } from "./canvasApi";

function ladokExtensionFieldMatch(
  extension: object[],
  matchObj: object
): boolean {
  for (let key of Object.keys(matchObj)) {
    const field = extension?.["ns0:extensionField"].find(
      (el) => el["ns0:fieldName"] === key
    );
    if (field["ns0:fieldValue"] !== matchObj[key]) {
      return false;
    }
  }

  return true;
}

export function isRegistration(membership: any): boolean {
  if (!membership) return false;

  const membershipIdType = membership?.["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const status = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (status !== "Active") return false;

  // TODO: refactor
  return (
    ladokExtensionFieldMatch(
      membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
      {
        Admitted: true,
        Registered: true,
        Break: false,
        Dropout: false,
        OriginEvent: "LADOK.AddRegistration",
      }
    ) ||
    ladokExtensionFieldMatch(
      membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
      {
        Admitted: true,
        Registered: true,
        Break: false,
        Dropout: false,
        OriginEvent: "LADOK.AddReRegistration",
      }
    )
  );
}

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  context.log("Message is", message);
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  // NOTE: This log message should be deleted if there are too many logs

  const membership = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];

  // Guard
  if (!isRegistration(membership)) {
    context.log("Message is not registration. Skipping...");
    return;
  }

  // Unpack values
  const courseRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];

  if (!courseRoundId || !studentId) {
    context.log(
      "This message doesn't include either activity round id or student id. Skipping..."
    );
    return;
  }

  // Process
  await createCourseEnrollment(courseRoundId, studentId).catch((err) =>
    canvasErrorHandler(context, err)
  );

  context.log("ServiceBus topic trigger function processed message", message);
};

export default serviceBusTopicTrigger;

function canvasErrorHandler(context: Context, err: { err?: Error }) {
  if (err.err instanceof CanvasApiError) {
    const errInner = err.err;
    /**
     * If Canvas replies 404 Not Found, this means that course couldn't be found.
     * If Canvas replise 400 Bad Request, this means that the student couldn't be found.
     *
     * These issues should be fixed during nightly batch updates so we consume this message.
     */
    if (errInner.code == 404 /* NOT FOUND */) {
      context.log("Canvas replied course not found, silently consuming");
      return;
    } else if (errInner.code == 400 /* BAD REQUEST */) {
      context.log("Canvas replied student not found, silently consuming");
      return;
    }
  }

  throw err;
}

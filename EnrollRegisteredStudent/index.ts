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

function isRegistration(membership: any): boolean {
  if (!membership) return false;

  const membershipIdType = membership?.["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const status = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (status !== "Active") return false;

  return ladokExtensionFieldMatch(
    membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
    {
      Admitted: true,
      Registered: true,
      Break: false,
      Dropout: false,
      OriginEvent: "LADOK.AddRegistration",
    }
  );
}

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  // NOTE: This log message should be deleted if there are too many logs
  context.log("Message is", jsonObj);

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
  await createCourseEnrollment(courseRoundId, studentId)
    .catch((err) => canvasErrorHandler(context, err));

  context.log("ServiceBus topic trigger function processed message", message);
};

export default serviceBusTopicTrigger;

function canvasErrorHandler(context: Context, err: {err?: Error}) {
  if (err.err instanceof CanvasApiError) {
    const errInner = err.err;
    /**
     * If Canvas replies Not Found, this means that either the student or
     * the course couldn't be found. This should be fixed during nightly
     * batch updates so we consume this message.
     * 
     * NOTE: We are not distinguising between student and course not
     * found.
     */
    if (errInner.code == 404 /* NOT FOUND */) {
      context.log("Canvas replied user or course not found, silently consuming");
      return;
    }
  }

  throw err;
}

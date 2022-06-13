import { AzureFunction, Context } from "@azure/functions";
import { XMLParser } from "fast-xml-parser";
import { createCourseEnrollment } from "./canvasApi";

function ladokExtensionFieldMatch(extensionArr, matchObj: object) : boolean {
  for (let key of Object.keys(matchObj)) {
    const field = extensionArr?.["ns0:extensionField"].reduce((curr, next) => curr || (next["ns0:fieldName"] === key ? next : undefined), undefined);
    if (field["ns0:fieldValue"] !== matchObj[key]) {
      return false;
    }
  }

  return true;
}

function isRegistration(jsonObject: any): boolean {
  const membershipIdType =
    jsonObject?.["ns0:membershipRecord"]?.["ns0:membership"]?.[
    "ns0:membershipIdType"
    ];
  if (membershipIdType !== "courseOffering") return false;

  const status = jsonObject?.["ns0:membershipRecord"]?.["ns0:membership"]?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (status !== "Active") return false;

  return ladokExtensionFieldMatch(
    jsonObject?.["ns0:membershipRecord"]?.["ns0:membership"]?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
    {
      Admitted: true,
      Registered: true,
      Break: false,
      Dropout: false,
      OriginEvent: "LADOK.AddRegistration"
    }
  );
}

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  if (!isRegistration(jsonObj)) {
    return;
  }

  // prettier-ignore
  const courseRoundId =
    jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"]?.["ns0:collectionSourcedId"];

  // prettier-ignore
  const studentId =
    jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"]?.["ns0:member"]?.["ns0:personSourcedId"];

  if (!courseRoundId || !studentId) {
    context.log(
      "This message doesn't include either activity round id or student id. Skipping..."
    );
    return;
  }

  await createCourseEnrollment(courseRoundId, studentId).catch((err) => {
    throw err;
  });
  // TODO: Handle errors better

  context.log("ServiceBus topic trigger function processed message", message);
};

export default serviceBusTopicTrigger;

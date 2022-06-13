import { AzureFunction, Context } from "@azure/functions";
import { XMLParser } from "fast-xml-parser";
import { createCourseEnrollment } from "./canvasApi";

function isRegistration(jsonObject: any): boolean {
  const membershipIdType =
    jsonObject?.["ns0:membershipRecord"]?.["ns0:membership"]?.[
      "ns0:membershipIdType"
    ];

  // TODO: Check more properties in the XML file
  return membershipIdType === "courseOffering";
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

import { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import { getMembership, ladokExtensionFieldMatch } from "../utils";

const studentRole = 3;

export function isRemoveActivityOccasionApplication(message: string): boolean {
  const membership = getMembership(message);
  return ladokExtensionFieldMatch(
    membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
    {
      OriginEvent: "LADOK.RemoveActivityOccasionApplication",
    }
  );
}

export async function removeActivityEnrollment(
  context: Context,
  message: string
): Promise<void> {
  const membership = getMembership(message);
  const activityRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];

  if (!activityRoundId || !studentId) {
    context.log(
      "Skipping! This message is missing 'activityRoundId' or 'studentId', so it isn't a message we can process."
    );
    return;
  }
  context.log(
    `Got message about student ${studentId} unrolled from exam ${activityRoundId}`
  );

  const studentEnrollments = [
    {
      section_id: `AKT.${activityRoundId}`,
      user_integration_id: studentId,
      status: "deleted",
      role_id: studentRole,
    },
    {
      section_id: `AKT.${activityRoundId}.FUNKA`,
      user_integration_id: studentId,
      status: "deleted",
      role_id: studentRole,
    },
  ];
  await canvasApi.sendEnrollments(studentEnrollments, context);

  context.log(
    `Removed enrollment of user ${studentId} from exam ${activityRoundId}`
  );
}

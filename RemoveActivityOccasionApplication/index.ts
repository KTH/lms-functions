import type { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import {
  ROLES,
  StudentEnrollment,
  getParsedMembership,
  ladokExtensionFieldMatch,
} from "../utils";

export function isRemoveActivityOccasionApplication(message: string): boolean {
  const membership = getParsedMembership(message);

  if (!membership) return false;

  return ladokExtensionFieldMatch(
    membership["ns0:member"]["ns0:role"]["ns0:extension"]["ns0:extensionField"],
    {
      OriginEvent: "LADOK.RemoveActivityOccasionApplication",
    }
  );
}

export async function removeActivityEnrollment(
  context: Context,
  message: string
): Promise<void> {
  const membership = getParsedMembership(message);

  if (!membership) {
    throw new Error("Could not parse membership");
  }
  const activityRoundId = membership["ns0:collectionSourcedId"];
  const studentId = membership["ns0:member"]["ns0:personSourcedId"];

  if (!activityRoundId || !studentId) {
    context.log.verbose(
      "Skipping! This message is missing 'activityRoundId' or 'studentId', so it isn't a message we can process."
    );
    return;
  }
  context.log.verbose(
    `Got message about student ${studentId} unrolled from exam ${activityRoundId}`
  );

  const studentEnrollments: StudentEnrollment[] = [
    {
      section_id: `AKT.${activityRoundId}`,
      user_integration_id: studentId,
      status: "deleted",
      role_id: ROLES.STUDENT,
    },
    {
      section_id: `AKT.${activityRoundId}.FUNKA`,
      user_integration_id: studentId,
      status: "deleted",
      role_id: ROLES.STUDENT,
    },
  ];
  await canvasApi.sendEnrollments(studentEnrollments, context);

  context.log.verbose(
    `Removed enrollment of user ${studentId} from exam ${activityRoundId}`
  );
}

export async function removeActivityEnrollmentIfApplicable(
  context: Context,
  message: string
) {
  if (isRemoveActivityOccasionApplication(message)) {
    context.log.info("Handle remove activity application message");
    await removeActivityEnrollment(context, message);
    context.log.verbose("Done handling remove activity application message");
    return true;
  } else {
    return false;
  }
}

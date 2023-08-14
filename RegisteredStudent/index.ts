import type { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import {
  ROLES,
  StudentEnrollment,
  getParsedMembership,
  ladokExtensionFieldMatch,
} from "../utils";

// TODO: This is shared by ProgramStudent/index.ts and RegisteredStudent/index.ts
export function isRegistration(message: string): boolean {
  const membership = getParsedMembership(message);
  if (!membership) return false;

  const membershipIdType = membership["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const ns0status = membership["ns0:member"]["ns0:role"]["ns0:status"];
  if (ns0status !== "Active") return false;

  const fields =
    membership["ns0:member"]["ns0:role"]["ns0:extension"]["ns0:extensionField"];
  const registrationMatcher = {
    Admitted: true,
    Registered: true,
    Break: false,
    Dropout: false,
  };

  return (
    ladokExtensionFieldMatch(fields, {
      ...registrationMatcher,
      OriginEvent: "LADOK.AddRegistration",
    }) ||
    ladokExtensionFieldMatch(fields, {
      ...registrationMatcher,
      OriginEvent: "LADOK.AddReRegistration",
    })
  );
}

export async function enrollRegisteredStudent(
  context: Context,
  message: string
): Promise<{ sisImportId: number }> {
  const membership = getParsedMembership(message);
  if (!membership) {
    throw new Error("Could not parse membership");
  }

  const courseRoundId = membership["ns0:collectionSourcedId"];
  const studentId = membership["ns0:member"]["ns0:personSourcedId"];
  const enrollments: StudentEnrollment[] = [
    {
      section_id: courseRoundId,
      user_integration_id: studentId,
      status: "active",
      role_id: ROLES.REGISTERED,
    },
    {
      section_id: courseRoundId,
      user_integration_id: studentId,
      status: "deleted",
      role_id: ROLES.ANTAGEN,
    },
  ];

  return canvasApi.sendEnrollments(enrollments, context);
}

export async function enrollRegisteredStudentIfApplicable(
  context: Context,
  message: string
) {
  if (isRegistration(message)) {
    context.log("Handle registration message");
    await enrollRegisteredStudent(context, message);
    context.log("Done handling registration message");
    return true;
  } else {
    return false;
  }
}

import { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import { getMembership, ladokExtensionFieldMatch } from "../utils";

export function isRegistration(message: string): boolean {
  const membership = getMembership(message);
  if (!membership) return false;

  const membershipIdType = membership?.["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const ns0status = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (ns0status !== "Active") return false;
  const extension = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"];
  const registrationMatcher = {
    Admitted: true,
    Registered: true,
    Break: false,
    Dropout: false,
  };

  return (
    ladokExtensionFieldMatch(extension, {
      ...registrationMatcher,
      OriginEvent: "LADOK.AddRegistration",
    }) ||
    ladokExtensionFieldMatch(extension, {
      ...registrationMatcher,
      OriginEvent: "LADOK.AddReRegistration",
    })
  );
}

export async function enrollRegisteredStudent(
  context: Context,
  message: string
): Promise<{ sisImportId: number }> {
  const membership = getMembership(message);

  const registeredStudentRole = 164;
  const antagenRole = 25;

  const courseRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];
  const enrollments = [
    {
      section_id: courseRoundId,
      user_integration_id: studentId,
      status: "active",
      role_id: registeredStudentRole,
    },
    {
      section_id: courseRoundId,
      user_integration_id: studentId,
      status: "deleted",
      role_id: antagenRole,
    },
  ];

  return canvasApi.sendEnrollments(enrollments, context);
}

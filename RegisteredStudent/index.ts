import { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import { getMembership } from "../utils";

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

export function isRegistration(message: string): boolean {
  const membership = getMembership(message);
  if (!membership) return false;

  const membershipIdType = membership?.["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const status = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (status !== "Active") return false;

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

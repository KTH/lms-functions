import { Context } from "vm";
import { getParsedMembership, ladokExtensionFieldMatch } from "../utils";
import { isRegistration } from "../RegisteredStudent";

export async function enrollRegisteredProgramStudentIfApplicable(
  context: Context,
  message: string
): Promise<boolean> {
  const data = _parseRegisteredProgramStudent(context, message);
  if (!data) {
    return false;
  }
  const { studentId, programCode } = data;
  enrollRegisteredProgramStudent(context, studentId, programCode);
  return true;
}

// Only exported for testability
export function _parseRegisteredProgramStudent(
  context: Context,
  message: string
): { studentId: string; programCode: string } | undefined {
  context;

  if (!isRegistration(message)) return undefined;

  const memberships = getParsedMembership(message);
  if (!memberships) {
    return undefined;
  }

  const fields =
    memberships["ns0:member"]["ns0:role"]["ns0:extension"][
      "ns0:extensionField"
    ];
  const registrationMatcher = {
    Admitted: true,
    Registered: true,
    Break: false,
    Dropout: false,
  };

  if (!ladokExtensionFieldMatch(fields, registrationMatcher)) {
    // This message is not about a registration, therefor it is not about program room enrollments
    return undefined;
  }

  // console.log(JSON.stringify(memberships, null, 2));

  const programCode = fields.find(
    (f) => f["ns0:fieldName"] === "participation.program.code"
  )?.["ns0:fieldValue"];
  const studentId = memberships["ns0:member"]["ns0:personSourcedId"];
  if (!programCode || !studentId) {
    return undefined;
  }
  return { studentId, programCode };
}

export function enrollRegisteredProgramStudent(
  context: Context,
  studentId: string,
  programCode: string
) {}

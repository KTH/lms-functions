import { Context } from "@azure/functions";
import { ROLES, getParsedMembership, ladokExtensionFieldMatch } from "../utils";
import { isRegistration } from "../RegisteredStudent";
import * as canvasApi from "../canvasApi";

export async function enrollRegisteredProgramStudentIfApplicable(
  context: Context,
  message: string
): Promise<boolean> {
  const data = _parseRegisteredProgramStudent(context, message);
  if (!data) {
    return false;
  }
  const { studentId, programCode } = data;
  context.log.info(`Enroll ${studentId} to program room ${programCode}`);

  const enrollments = [
    {
      section_id: `PROG.${programCode}`,
      user_integration_id: studentId,
      status: "active",
      role_id: ROLES.REGISTERED,
    },
  ];
  await canvasApi.sendEnrollments(enrollments, context);

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
    context.log.warn("Failed to parse memberships for registration message.");
    return undefined;
  }

  const role = memberships["ns0:member"]["ns0:role"];

  if (role["ns0:roleType"] !== "Learner") {
    context.log.verbose(`Role is ${role["ns0:roleType"]}, not "Learner"`);
    return undefined;
  }

  const fields = role["ns0:extension"]["ns0:extensionField"];
  const registrationMatcher = {
    Admitted: true,
    Registered: true,
    Break: false,
    Dropout: false,
  };

  if (!ladokExtensionFieldMatch(fields, registrationMatcher)) {
    context.log.verbose("Message is not about a registration");
    return undefined;
  }

  const programCode = fields.find(
    (f) => f["ns0:fieldName"] === "participation.program.code"
  )?.["ns0:fieldValue"];
  const studentId = memberships["ns0:member"]["ns0:personSourcedId"];
  if (!programCode || !studentId) {
    context.log.verbose("No student id or no programcode in message");
    return undefined;
  }
  return { studentId, programCode };
}

export function enrollRegisteredProgramStudent(
  context: Context,
  studentId: string,
  programCode: string
) {}

import { Context } from "vm";
import { getParsedMembership, ladokExtensionFieldMatch } from "../utils";
import { isRegistration } from "../RegisteredStudent";

export function enrollRegisteredProgramStudent(
  context: Context,
  message: string
) {}

export async function enrollRegisteredProgramStudentIfApplicable(
  context: Context,
  message: string
): Promise<boolean> {
  context;

  if (!isRegistration(message)) return false;

  const memberships = getParsedMembership(message);
  if (!memberships) {
    // Incomplete message
    throw new Error("Could not parse membership");
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
    return false;
  }

  if (true) {
    // This message does not contain a program code
    return false;
  }

  // The message is about a program registration, enroll student in program room
  enrollRegisteredProgramStudent(context, message);
  return true;
}

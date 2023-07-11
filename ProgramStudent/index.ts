import { Context } from "vm";
import { getParsedMembership, ladokExtensionFieldMatch } from "../utils";
import { isRegistration } from "../RegisteredStudent";

export async function enrollRegisteredProgramStudentIfApplicable(
  context: Context,
  message: string
): Promise<boolean> {
  context;

  if (!isRegistration(message)) return false;

  const memberships = getParsedMembership(message);
  if (!memberships) {
    throw new Error("Could not parse membership");
  }

  const fields =
    memberships["ns0:member"]["ns0:role"]["ns0:extension"]["ns0:extensionField"];
  const registrationMatcher = {
      Admitted: true,
      Registered: true,
      Break: false,
      Dropout: false,
    };

  if (!ladokExtensionFieldMatch(fields, registrationMatcher)) {
    return false;
  }
  
  return true;
}

import type { AzureFunction, Context } from "@azure/functions";
import { tryEnrollRegisteredProgramStudent } from "../ProgramStudent";

import { isRegistration, enrollRegisteredStudent } from "../RegisteredStudent";
import {
  isRemoveActivityOccasionApplication,
  removeActivityEnrollment,
} from "../RemoveActivityOccasionApplication";

async function removeActivityEnrollmentIfApplicable(
  context: Context,
  message: string
) {
  if (isRemoveActivityOccasionApplication(message)) {
    context.log("Handle remove activity application message");
    await removeActivityEnrollment(context, message);
    context.log("Done handling remove activity application message");
    return true;
  } else {
    return false;
  }
}

async function enrollRegisteredStudentIfApplicable(
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

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  const didA = await enrollRegisteredStudentIfApplicable(context, message);

  const didB = await removeActivityEnrollmentIfApplicable(context, message);

  const didC = await tryEnrollRegisteredProgramStudent(context, message);

  if (!didA && !didB && !didC) {
    context.log("Message is not relevant. Skipping...");
  }
};

export default serviceBusTopicTrigger;

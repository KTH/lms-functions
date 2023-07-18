import type { AzureFunction, Context } from "@azure/functions";
import { enrollRegisteredProgramStudentIfApplicable } from "../ProgramStudent";
import { enrollRegisteredStudentIfApplicable } from "../RegisteredStudent";
import { removeActivityEnrollmentIfApplicable } from "../RemoveActivityOccasionApplication";

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  try {
    context.log.verbose("Message is", message);

    const didA = await enrollRegisteredStudentIfApplicable(context, message);

    const didB = await removeActivityEnrollmentIfApplicable(context, message);

    const didC = await enrollRegisteredProgramStudentIfApplicable(
      context,
      message
    );

    if (!didA && !didB && !didC) {
      context.log.verbose("Message is not relevant. Skipping...");
    }
  } catch (e) {
    // Note: Azure functions will retry on exception, but we're not
    // sure it will log properly, so we log the error just in case.
    context.log.error(e);
    throw e;
  }
};

export default serviceBusTopicTrigger;

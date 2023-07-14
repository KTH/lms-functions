import type { AzureFunction, Context } from "@azure/functions";
import { enrollRegisteredProgramStudentIfApplicable } from "../ProgramStudent";
import { enrollRegisteredStudentIfApplicable } from "../RegisteredStudent";
import { removeActivityEnrollmentIfApplicable } from "../RemoveActivityOccasionApplication";

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  const didA = await enrollRegisteredStudentIfApplicable(context, message);

  const didB = await removeActivityEnrollmentIfApplicable(context, message);

  const didC = await enrollRegisteredProgramStudentIfApplicable(
    context,
    message
  );

  if (!didA && !didB && !didC) {
    context.log.verbose("Message is not relevant. Skipping...");
  }
};

export default serviceBusTopicTrigger;

import type { AzureFunction, Context } from "@azure/functions";
import { enrollRegisteredProgramStudentIfApplicable } from "../ProgramStudent";
import { enrollRegisteredStudentIfApplicable } from "../RegisteredStudent";
import { removeActivityEnrollmentIfApplicable } from "../RemoveActivityOccasionApplication";
import { getParsedMessage } from "../utils";

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  context.log("Message is ", message);
  const parsedMessage = getParsedMessage(message);
  context.log("Parsed message is: ", JSON.stringify(parsedMessage, null, 2));
  const didA = await enrollRegisteredStudentIfApplicable(context, message);

  const didB = await removeActivityEnrollmentIfApplicable(context, message);

  const didC = await enrollRegisteredProgramStudentIfApplicable(
    context,
    message
  );

  if (!didA && !didB && !didC) {
    context.log("Message is not relevant. Skipping...");
  }
};

export default serviceBusTopicTrigger;

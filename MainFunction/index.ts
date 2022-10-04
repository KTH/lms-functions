import { AzureFunction, Context } from "@azure/functions";

import { isRegistration, enrollRegisteredStudent } from "../RegisteredStudent";
import {
  isRemoveActivityOccasionApplication,
  removeActivityEnrollment,
} from "../RemoveActivityOccasionApplication";

const serviceBusTopicTrigger: AzureFunction = async function (
  context: Context,
  message: string
): Promise<void> {
  context.log("Message is", message);

  if (isRegistration(message)) {
    context.log("Handle registration message");
    await enrollRegisteredStudent(context, message);
    context.log("Done handling registration message");
    return;
  }

  if (isRemoveActivityOccasionApplication(message)) {
    context.log("Handle remove activity application message");
    await removeActivityEnrollment(context, message);
    context.log("Done handling remove activity application message");
    return;
  }

  context.log("Message is not relevant. Skipping...");
};

export default serviceBusTopicTrigger;

import { Context } from "@azure/functions"
import { removeEnrollment } from "../canvasApi";
import {getMembership} from "../utils";

// TODO: inparam is string!
export function isRemoveActivityOccasionApplication(message: string): boolean{
  const membership = getMembership(message)

  const extension = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"]?.["ns0:extensionField"]?.["ns0:fieldValue"]
  return  extension === "LADOK.RemoveActivityOccasionApplication"
}

export async function removeActivityEnrollment(context: Context, message: string): Promise<void> {

  const membership = getMembership(message)
  const activityRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];

  if (!activityRoundId || !studentId) {
    context.log("Skipping! This message is missing 'activityRoundId' or 'studentId', so it isn't a message we can process.");
    return;
  }

  context.log(`Got message about student ${studentId} unrolled from exam ${activityRoundId}`)
  await removeEnrollment(activityRoundId, studentId, context).catch(err => {throw err})
  context.log(`Removed enrollment of user ${studentId} from exam ${activityRoundId}`);
};


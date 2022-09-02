import { AzureFunction, Context } from "@azure/functions"
import { XMLParser } from "fast-xml-parser";

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, message: string): Promise<void> {

    // 1. Parse incomming mesage
    const parser = new XMLParser();
    const jsonObj = parser.parse(message);
    
    const tmpMembership = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];
    /* const activityRoundId = tmpMembership?.["ns0:collectionSourcedId"]; */
    /* const studentId = tmpMembership?.["ns0:member"]?.["ns0:personSourcedId"]; */

    const extension = tmpMembership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"]?.["ns0:extensionField"]?.["ns0:fieldValue"]

    switch( extension ){
      case "LADOK.RemoveActivityOccasionApplication":
        context.log('TODO: remove')
        break
      case "LADOK.AddRegistration":
      case "LADOK.AddReRegistration":
        context.log("TODO: enrollment")
        break
      default:
        context.log('Something else', extension)
    }

    if( extension !== "LADOK.RemoveActivityOccasionApplication") return 

      /* if (!activityRoundId || !studentId) { */
      /*     context.log("Skipping! This message is missing 'activityRoundId' or 'studentId', so it isn't a message we can process."); */
      /*     return; */
      /* } */

      /* context.log(`Got message about student ${studentId} unrolled from exam ${activityRoundId}`) */
      /* const result = await removeEnrollment(activityRoundId, studentId, context).catch(err => {throw err}) */
      /* context.log(`Removed enrollment of user ${studentId} from exam ${activityRoundId}`); */
};

export default serviceBusTopicTrigger;
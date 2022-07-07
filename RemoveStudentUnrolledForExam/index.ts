import { AzureFunction, Context } from "@azure/functions"
import { XMLParser } from "fast-xml-parser";
import { getKthId } from "./ug";
import { removeEnrollment } from "./canvasApi";

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, message: string): Promise<void> {
    // context.log('ServiceBus topic trigger function processed message', mySbMsg);

    // 1. Parse incomming mesage
    const parser = new XMLParser();
    const jsonObj = parser.parse(message);
    
    const tmpMembership = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];
    const activityRoundId = tmpMembership?.["ns0:collectionSourcedId"];
    const studentId = tmpMembership?.["ns0:member"]?.["ns0:personSourcedId"];

    if (!activityRoundId || !studentId) {
        context.log("Skipping! This message is missing 'activityRoundId' or 'studentId', so it isn't a message we can process.");
        return;
    }

    const sectionSisIds = [
        `AKT.${activityRoundId}`, 
        `AKT.${activityRoundId}.FUNKA`
    ]
    context.log(`Got message about student ${studentId} unrolled from exam ${activityRoundId}`)
    for await (const sectionSisId of sectionSisIds) {
        const result = await removeEnrollment(sectionSisId, studentId).catch(err => {throw err})
        // TODO: Handle errors better
        context.log(result)
    }
    context.log(`Removed enrollment of user ${studentId} from exam ${activityRoundId}`);
};

export default serviceBusTopicTrigger;

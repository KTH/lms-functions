import { AzureFunction, Context } from "@azure/functions"
import { XMLParser } from "fast-xml-parser";
import { getKthId } from "./ug";
import { getCourseEnrollment, removeEnrollment } from "./canvasApi";

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

    // 2. Call UG to get KTH ID
    const kthId = await getKthId(studentId);
    // If you want to experiment with a specific user
    // and don't have their LADOK id, you can just use this:
    // const kthId = '[enter kth id]';
    // context.log(activityRoundId, studentId, kthId);

    // 3. Get the enrollment id for the given course
    const res  = await getCourseEnrollment(activityRoundId, kthId)
        .catch((err) => { throw err });
        // TODO: Handle errors better

    const { id: enrollmentId, course_id: courseId } = res[0];
    // 4. Remove the enrollment
    await removeEnrollment(courseId, enrollmentId)
        .catch((err) => { throw err });
        // TODO: Handle errors better
    
    context.log(`Removed enrollment of user ${kthId} from course ${activityRoundId}`);
};

export default serviceBusTopicTrigger;

import { AzureFunction, Context } from "@azure/functions"
import { XMLParser } from "fast-xml-parser";
import {isRegistration, enrollRegisteredStudent} from "../EnrollRegisteredStudent";
import {isRemoveActivityOccasianApplicatoin} from "../RemoveStudentUnrolledForExam";

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, message: string): Promise<void> {

  context.log("Message is", message);
  // 1. Parse incomming message
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  const membership = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];

  if( isRegistration(membership)){
    context.log("Handle registration message")
    enrollRegisteredStudent(context, membership)
    return
  }


  if( isRemoveActivityOccasianApplicatoin(membership)){
    context.log("TODO: remove membership")
    return
  }


  context.log("Message is not relevant. Skipping...");
};

export default serviceBusTopicTrigger;

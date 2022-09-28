import { AzureFunction, Context } from "@azure/functions"

import { XMLParser } from "fast-xml-parser";
import {isRegistration, enrollRegisteredStudent} from "../RegisteredStudent";
import {isRemoveActivityOccasionApplication, removeActivityEnrollment} from "../RemoveActivityOccasionApplication";

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, message: string): Promise<void> {

  context.log("Message is", message);
  // 1. Parse incomming message
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  /* const membership = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"]; */

  if( isRegistration(jsonObj)){
  /*   context.log("Handle registration message") */
  /*   console.log('::::::::::::;',enrollRegisteredStudent) */
  /*   /1* await enrollRegisteredStudent(context, membership) *1/ */
  /*   context.log("Done handling registration message") */
  /*   return */
  }


  /* if( isRemoveActivityOccasianApplication(membership)){ */
  /*   context.log("Handle remove activity application message") */
  /*   await removeActivityEnrollment(context, membership) */
  /*   context.log("Done handling remove activity application message") */
  /*   return */
  /* } */


  context.log("Message is not relevant. Skipping...");
};

export default serviceBusTopicTrigger;

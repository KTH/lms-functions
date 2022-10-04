import { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import {getMembership, createEnrollmentsFile} from "../utils";


function ladokExtensionFieldMatch(
  extension: object[],
  matchObj: object
): boolean {
  for (let key of Object.keys(matchObj)) {
    const field = extension?.["ns0:extensionField"].find(
      (el) => el["ns0:fieldName"] === key
    );
    if (field["ns0:fieldValue"] !== matchObj[key]) {
      return false;
    }
  }

  return true;
}

export function isRegistration(message: string): boolean {
  const membership = getMembership(message)
  if (!membership) return false;

  const membershipIdType = membership?.["ns0:membershipIdType"];
  if (membershipIdType !== "courseOffering") return false;

  const status = membership?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  if (status !== "Active") return false;

  // TODO: refactor
  return (
    ladokExtensionFieldMatch(
      membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
      {
        Admitted: true,
        Registered: true,
        Break: false,
        Dropout: false,
        OriginEvent: "LADOK.AddRegistration",
      }
    ) ||
    ladokExtensionFieldMatch(
      membership?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"],
      {
        Admitted: true,
        Registered: true,
        Break: false,
        Dropout: false,
        OriginEvent: "LADOK.AddReRegistration",
      }
    )
  );
}


/* export async function _enrollRegisteredStudentActivityRound( */
/*   context: Context, */
/*   message: string */ 
/* ): Promise<{sisImportId: number}>{ */
/*   const membership = getMembership(message) */
/*   const now = Date.now() */
/*   const filePath = path.join(temporalDirectory, `enrollment_${now}.csv`); */
/*   context.log('Writing enrollment to file', filePath) */

/*   const writer = fs.createWriteStream(filePath); */
/*   const serializer = csv.format({ headers: true }); */

/*   // TODO: use new student role! */
/*   const registeredStudentRole = 164 */
/*   const antagenRole = 25 */ 

/*   const courseRoundId = membership?.["ns0:collectionSourcedId"]; */
/*   const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"]; */
/*   serializer.pipe(writer); */

/*   for await (const sectionId of [`AKT.${courseRoundId}`, `AKT.${courseRoundId}.FUNKA`]){ */

/*     // add registered student */
/*     serializer.write({ */
/*       section_id: sectionId, */ 
/*       user_integration_id: studentId, */
/*       status: "active", */
/*       role_id: registeredStudentRole, */
/*     }) */

/*     // remove admitted student */
/*     serializer.write({ */
/*       section_id: sectionId, */
/*       user_integration_id: studentId, */
/*       status: "deleted", */
/*       role_id: antagenRole, */
/*     }) */
/*   } */

/*   serializer.end(); */

/*   await new Promise((resolve, reject) => { */
/*     writer.on("finish", resolve); */
/*     writer.on("error", reject); */
/*   }); */
/*   context.log('Sending enrollments ', filePath) */

/*   const { body } = await canvasApi.sendEnrollments(filePath) */ 

/*   const url = new URL( */
/*     `/api/v1/accounts/1/sis_imports/${body.id}`, */
/*     process.env.CANVAS_API_URL */
/*   ); */
/*   /1* context.log(`Enrollments for ${groupName} sent to Canvas. Check ${url}`); *1/ */

/*   return { sisImportId: body.id }; */
/* } */

export async function enrollRegisteredStudent(
  context: Context,
  message: string 
): Promise<{sisImportId: number}>{
  const membership = getMembership(message)

  const registeredStudentRole = 164
  const antagenRole = 25 

  const courseRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];
  const enrollments = [{
    section_id: courseRoundId, 
    user_integration_id: studentId,
    status: "active",
    role_id: registeredStudentRole,
  },{
    section_id: courseRoundId,
    user_integration_id: studentId,
    status: "deleted",
    role_id: antagenRole,
  }]

  const filePath = await createEnrollmentsFile(enrollments)

  const { body } = await canvasApi.sendEnrollments(filePath) 

  const url = new URL(
    `/api/v1/accounts/1/sis_imports/${body.id}`,
    process.env.CANVAS_API_URL
  );
  context.log(`Enrollments sent to Canvas. Check ${url}`);

  // TODO: this code sends csv file to Canvas, but Canvas warns with not being able to find the user

  return { sisImportId: body.id };
}


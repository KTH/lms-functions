import { Context } from "@azure/functions";
import * as canvasApi from "../canvasApi";
import {CanvasApiError} from "@kth/canvas-api";
import {getMembership} from "../utils";


const csv = require("fast-csv");
const os = require("os");
const fs = require('fs')
const path = require("path");

const temporalDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "lms-enroll-registered-student-")
);


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
  const now = Date.now()
  const filePath = path.join(temporalDirectory, `enrollment_${now}.csv`);
  context.log('Writing enrollment to file', filePath)

  const writer = fs.createWriteStream(filePath);
  const serializer = csv.format({ headers: true });

  const registeredStudentRole = 164
  const antagenRole = 25 

  const courseRoundId = membership?.["ns0:collectionSourcedId"];
  const studentId = membership?.["ns0:member"]?.["ns0:personSourcedId"];
  serializer.pipe(writer);


  // add registered student
  serializer.write({
    section_id: courseRoundId, 
    user_integration_id: studentId,
    status: "active",
    role_id: registeredStudentRole,
  })

  // remove admitted student
  serializer.write({
    section_id: courseRoundId,
    user_integration_id: studentId,
    status: "deleted",
    role_id: antagenRole,
  })

  serializer.end();

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  context.log('Sending enrollments ', filePath)

  const { body } = await canvasApi.sendEnrollments(filePath) 

  const url = new URL(
    `/api/v1/accounts/1/sis_imports/${body.id}`,
    process.env.CANVAS_API_URL
  );
  context.log(`Enrollments sent to Canvas. Check ${url}`);

  // TODO: this code sends csv file to Canvas, but Canvas warns with not being able to find the user

  return { sisImportId: body.id };
}

function canvasErrorHandler(context: Context, err: { err?: Error }) {
  if (err.err instanceof CanvasApiError) {
    const errInner = err.err;
    /**
     * If Canvas replies 404 Not Found, this means that course couldn't be found.
     * If Canvas replise 400 Bad Request, this means that the student couldn't be found.
     *
     * These issues should be fixed during nightly batch updates so we consume this message.
     */
    if (errInner.code == 404 /* NOT FOUND */) {
      context.log("Canvas replied course not found, silently consuming");
      return;
    } else if (errInner.code == 400 /* BAD REQUEST */) {
      context.log("Canvas replied student not found, silently consuming");
      return;
    }
  }

  throw err;
}

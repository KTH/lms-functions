import CanvasApi from "@kth/canvas-api";

import { Context } from "@azure/functions"
import assert from "assert";

type Enrollment = {id:number, course_id: number, user:{integration_id:string}}

let _canvasApi: CanvasApi;
function getCanvasApi(){
  if (!process.env.CANVAS_API_URL) {
    throw new Error("Missing env-var CANVAS_API_URL");
  }
  _canvasApi = _canvasApi || new CanvasApi(
    process.env.CANVAS_API_URL,
    process.env.CANVAS_API_ADMIN_TOKEN
  );
  return _canvasApi
}

export async function sendEnrollments(filePath: string){
  return getCanvasApi().sisImport(filePath)
}

export async function createCourseEnrollment(
  courseRoundId: string,
  studentId: string
): Promise<[{ id: number; course_id: number }]> {
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.create
  // FIXME: this code does not remove the admitted enrollment, which means that students have double enrollments
  const res = await getCanvasApi() 
    .request<[{ id: number; course_id: number }]>(
      `sections/sis_section_id:${courseRoundId}/enrollments`,
      "POST",
      {
        enrollment: {
          user_id: `sis_integration_id:${studentId}`,
          role_id: 164,
          enrollment_state: "active",
          notify: false,
        },
      }
    )
    .catch((err) => {
      // FIXME: errors isn't logged properly, and should be fixed
      console.log(":::::::::::::::::: Error", err)
      console.log("------------------------------")
      const action = 'createCourseEnrollment';
      throw new CanvasError({action, courseRoundId, studentId, err});;
    });

  return res.body;
}

type TCanvasErrorParams = {
  action: string;
  courseRoundId: string;
  studentId: string;
  err: Error;
}

class CanvasError extends Error {
  err: Error;

  constructor({action, courseRoundId, studentId, err}: TCanvasErrorParams) {
    super(`Could not execute '${action}' for studentId: ${studentId}, courseRoundId: ${courseRoundId} -- ${err.message}`);
    this.err = err;
  }
}

/**
 * Get student course enrollment from Canvas.
 */
/* export async function getCourseEnrollments(activityRoundId: string, studentId: string) { */
export async function getCourseEnrollments(activityRoundId: string, studentId: string) : Promise<Enrollment[]>{
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.index
  // We need id of enrollment to be able to delete an enrollment. Without the id we can only inactivate an enrollment, but not completelly remove it 
  let getEnrollments = async (sectionId: string): Promise<Enrollment[]>=>{

    console.log(`sections/sis_section_id:${sectionId}/enrollments`)
    const res = await getCanvasApi().get<Enrollment[]>(
      `sections/sis_section_id:${sectionId}/enrollments`,
      {
        "type": ["StudentEnrollment"],
      }
    )
    return res.body.filter(enrollment => enrollment.user.integration_id === studentId)
  }

  // TODO: Handle errors better

  return [
    ... await getEnrollments(`AKT.${activityRoundId}`),
    ... await getEnrollments(`AKT.${activityRoundId}.FUNKA`)
  ]
}

/**
 * Remove course enrollment of studend in Canvas.
 */
export async function removeEnrollment(activityRoundId: string, studentId: string, context: Context) : Promise<void> {

  const enrollments = await getCourseEnrollments(activityRoundId, studentId)
  context.log(`Number of student enrollments found for user ${studentId}:${enrollments.length}`)

  for(const enrollment of await enrollments){
    // Enrollments are deleted from the course, not from the section
    await getCanvasApi().request(
      `courses/${enrollment.course_id}/enrollments/${enrollment.id}?task=delete`,
        "DELETE",
    ).catch((err) => { throw err });
  }
  // TODO: Handle errors better
}

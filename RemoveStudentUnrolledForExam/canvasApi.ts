import CanvasApi from "@kth/canvas-api";
import { Context } from "@azure/functions"
import assert from "assert";

let canvasApi: CanvasApi;

if (process.env.CANVAS_API_URL) {
  canvasApi = new CanvasApi(
    process.env.CANVAS_API_URL,
    process.env.CANVAS_API_ADMIN_TOKEN
  );
} else {
  throw(new Error("Missing env-var CANVAS_API_URL"));
}

type Enrollment = {id:number, course_id: number, user:{integration_id:string}}

/**
 * Get student course enrollment from Canvas.
 */
/* export async function getCourseEnrollments(activityRoundId: string, studentId: string) { */
export async function getCourseEnrollments(activityRoundId: string, studentId: string) : Promise<Enrollment[]>{
  assert(canvasApi, "Missing canvasApi");
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.index
  // We need id of enrollment to be able to delete an enrollment. Without the id we can only inactivate an enrollment, but not completelly remove it 
  let getEnrollments = async (sectionId: string): Promise<Enrollment[]>=>{

    console.log(`sections/sis_section_id:${sectionId}/enrollments`)
    const res = await canvasApi.get<Enrollment[]>(
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
  assert(canvasApi, "Missing canvasApi");

  const enrollments = await getCourseEnrollments(activityRoundId, studentId)
  context.log(`Number of student enrollments found for user ${studentId}:${enrollments.length}`)

  for(const enrollment of await enrollments){
    // Enrollments are deleted from the course, not from the section
    await canvasApi.request(
      `courses/${enrollment.course_id}/enrollments/${enrollment.id}?task=delete`,
        "DELETE",
    ).catch((err) => { throw err });
  }
  // TODO: Handle errors better
}

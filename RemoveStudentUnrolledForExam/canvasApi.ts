import CanvasApi from "@kth/canvas-api";
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

/**
 * Get student course enrollment from Canvas.
 */
/* export async function getCourseEnrollments(activityRoundId: string, studentId: string) { */
export async function getCourseEnrollments(activityRoundId: string, studentId: string) : Promise<[{id: number}]>{
  assert(canvasApi, "Missing canvasApi");
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.index
  // kthId is called sis_user_id in KTH Canvas
  // We need id of enrollment for the current use case so I passing it to the generic
  let getEnrollments = async (sectionId: string): Promise<[{id:number}]>=>{

    console.log(`sections/sis_section_id:${sectionId}/enrollments`)
    let res = await canvasApi.get<[{id:number}]>(

    `sections/sis_section_id:${sectionId}/enrollments`,
    {
    /*   "user_id": `sis_user_id:${studentId}`, */
      "type": ["StudentEnrollment"],
    }
  )
  return res.body;
  }

  // TODO: Handle errors better

  /* return [ */
    return getEnrollments(`AKT.${activityRoundId}`)//, 
    /* await getEnrollment(`AKT.${activityRoundId}.FUNKA`)] */ 
}

/**
 * Remove course enrollment of studend in Canvas.
 */
export async function removeEnrollment(courseId: string, studentId: string) : Promise<void> {
  assert(canvasApi, "Missing canvasApi");

const enrollments = await getCourseEnrollments(courseId, studentId)
console.log(enrollments)

/* const enrollments1 = await canvasApi.listItems(`courses/sis_course_id:${courseId}/enrollments`).toArray(); */
/* const enrollments2 = await canvasApi.listItems(`courses/sis_course_id:${courseId}/enrollments`).toArray(); */
/* const usersEnrollments = [...enrollments1, enrollments2].filter(enrollment => enrollment.user?.integration_id ===studentId) */
/* console.log(usersEnrollments) */
// Now `courses` is an iterator that goes through every course
  /* const res = await canvasApi.request( */
  /*   `courses/${courseId}/enrollments/${studentId}?task=delete`, */
  /*   "DELETE", */
  /* ).catch((err) => { throw err }); */
  // TODO: Handle errors better
}

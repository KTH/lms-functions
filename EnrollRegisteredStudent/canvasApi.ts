import CanvasApi from "@kth/canvas-api";
import assert from "node:assert";

let canvasApi: CanvasApi;

if (process.env.CANVAS_API_URL) {
  canvasApi = new CanvasApi(
    process.env.CANVAS_API_URL,
    process.env.CANVAS_API_ADMIN_TOKEN
  );
} else {
  throw new Error("Missing env-var CANVAS_API_URL");
}

export async function createCourseEnrollment(
  courseRoundId: string,
  studentId: string
): Promise<[{ id: number; course_id: number }]> {
  assert(canvasApi, "Missing canvasApi");
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.create
  // FIXME: this code does not remove the admitted enrollment, which means that students have double enrollments
  const res = await canvasApi
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

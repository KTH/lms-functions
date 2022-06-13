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

/**
 * Get student course enrollment from Canvas.
 */
export async function createCourseEnrollment(
  courseRoundId: string,
  studentId: string
): Promise<[{ id: number; course_id: number }]> {
  assert(canvasApi, "Missing canvasApi");
  // https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.create
  const res = await canvasApi
    .request<[{ id: number; course_id: number }]>(
      `sections/sis_section_id:${courseRoundId}/enrollments`,
      "POST",
      {
        enrollment: {
          user_id: `sis_integration_id:${studentId}`,
          role_id: 3,
          enrollment_state: "active",
          notify: false,
        },
      }
    )
    .catch((err) => {
      throw err;
    });

  return res.body;
}

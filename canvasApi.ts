import CanvasApi from "@kth/canvas-api";

import { Context } from "@azure/functions";
import { StudentEnrollment } from "./utils";

const csv = require("fast-csv");
const os = require("os");
const fs = require("fs");
const path = require("path");

const temporalDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "lms-functions")
);

let _canvasApi: CanvasApi;
function getCanvasApi() {
  if (!process.env.CANVAS_API_URL) {
    throw new Error("Missing env-var CANVAS_API_URL");
  }
  _canvasApi =
    _canvasApi ||
    new CanvasApi(
      process.env.CANVAS_API_URL,
      process.env.CANVAS_API_ADMIN_TOKEN
    );
  return _canvasApi;
}

// This function doesn't stream data, which is fine as long as we're working with small number of enrollments per message
export async function createEnrollmentsFile(
  studentEnrollments: Array<StudentEnrollment>
): Promise<string> {
  const filePath = path.join(temporalDirectory, `enrollment_${Date.now()}.csv`);
  const writer = fs.createWriteStream(filePath);
  const serializer = csv.format({ headers: true });
  serializer.pipe(writer);

  studentEnrollments.forEach((enrollment) => serializer.write(enrollment));

  serializer.end();

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  return filePath;
}

export async function sendEnrollments(
  studentEnrollments: Array<StudentEnrollment>,
  context: Context
) {
  const filePath = await createEnrollmentsFile(studentEnrollments);

  const { body } = await getCanvasApi().sisImport(filePath);

  const url = new URL(
    `/api/v1/accounts/1/sis_imports/${body.id}`,
    process.env.CANVAS_API_URL
  );
  context.log(`Enrollments sent to Canvas. Check ${url}`);

  return { sisImportId: body.id };
}

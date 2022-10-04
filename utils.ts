import { XMLParser } from "fast-xml-parser";


const csv = require("fast-csv");
const os = require("os");
const fs = require('fs')
const path = require("path");

const temporalDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "lms-functions")
);

export function getMembership(message:string): any{
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);
  return  jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"]; 
}

// Only students have a user_integration_id
type StudentEnrollment = {
  section_id, 
  user_integration_id, 
  status, 
  role_id}

  // This function doesn't stream data, which is fine as long as we're working with small number of enrollments per message
export async function createEnrollmentsFile(studentEnrollments: Array<StudentEnrollment>): Promise<string>{
  const filePath = path.join(temporalDirectory, `enrollment_${Date.now()}.csv`);
  const writer = fs.createWriteStream(filePath);
  const serializer = csv.format({ headers: true });
  serializer.pipe(writer);

  studentEnrollments.forEach( enrollment => serializer.write(enrollment))

  serializer.end();

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  return filePath 
}

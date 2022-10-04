import { XMLParser } from "fast-xml-parser";

export function getMembership(message: string): any {
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);
  return jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];
}

// Only students have a user_integration_id
export type StudentEnrollment = {
  section_id;
  user_integration_id;
  status;
  role_id;
};

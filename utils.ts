import { XMLParser } from "fast-xml-parser";

export function ladokExtensionFieldMatch(
  extension: object[],
  matchObj: object
): boolean {
  for (const key of Object.keys(matchObj)) {
    let extensionField = extension?.["ns0:extensionField"];

    // If there is only one extensionField in the message, the xml converter handles it as an object, but usually there are more then one and the converter converts it to an array. Make sure we always have an array.
    if (!Array.isArray(extensionField)) {
      extensionField = [extensionField];
    }

    const field = extensionField.find((el) => el["ns0:fieldName"] === key);
    if (field["ns0:fieldValue"] !== matchObj[key]) {
      return false;
    }
  }

  return true;
}

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

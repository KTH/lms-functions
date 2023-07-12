import { XMLParser } from "fast-xml-parser";

interface LadokExtensionField {
  "ns0:fieldName": string;
  "ns0:fieldType": string;
  "ns0:fieldValue": any;
}

interface LadokMembership {
  "ns0:membershipIdType"?: string;

  /** Activity or course round ID */
  "ns0:collectionSourcedId": string;

  "ns0:member": {
    "ns0:role": {
      "ns0:roleType"?: string,
      "ns0:status"?: string;
      "ns0:extension": {
        "ns0:extensionField": LadokExtensionField[];
      };
    };

    /** Student ID */
    "ns0:personSourcedId": string;
  };
}

/** Check if an object is LadokExtension */
export function isLadokExtensionField(
  obj: unknown
): obj is LadokExtensionField {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const ladokExtension = obj as LadokExtensionField;

  return (
    typeof ladokExtension?.["ns0:fieldName"] === "string" &&
    typeof ladokExtension?.["ns0:fieldType"] === "string" &&
    ladokExtension?.["ns0:fieldValue"] !== undefined
  );
}

export function ladokExtensionFieldMatch(
  extensionFields: LadokExtensionField[],
  matchObj: Record<string, string | number | boolean>
): boolean {
  for (const key of Object.keys(matchObj)) {
    const field = extensionFields.find((el) => el["ns0:fieldName"] === key);

    if (!field) {
      return false;
    }

    if (field["ns0:fieldValue"] !== matchObj[key]) {
      return false;
    }
  }

  return true;
}

export function getMembership(message: string): unknown {
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);
  return jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];
}

function parseExtensionFields(obj: unknown): LadokExtensionField[] {
  if (isLadokExtensionField(obj)) {
    return [obj];
  }

  if (Array.isArray(obj)) {
    return obj.filter(isLadokExtensionField);
  }

  return [];
}

export function getParsedMembership(message: string): LadokMembership | null {
  const parser = new XMLParser();
  const jsonObj = parser.parse(message);

  const unparsed = jsonObj?.["ns0:membershipRecord"]?.["ns0:membership"];

  if (!unparsed) {
    return null;
  }

  const roleType = unparsed?.["ns0:member"]?.["ns0:role"]?.["ns0:roleType"];
  const status = unparsed?.["ns0:member"]?.["ns0:role"]?.["ns0:status"];
  const extensionFields = parseExtensionFields(
    unparsed?.["ns0:member"]?.["ns0:role"]?.["ns0:extension"]?.[
      "ns0:extensionField"
    ]
  );
  const personSourceId = unparsed?.["ns0:member"]?.["ns0:personSourcedId"];

  if (typeof personSourceId !== "string") {
    return null;
  }

  const parsed: LadokMembership = {
    "ns0:collectionSourcedId": unparsed["ns0:collectionSourcedId"],
    "ns0:membershipIdType": unparsed["ns0:membershipIdType"],
    "ns0:member": {
      "ns0:role": {
        "ns0:roleType": roleType,
        "ns0:status": status,
        "ns0:extension": {
          "ns0:extensionField": extensionFields,
        },
      },
      "ns0:personSourcedId": personSourceId,
    },
  };

  return parsed;
}

export enum ROLES {
  STUDENT = 3,
  ANTAGEN = 25,
  REGISTERED = 164,
}

// Only students have a user_integration_id
export interface StudentEnrollment {
  section_id: string;
  user_integration_id: string;
  status: string;
  role_id: ROLES;
}

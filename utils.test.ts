import { isLadokExtensionField } from "./utils";

describe("isLadokExtensionField", () => {
  test("should return true for valid LadokExtensionField object", () => {
    const obj = {
      "ns0:fieldName": "someFieldName",
      "ns0:fieldType": "someFieldType",
      "ns0:fieldValue": "someFieldValue",
    };
    expect(isLadokExtensionField(obj)).toBe(true);
  });

  test("should return `false` if missing `fieldValue`", () => {
    const obj = {
      "ns0:fieldName": "someFieldName",
      "ns0:fieldType": "someFieldType",
    };
    expect(isLadokExtensionField(obj)).toBe(false);
  });

  test("should return false for non-object input", () => {
    expect(isLadokExtensionField("not an object")).toBe(false);
  });

  test("should return false for null input", () => {
    expect(isLadokExtensionField(null)).toBe(false);
  });
});

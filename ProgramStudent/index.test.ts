import { Context } from "@azure/functions";
import {
  generateLisMessage,
  generateBoolExtField,
  generateStrExtField,
} from "../__test__/lis.test.utils";
import {
  enrollRegisteredProgramStudentIfApplicable,
  _parseRegisteredProgramStudent,
} from "./index";

const contextMock = { log: () => {} } as Context;

describe("Parse program registration messages or skip", () => {
  test("is skipped by registration message without program code", async () => {
    const message = generateLisMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
    ]);

    expect(
      await enrollRegisteredProgramStudentIfApplicable(contextMock, message)
    ).toBeFalsy();
  });

  test("is skipped if user is not Learner", async () => {
    const message = generateLisMessage(
      [
        generateBoolExtField("Admitted", true),
        generateBoolExtField("Registered", true),
        generateBoolExtField("Break", false),
        generateBoolExtField("Dropout", false),
        generateStrExtField("participation.program.code", "CDATE"),
      ],
      "Teacher"
    );
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeFalsy();
  });

  test("is skipped by message without registration", async () => {
    const message = generateLisMessage([], "Learner", "noop");
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeFalsy();
  });

  test("is skipped if Dropout is true", async () => {
    const message = generateLisMessage([generateBoolExtField("Dropout", true)]);
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeFalsy();
  });

  test("registration message with program code is correctly parsed", async () => {
    const message = generateLisMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
      generateStrExtField("participation.program.code", "CDATE"),
    ]);

    const result = _parseRegisteredProgramStudent(contextMock, message);
    expect(result).toStrictEqual({
      studentId: "704b782e-b573-11e7-96e6-896ca17746d1",
      programCode: "CDATE",
    });
  });
});

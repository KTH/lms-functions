import { Context } from "vm";
import {
  generateLisMessage,
  generateBoolExtField,
  generateStrExtField,
} from "../lis.test.utils";
import { enrollRegisteredProgramStudentIfApplicable } from "./index";

const contextMock = { log: () => { } } as Context;

describe("programroom registration", () => {
  test("is NOT triggered by registration message without program code", async () => {
    const message = generateLisMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
    ]);

    expect(
      await enrollRegisteredProgramStudentIfApplicable(
        contextMock,
        message
      )
    ).toBeFalsy();
  });

  test("is NOT triggered by message without registration", async () => {
    const message = generateLisMessage([], "Learner", "noop");
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeFalsy();
  });

  test("is NOT triggered if DropOut is true", async () => {
    const message = generateLisMessage([
      generateBoolExtField("Dropout", true),
    ]);
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeFalsy();
  });

  test("is triggered by registration message with program code", async () => {
    const message = generateLisMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
      generateStrExtField("participation.program.code", "CDATE"),
    ]);

    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      message
    );
    expect(result).toBeTruthy();
  });
  test.todo("is NOT triggered by message without registration");
  test.todo("produces proper output when receiving a valid message");
});

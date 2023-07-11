import { Context } from "vm";
import {
  generateMessage,
  generateBoolExtField,
  generateStrExtField,
} from "../lis.test.messages";
import { enrollRegisteredProgramStudentIfApplicable } from "./index";

const contextMock = { log: () => {} } as Context;

describe("programroom registration", () => {
  test("is not triggered by registration message without program code", async () => {
    const registrationMessageWithoutProgramCode = generateMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
    ]);

    expect(
      await enrollRegisteredProgramStudentIfApplicable(
        contextMock,
        registrationMessageWithoutProgramCode
      )
    ).toBeFalsy();
  });
  test("is not triggered by message without registration", async () => {
  });
  test("is triggered by registration message with program code", async () => {
    const registrationMessageWithProgram = generateMessage([
      generateBoolExtField("Admitted", true),
      generateBoolExtField("Registered", true),
      generateBoolExtField("Break", false),
      generateBoolExtField("Dropout", false),
      generateStrExtField("participation.program.code", "CDATE"),
    ]);
    
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      registrationMessageWithProgram
    );
    expect(result).toBeTruthy();
  });
  test.todo("is not triggered by message without registration");
  test.todo("produces proper output when receiving a valid message");
});

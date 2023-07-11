import { Context } from "vm";
import {
  registrationMessageWithProgram,
  registrationMessageWithoutProgramCode,
} from "../lis.test.messages";
import { enrollRegisteredProgramStudentIfApplicable } from "./index";

const contextMock = { log: () => {} } as Context;

describe("programroom registration", () => {
  test("is not triggered by registration message without program code", async () => {
    expect(
      await enrollRegisteredProgramStudentIfApplicable(
        contextMock,
        registrationMessageWithoutProgramCode
      )
    ).toBeFalsy();
  });
  test("is triggered by registration message with program code", async () => {
    const result = await enrollRegisteredProgramStudentIfApplicable(
      contextMock,
      registrationMessageWithProgram
    );
    expect(result).toBeTruthy();
  });
  test.todo("is not triggered by message without registration");
  test.todo("produces proper output when receiving a valid message");
});

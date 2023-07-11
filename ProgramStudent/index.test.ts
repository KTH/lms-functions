import { Context } from "vm";
import { registrationMessageWithoutProgramCode } from "../lis.test.messages";
import { enrollRegisteredProgramStudentIfApplicable } from "./index";

describe("programroom registration", () => {
  test.todo("is triggered by registration message with program code");
  test("is not triggered by registration message without program code", async () => {
    expect(
      await enrollRegisteredProgramStudentIfApplicable(
        { log: () => {} } as Context,
        registrationMessageWithoutProgramCode
      )
    ).toBeFalsy();
  });
  test.todo("is not triggered by message without registration");
});

import { transformRaceToTable } from "~/lib/races/utils/transform-data";
import { transformUserResultsToTable } from "~/lib/user/utils/transformIntoTable";
import { authenticator } from "./auth.server";
import { loginSchema } from "./login-form";
import { RegisterSchema } from "./register-form";
export * from "./session.server";

export {
  RegisterSchema,
  authenticator,
  loginSchema,
  transformRaceToTable,
  transformUserResultsToTable,
};

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
  rememberMe: z.boolean(),
});

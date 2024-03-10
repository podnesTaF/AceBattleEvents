import { passwordValidator } from "@/src/shared/lib";
import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().refine(passwordValidator, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  email: z.string().email(),
  confirm: z.string().min(6).max(50),
});

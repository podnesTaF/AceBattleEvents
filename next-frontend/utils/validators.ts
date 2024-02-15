"use client";

import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  remember: z.boolean(),
});

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  email: z.string().email(),
  confirm: z.string().min(6).max(50),
});

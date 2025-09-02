import { z } from "zod";

import { password_min_length } from "@/lib/config/auth";

export const loginSchema = z.object({
  email: z.email().min(1, {
    message: "Enter email.",
  }),
  password: z.string().min(password_min_length, {
    message: "Enter email.",
  }),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Enter username.",
      })
      .trim()
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters .",
      }),
    username: z
      .string()
      .min(1, {
        message: "Enter username.",
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and numbers.",
      }),
    email: z.string().email({
      message: "Enter a valid email.",
    }),
    password: z.string().min(password_min_length, {
      message: "Enter password.",
    }),
    confirmPassword: z.string().min(password_min_length, {
      message: "Confirm your password.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

// export type LoginSchemaType = z.infer<typeof loginSchema>;
// export type SignupSchemaType = z.infer<typeof signupSchema>;

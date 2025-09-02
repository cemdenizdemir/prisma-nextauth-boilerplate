import { z } from "zod";

const passwordLength = 1;

export const loginSchema = z.object({
  email: z.email().min(1, {
    message: "Enter email.",
  }),
  password: z.string().min(passwordLength, {
    message: "Enter email.",
  }),
});

export const signupSchema = z
  .object({
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
    password: z.string().min(passwordLength, {
      message: "Enter password.",
    }),
    confirmPassword: z.string().min(passwordLength, {
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

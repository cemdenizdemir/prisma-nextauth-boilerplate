"use server";
import { signupService } from "@/lib/services/authService";
import { signupSchema } from "@/types/authentication";
// import { sanitizeInput } from "@/lib/utils/sanitizeInput";
import { z } from "zod";

export async function signupAction(data: z.infer<typeof signupSchema>) {
  // const sanitizedData = sanitizeInput(data);
  // const parsed = signupSchema.safeParse(sanitizedData);

  const parsed = signupSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  const { confirmPassword, ...userData } = parsed.data;

  return await signupService({ data: userData });
}

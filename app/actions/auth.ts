"use server";
import { signupService } from "@/lib/services/authService";
import { signupSchema } from "@/types/authentication";
import { z } from "zod";

export async function signupAction(data: z.infer<typeof signupSchema>) {
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  return await signupService(parsed.data);
}

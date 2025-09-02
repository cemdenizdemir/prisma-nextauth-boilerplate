// lib/services/authService.ts
import bcrypt from "bcrypt";
import db from "@/lib/prisma"; // Your Prisma/Drizzle client

export async function signupService({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  // const hashedPassword = await bcrypt.hash(password, 10);

  // const user = await db.user.create({
  //   data: { username, email, password: hashedPassword },
  // });

  // return { success: true, userId: user.id };
  console.log("auth service running");
  return 111;
}

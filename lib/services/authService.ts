// lib/services/authService.ts
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Your Prisma/Drizzle client
import { bcrypt_salt_rounds } from "../config/auth";
import { signIn } from "next-auth/react";

export async function signupService({
  // username,
  // email,
  // password,
  data,
}: {
  // username: string;
  // email: string;
  // password: string;
  data: any;
}) {
  const { email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, message: "Email already in use" };

    // if (existingUser.password) {
    //   return { success: false, message: "Email already in use with password" };
    // } else {
    //   const hashed = await bcrypt.hash(data.password, bcrypt_salt_rounds);

    //   const user = await prisma.user.update({
    //     where: { email: email },
    //     data: {
    //       username,
    //       password: hashed,
    //     },
    //   });

    //   return { success: !!user };
    // }
  }
  const hashedPassword = await bcrypt.hash(password, bcrypt_salt_rounds);

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  // await prisma.account.create({
  //   data: {
  //     userId: user.id,
  //     type: "credentials",
  //     provider: "credentials",
  //     providerAccountId: user.id, // unique identifier
  //   },
  // });

  return { success: !!user, message: "User has been created", user };
}

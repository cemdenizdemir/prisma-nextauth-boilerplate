"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function checkServerSession() {
  const session = await getServerSession(authOptions);
  return session ?? null;
}

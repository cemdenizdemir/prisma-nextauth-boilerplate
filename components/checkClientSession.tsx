"use client";

import { useSession } from "next-auth/react";

export default function checkClientSession() {
  const { data: session } = useSession();

  return session;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function loggerMiddleware(req: NextRequest) {
  const date = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, " UTC");
  console.log(`[${date}] -> ${req.method} -> ${req.nextUrl.pathname}`);
  return NextResponse.next();
}

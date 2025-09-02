import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middleware/nextauth";
// Example: import { loggerMiddleware } from "./lib/middlewares/logger";
// Example: import { rateLimitMiddleware } from "./lib/middlewares/rateLimit";

const middlewares = [
  authMiddleware,
  // loggerMiddleware,
  // rateLimitMiddleware,
];

export default async function middleware(req: NextRequest) {
  for (const mw of middlewares) {
    const result = await mw(req);
    if (result) return result; // Stop at first middleware that returns a response
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};

import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middleware/nextauth";
import { loggerMiddleware } from "./lib/middleware/logger";
// Example: import { rateLimitMiddleware } from "./lib/middlewares/rateLimit";

const middlewares = [
  authMiddleware,
  loggerMiddleware,
  // rateLimitMiddleware,
];

export default async function middleware(req: NextRequest) {
  let response: NextResponse | undefined;

  for (const mw of middlewares) {
    const result = await mw(req);

    // If this middleware gave a redirect/response, keep it
    if (result && !response) {
      response = result;
    }
  }

  // If some middleware decided to block, return that, otherwise continue
  return response ?? NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};

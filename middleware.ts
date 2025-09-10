import { chain } from "@/lib/middlewares/chain";
import { authMiddleware } from "@/lib/middlewares/nextauth";
import { loggerMiddleware } from "@/lib/middlewares/logger";
import { rateLimiterMiddleware } from "@/lib/middlewares/rateLimiter";

export default chain([authMiddleware, loggerMiddleware, rateLimiterMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@/lib/middlewares/nextauth";
// import { loggerMiddleware } from "@/lib/middlewares/logger";
// import { rateLimiterMiddleware } from "@/lib/middlewares/rateLimiter";

// type MW = (req: NextRequest) => Promise<NextResponse | void>;

// const middlewares: MW[] = [
//   rateLimiterMiddleware,
//   authMiddleware,
//   loggerMiddleware,
// ];

// export default async function middleware(req: NextRequest) {
//   let response: NextResponse | undefined;

//   for (const mw of middlewares) {
//     const result = await mw(req);

//     // If this middleware gave a redirect/response, keep it
//     if (result) {
//       response = result;
//     }
//   }

//   // If some middleware decided to block, return that, otherwise continue
//   return response ?? NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
// };

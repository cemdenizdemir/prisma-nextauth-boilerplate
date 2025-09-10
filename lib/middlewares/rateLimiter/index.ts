import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { rateLimiter } from "./limiter";
import { getUserIPFromHeaders } from "./ip";
import { CustomMiddleware } from "../chain";

export function rateLimiterMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const ip = getUserIPFromHeaders(request);

    try {
      // Consume 1 point per request
      const rlRes = await rateLimiter.consume(ip, 1);

      // Pass-through with informative headers
      const res = NextResponse.next();
      res.headers.set("X-RateLimit-Limit", "4");
      res.headers.set("X-RateLimit-Remaining", String(rlRes.remainingPoints));
      res.headers.set("Retry-After", "0");

      return middleware(request, event, res);
    } catch (rej: any) {
      const msBeforeNext = Math.max(0, rej?.msBeforeNext ?? 0);
      const seconds = Math.ceil(msBeforeNext / 1000);

      return NextResponse.json(
        { message: "Too many requests." },
        {
          status: 429,
          headers: {
            "Retry-After": String(seconds),
            "X-RateLimit-Limit": "4",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  };
}

// import { NextResponse, type NextRequest } from "next/server";
// import { rateLimiter } from "./limiter";
// import { getUserIPFromHeaders } from "./ip";

// export async function rateLimiterMiddleware(req: NextRequest) {
//   const ip = getUserIPFromHeaders(req);
//   try {
//     // consume 1 point per request
//     const rlRes = await rateLimiter.consume(ip, 1);

//     // pass-through with informative headers
//     const res = NextResponse.next();
//     res.headers.set("X-RateLimit-Limit", "4");
//     res.headers.set("X-RateLimit-Remaining", String(rlRes.remainingPoints));
//     // RateLimiterMemory doesn't expose reset epoch; approximate using duration
//     res.headers.set("Retry-After", "0");
//     return res;
//   } catch (rej: any) {
//     const msBeforeNext = Math.max(0, rej?.msBeforeNext ?? 0);
//     const seconds = Math.ceil(msBeforeNext / 1000);
//     return NextResponse.json(
//       { message: "Too many requests." },
//       {
//         status: 429,
//         headers: {
//           "Retry-After": String(seconds),
//           "X-RateLimit-Limit": "4",
//           "X-RateLimit-Remaining": "0",
//         },
//       }
//     );
//   }
// }

import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { CustomMiddleware } from "./chain";

export function loggerMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d+Z$/, " UTC");

    console.log(
      `[${date}] -> ${request.method} -> ${request.nextUrl.pathname}`
    );

    // Continue to the next middleware in the chain
    return middleware(request, event, response);
  };
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function loggerMiddleware(req: NextRequest) {
//   const date = new Date()
//     .toISOString()
//     .replace("T", " ")
//     .replace(/\.\d+Z$/, " UTC");
//   console.log(`[${date}] -> ${req.method} -> ${req.nextUrl.pathname}`);
//   return NextResponse.next();
// }

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth middleware:
 * - Allows public pages: /login, /signup, /api/auth/*
 * - Redirects authenticated users away from /login & /signup to /
 * - Redirects unauthenticated users to /login
 */
export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";
  const isApiAuth = pathname.startsWith("/api/auth");

  // Allow static assets & Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico") ||
    isApiAuth
  ) {
    return NextResponse.next();
  }

  // Logged-in users shouldn't see login/signup
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Guests can't see protected pages
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

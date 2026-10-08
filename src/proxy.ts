import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Authoritative auth gate for protected routes.
 * better-auth is configured with session.cookieCache, so getSession
 * validates the signed session cookie WITHOUT touching the database —
 * this works from any serverless isolate (the /tmp SQLite database is
 * per-isolate and cannot be relied on here).
 * No valid session -> redirect to /signin before rendering.
 */
export async function proxy(request: NextRequest) {
  let user = null;
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    user = session?.user ?? null;
  } catch {
    user = null;
  }
  if (!user) {
    const url = request.nextUrl.clone();
    const next = `${url.pathname}${url.search}`;
    url.pathname = "/signin";
    url.search = `?next=${encodeURIComponent(next)}&auth=1`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/product/:path*"],
};

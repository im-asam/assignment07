import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic auth gate for protected routes.
 * better-auth stores its session in a `better-auth.session_token` cookie,
 * which gets a `__Secure-` prefix when served over HTTPS (e.g. Vercel).
 * If neither is present the user is definitely logged out, so redirect to
 * /signin before rendering. The page itself re-validates the session
 * authoritatively.
 */
export function proxy(request: NextRequest) {
  const sessionToken =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");
  if (!sessionToken?.value) {
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

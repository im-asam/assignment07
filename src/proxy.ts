import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic auth gate for protected routes.
 * Only checks for the PRESENCE of a session cookie (no DB access — the
 * proxy runs in a separate isolate with its own ephemeral /tmp, so it
 * cannot see the SQLite database). better-auth names the cookie
 * `better-auth.session_token`, with a `__Secure-` prefix over HTTPS.
 * If neither is present the user is definitely logged out -> redirect to
 * /signin. The page itself re-validates the session authoritatively and
 * handles stale/invalid sessions via RequireAuth.
 */
export function proxy(request: NextRequest) {
  const plain = request.cookies.get("better-auth.session_token")?.value;
  const secure = request.cookies.get("__Secure-better-auth.session_token")?.value;
  if (!plain && !secure) {
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

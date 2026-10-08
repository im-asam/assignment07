import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Authoritative auth gate for protected routes.
 * Validates the session server-side through better-auth itself (it reads its
 * own cookies, whatever their names/prefixes are). Cookie-name sniffing was
 * unreliable across HTTP/HTTPS deployments and caused redirect loops.
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

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";
import RequireAuth from "@/components/RequireAuth";

// Blocking route: session check at request time.
export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  // The proxy already redirects visitors with no session cookie; this covers
  // the edge case of a stale/invalid session (client-side redirect + toast).
  if (!session?.user) {
    return <RequireAuth next="/profile" />;
  }

  return (
    <ProfileClient
      user={{
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        image: session.user.image,
      }}
    />
  );
}

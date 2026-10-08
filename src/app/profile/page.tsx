import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/signin?auth=1");
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

import { configuredProviders } from "@/lib/auth";
import SigninForm from "./SigninForm";

export default async function SigninPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; auth?: string }>;
}) {
  const params = await searchParams;
  return (
    <SigninForm
      next={params.next ?? "/"}
      showAuthToast={params.auth === "1"}
      providers={configuredProviders}
    />
  );
}

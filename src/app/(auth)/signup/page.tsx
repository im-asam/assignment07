import { configuredProviders } from "@/lib/auth";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return <SignupForm providers={configuredProviders} />;
}

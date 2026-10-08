"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninForm({
  next,
  showAuthToast,
  providers,
}: {
  next: string;
  showAuthToast: boolean;
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showAuthToast) toast("বিস্তারিত দাম দেখতে সাইন ইন করুন", { icon: "🔒" });
  }, [showAuthToast]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error("সাইন ইন ব্যর্থ হয়েছে। তথ্য ঠিক আছে কি না দেখুন।");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push(next);
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: next });
  }

  const inputCls =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#15803d] focus:ring-2 focus:ring-green-100";

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
      <p className="mt-2 text-center text-gray-600">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-3xl border border-gray-200/70 bg-white p-6 sm:p-8"
      >
        <label className="mb-1.5 block text-sm font-medium">ইমেইল</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />

        <label className="mb-1.5 mt-5 block text-sm font-medium">পাসওয়ার্ড</label>
        <input
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#15803d] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
        </button>

        {(providers.google || providers.github) && (
          <>
            <div className="my-6 flex items-center gap-3 text-sm text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              অথবা
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="flex gap-3">
              {providers.google && (
                <button
                  type="button"
                  onClick={() => social("google")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-medium transition hover:bg-gray-50"
                >
                  <span className="font-bold text-[#4285F4]">G</span> Google দিয়ে চালিয়ে যান
                </button>
              )}
              {providers.github && (
                <button
                  type="button"
                  onClick={() => social("github")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-medium transition hover:bg-gray-50"
                >
                  <span className="text-lg">🐙</span> GitHub দিয়ে চালিয়ে যান
                </button>
              )}
            </div>
          </>
        )}

        <p className="mt-6 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-[#15803d] hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

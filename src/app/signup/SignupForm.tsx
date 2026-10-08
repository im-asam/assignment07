"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupForm({
  providers,
}: {
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email || !password) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড মিলছে না, আবার লিখুন");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({ name: name.trim(), email, password });
    setLoading(false);
    if (error) {
      toast.error("সাইন আপ ব্যর্থ হয়েছে। অন্য ইমেইল দিয়ে চেষ্টা করুন।");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! সাইন ইন করুন");
    router.push("/signin");
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  }

  const inputCls =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#15803d] focus:ring-2 focus:ring-green-100";

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-center text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-3xl border border-gray-200/70 bg-white p-6 sm:p-8"
      >
        <label className="mb-1.5 block text-sm font-medium">নাম</label>
        <input
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
        />

        <label className="mb-1.5 mt-5 block text-sm font-medium">ইমেইল</label>
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

        <label className="mb-1.5 mt-5 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
        <input
          type="password"
          placeholder="আবার লিখুন"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={inputCls}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#15803d] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
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
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-[#15803d] hover:underline">
            সাইন ইন করুন
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

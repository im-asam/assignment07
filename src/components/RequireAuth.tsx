"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 * Fallback for the rare case where the session cookie exists but the
 * session itself is invalid/expired (the proxy only does an optimistic
 * cookie-presence check). Toasts and navigates to /signin client-side.
 */
export default function RequireAuth({ next }: { next: string }) {
  const router = useRouter();

  useEffect(() => {
    toast("বিস্তারিত দাম দেখতে সাইন ইন করুন", { icon: "🔒" });
    router.replace(`/signin?next=${encodeURIComponent(next)}&auth=1`);
  }, [router, next]);

  return (
    <div className="py-24 text-center">
      <p className="text-gray-600">সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে…</p>
    </div>
  );
}

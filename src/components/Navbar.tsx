"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bnDate } from "@/lib/bn";
import type { Category } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur">
      {/* Row 1: logo + auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#15803d] text-2xl">
            🛒
          </span>
          <span>
            <span className="block text-xl font-bold leading-tight">বাজার দর</span>
            <span className="block text-xs text-gray-500">{bnDate()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-gray-100"
              >
                {user.image ? (
                  <img src={user.image} alt="" className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-lg">
                    👤
                  </span>
                )}
                <span className="font-medium">{user.name?.split(" ")[0] ?? "ব্যবহারকারী"}</span>
                <span className="text-xs text-gray-500">▾</span>
              </button>
              {open && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                  <p className="px-2 font-semibold">{user.name}</p>
                  <p className="truncate px-2 text-sm text-gray-500">{user.email}</p>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-gray-50"
                  >
                    <span>👤</span> আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <span>↩</span> সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="font-semibold text-gray-800 hover:text-black">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[#15803d] px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#166534]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Row 2: category links — same centered container as the logo row */}
      <nav className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl overflow-x-auto px-4">
          <div className="flex w-max min-w-full items-center justify-start gap-1 py-2 sm:justify-center">
            {categories.map((c) => {
              const active = pathname === `/category/${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[#15803d] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{c.icon}</span>
                  {c.nameBn}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

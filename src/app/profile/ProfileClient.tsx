"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileClient({
  user,
}: {
  user: { name: string; email: string; image?: string | null };
}) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);

  async function onUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setSaving(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setSaving(false);
    if (error) {
      toast.error("আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
    router.refresh();
  }

  async function onSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {/* User card */}
      <section className="mt-6 flex flex-col gap-4 rounded-3xl border border-gray-200/70 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img src={user.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              👤
            </span>
          )}
          <div>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>↩</span> সাইন আউট
        </button>
      </section>

      {/* Update info (C3) */}
      <section className="mt-6 rounded-3xl border border-gray-200/70 bg-white p-6">
        <h2 className="text-lg font-bold">তথ্য</h2>
        <form onSubmit={onUpdate} className="mx-auto mt-5 max-w-xl">
          <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium">
            নাম
          </label>
          <input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-4 w-full rounded-xl bg-[#15803d] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#166534] disabled:opacity-60"
          >
            {saving ? "অপেক্ষা করুন…" : "আপডেট"}
          </button>
        </form>
      </section>
    </>
  );
}

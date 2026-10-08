import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <p className="text-7xl font-bold text-gray-300">৪০৪</p>
      <h1 className="mt-6 text-2xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        দুঃখিত, আপনি যে ঠিকানায় যেতে চেয়েছেন সেটি আর নেই বা কখনো ছিল না।
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-[#15803d] px-6 py-3 font-semibold text-white transition hover:bg-[#166534]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

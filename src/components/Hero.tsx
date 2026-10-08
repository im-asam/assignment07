import Link from "next/link";
import { bnDate } from "@/lib/bn";
import BasketIllustration from "./BasketIllustration";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-gray-200/60 bg-white p-6 sm:p-10">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-800">
            {bnDate()}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-xl bg-[#15803d] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#166534]"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="w-full max-w-xs shrink-0 md:max-w-sm">
          <BasketIllustration />
        </div>
      </div>
    </section>
  );
}

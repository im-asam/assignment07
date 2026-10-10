import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { bnNum, toBn, unitBn } from "@/lib/bn";
import ChangeBadge from "@/components/ui/ChangeBadge";
import { ProductIcon } from "@/components/product/ProductIcon";
import RequireAuth from "@/components/auth/RequireAuth";

// Blocking route: session check + live API data at request time.
export const instant = false;

function InvalidProduct() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <p className="text-7xl font-bold text-gray-300">৪০৪</p>
      <h1 className="mt-6 text-2xl font-bold">এই পণ্য খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">দুঃখিত, আপনি যে পণ্যটি খুঁজছেন সেটি নেই।</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-[#15803d] px-6 py-3 font-semibold text-white transition hover:bg-[#166534]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  // The proxy already redirects visitors with no session cookie; this covers
  // the edge case of a stale/invalid session (client-side redirect + toast).
  if (!session?.user) {
    return <RequireAuth next={`/product/${slug}`} />;
  }

  const products = await getProducts().catch(() => []);
  const product = products.find((p) => p.slug === slug);
  if (!product) return <InvalidProduct />;

  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const lowest = Math.min(...mins);
  const highest = Math.max(...maxs);
  const avg = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const diff = product.today - product.yesterday;
  const diffText =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(-diff)} টাকা`
        : "গতকালের তুলনায় দাম অপরিবর্তিত";

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:underline">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-900">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="rounded-3xl border border-gray-200/70 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f1f5ef] text-5xl">
              <ProductIcon product={product} />
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {unitBn(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm text-gray-600">{diffText}</p>
            </div>
          </div>
          <div className="shrink-0 rounded-2xl bg-[#f7faf6] px-8 py-5 text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-3xl font-bold">
              {bnNum(product.today)}
              <span className="ml-1 text-base font-medium">টাকা / {unitBn(product.unit).replace("প্রতি ", "")}</span>
            </p>
            <div className="mt-2 flex justify-center">
              <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
            </div>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200/70 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {bnNum(lowest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-2xl border border-gray-200/70 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {bnNum(highest)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-2xl border border-gray-200/70 bg-white p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {bnNum(avg)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {unitBn(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Market table */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200/70 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">বাজার</th>
                <th className="px-5 py-3 font-medium">বিভাগ</th>
                <th className="px-5 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-5 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-5 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market} className="border-b border-gray-100 last:border-0">
                  <td className="px-5 py-3 font-medium">{m.market}</td>
                  <td className="px-5 py-3 text-gray-600">{m.division}</td>
                  <td className="px-5 py-3 text-right">{bnNum(m.min)} টাকা</td>
                  <td className="px-5 py-3 text-right">{bnNum(m.max)} টাকা</td>
                  <td className="px-5 py-3 text-right font-semibold">
                    {bnNum(Math.round((m.min + m.max) / 2))} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

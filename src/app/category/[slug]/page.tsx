import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { CardGridSkeleton } from "@/components/Skeletons";
import { CategoryIcon } from "@/components/CategoryIcon";
import CategoryClient from "./CategoryClient";

// Blocking route: params + live API data at request time.
export const instant = false;

async function CategoryProducts({ slug }: { slug: string }) {
  const products = await getProducts(slug).catch(() => []);
  return <CategoryClient products={products} />;
}

function InvalidCategory() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <p className="text-7xl font-bold text-gray-300">৪০৪</p>
      <h1 className="mt-6 text-2xl font-bold">এই ক্যাটাগরি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        দুঃখিত, আপনি যে ক্যাটাগরিতে যেতে চেয়েছেন সেটি নেই।
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Validate the slug before streaming; unknown categories get a 404-style
  // empty state with a CTA back home.
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  if (!category) return <InvalidCategory />;

  return (
    <>
      <section className="rounded-3xl border border-gray-200/70 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5ef] text-3xl">
            <CategoryIcon category={category} />
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
            <p className="mt-1 text-sm text-gray-500">আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <Suspense fallback={<CardGridSkeleton count={6} />}>
          <CategoryProducts slug={slug} />
        </Suspense>
      </section>
    </>
  );
}

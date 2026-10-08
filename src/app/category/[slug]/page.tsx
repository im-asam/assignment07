import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { CardGridSkeleton } from "@/components/Skeletons";
import CategoryClient from "./CategoryClient";

async function CategoryContent({ slug }: { slug: string }) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts(slug).catch(() => []),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <section className="rounded-3xl border border-gray-200/70 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5ef] text-3xl">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <CategoryClient products={products} />
      </section>
    </>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense
      fallback={
        <>
          <div className="skeleton h-28 rounded-3xl" />
          <div className="mt-6">
            <CardGridSkeleton count={6} />
          </div>
        </>
      }
    >
      <CategoryContent slug={slug} />
    </Suspense>
  );
}

import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { CardGridSkeleton } from "@/components/Skeletons";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

async function HomeSections() {
  const products = await getProducts().catch(() => []);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-green-700">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-gray-500">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="mt-10 space-y-10">
            <div>
              <div className="skeleton mb-4 h-7 w-48 rounded" />
              <CardGridSkeleton count={6} />
            </div>
            <div>
              <div className="skeleton mb-4 h-7 w-48 rounded" />
              <CardGridSkeleton count={6} />
            </div>
          </div>
        }
      >
        <HomeSections />
      </Suspense>
    </>
  );
}

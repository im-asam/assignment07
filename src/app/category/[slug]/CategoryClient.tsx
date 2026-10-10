"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/api";

type SortKey = "default" | "asc" | "desc";

export default function CategoryClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-6 flex items-center justify-end gap-3 rounded-2xl border border-gray-200/70 bg-white px-4 py-3">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-[#15803d]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

import Link from "next/link";
import type { Product } from "@/lib/api";
import { bnNum, unitBn } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5ef] text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-snug">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">{unitBn(product.unit)}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-lg font-bold">
          {bnNum(product.today)} <span className="text-sm font-medium">টাকা</span>
        </p>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}

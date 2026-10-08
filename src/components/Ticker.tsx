import type { Product } from "@/lib/api";
import { bnNum, bnPct, unitShortBn } from "@/lib/bn";
import { ProductIcon } from "./ProductIcon";

export default function Ticker({ products }: { products: Product[] }) {
  const renderItems = (hidden: boolean) => (
    <>
      {products.map((p) => (
        <span
          key={p.id}
          aria-hidden={hidden || undefined}
          className="flex shrink-0 items-center gap-2 border-r border-gray-100 px-5 text-sm"
        >
          <span className="inline-flex text-base">
            <ProductIcon product={p} />
          </span>
          <span className="font-medium">{p.nameBn}</span>
          <span className="text-gray-600">
            {bnNum(p.today)} টাকা/{unitShortBn(p.unit)}
          </span>
          <span
            className={
              p.change.dir === "up"
                ? "font-semibold text-red-600"
                : p.change.dir === "down"
                  ? "font-semibold text-green-700"
                  : "font-semibold text-gray-500"
            }
          >
            {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}{" "}
            {bnPct(p.change.pct)}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white">
      <div className="ticker-track py-2">
        {renderItems(false)}
        {renderItems(true)}
      </div>
    </div>
  );
}

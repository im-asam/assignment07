export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: MarketPrice[];
}

export interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJSON<T>(path: string): Promise<T> {
  let lastErr: unknown = new Error("All API bases failed");
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${base}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export function getProducts(category?: string): Promise<Product[]> {
  return getJSON<Product[]>(`/products${category ? `?category=${encodeURIComponent(category)}` : ""}`);
}

export function getCategories(): Promise<Category[]> {
  return getJSON<Category[]>(`/categories`);
}

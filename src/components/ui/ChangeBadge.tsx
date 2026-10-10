import { bnPct } from "@/lib/bn";

export type ChangeDir = "up" | "down" | "flat";

/**
 * Price-change badge following the Figma:
 *  ▲ red   (price went up)
 *  ▼ green (price went down)
 *  — gray  (flat)
 */
export default function ChangeBadge({ dir, pct }: { dir: ChangeDir; pct: number }) {
  const styles: Record<ChangeDir, string> = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-700",
    flat: "bg-gray-100 text-gray-500",
  };
  const glyph: Record<ChangeDir, string> = { up: "▲", down: "▼", flat: "—" };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[dir]}`}
    >
      <span aria-hidden>{glyph[dir]}</span>
      <span>{bnPct(pct)}</span>
    </span>
  );
}

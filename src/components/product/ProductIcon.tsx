import type { Product } from "@/lib/api";
import { BeanIcon } from "./CategoryIcon";

/**
 * Product icon with a guaranteed render.
 *
 * Several products come from the API with emojis that have no glyph on many
 * devices (🫘 beans, 🫙 jar, 🫚 ginger) and show up blank. Those get inline
 * SVGs matching the original design; everything else keeps the API's emoji.
 */

function OilJarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1em] w-[1em]"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="9.2" y="2.6" width="5.6" height="3.4" rx="1.2" fill="#9aa0a6" />
      <path
        d="M8 8h8v11a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V8z"
        fill="#e9e6df"
      />
      <path
        d="M9.6 11.5h4.8V18a1.4 1.4 0 0 1-1.4 1.4h-2A1.4 1.4 0 0 1 9.6 18v-6.5z"
        fill="#f0b429"
      />
      <rect x="8.9" y="9" width="1.8" height="9" rx="0.9" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

function GingerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1em] w-[1em]"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        cx="8.5"
        cy="14"
        rx="4.6"
        ry="3.4"
        transform="rotate(-18 8.5 14)"
        fill="#d9a066"
      />
      <ellipse
        cx="15.5"
        cy="11.5"
        rx="4.2"
        ry="3"
        transform="rotate(14 15.5 11.5)"
        fill="#c98d4b"
      />
      <ellipse cx="12" cy="16.8" rx="3.4" ry="2.4" fill="#e3b67e" />
      <circle cx="10" cy="12.6" r="1" fill="#a86f2e" opacity="0.55" />
      <circle cx="15.2" cy="14.6" r="0.9" fill="#a86f2e" opacity="0.55" />
    </svg>
  );
}

const BEAN_PRODUCTS = new Set([
  "mosur-dal",
  "mug-dal",
  "chola-dal",
  "aman-dal-khosasila",
]);

const OIL_PRODUCTS = new Set(["sorishar-tel", "ghani-banga-sorishar-tel"]);

export function ProductIcon({ product }: { product: Product }) {
  if (BEAN_PRODUCTS.has(product.slug)) return <BeanIcon />;
  if (OIL_PRODUCTS.has(product.slug)) return <OilJarIcon />;
  if (product.slug === "ada") return <GingerIcon />;
  return <>{product.image}</>;
}

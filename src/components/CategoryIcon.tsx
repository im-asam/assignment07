/**
 * Category icon with a guaranteed render.
 *
 * The API sends 🫘 (beans) for dal, but that emoji has no glyph on many
 * devices, so the icon shows up blank. Dal therefore gets an inline SVG of
 * red kidney beans (like the original design); every other category keeps
 * the API's emoji. The svg scales with surrounding text via 1em sizing.
 */
export function CategoryIcon({
  category,
}: {
  category: { slug: string; icon: string };
}) {
  if (category.slug === "dal") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[1em] w-[1em]"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse
          cx="8.6"
          cy="13.4"
          rx="5.1"
          ry="7"
          transform="rotate(-24 8.6 13.4)"
          fill="#b93a26"
        />
        <ellipse
          cx="16.1"
          cy="10.2"
          rx="4.5"
          ry="6.1"
          transform="rotate(18 16.1 10.2)"
          fill="#d94f30"
        />
        <ellipse
          cx="7"
          cy="10.8"
          rx="1.4"
          ry="2.3"
          transform="rotate(-24 7 10.8)"
          fill="#f2a68d"
          opacity="0.85"
        />
        <ellipse
          cx="14.9"
          cy="8"
          rx="1.1"
          ry="1.8"
          transform="rotate(18 14.9 8)"
          fill="#f2a68d"
          opacity="0.85"
        />
      </svg>
    );
  }
  return <>{category.icon}</>;
}

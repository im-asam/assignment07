/** Simple vegetable-basket illustration for the hero (inline SVG). */
export default function BasketIllustration() {
  return (
    <svg viewBox="0 0 220 180" className="h-auto w-full max-w-sm" role="img" aria-label="সবজির ঝুড়ি">
      <ellipse cx="110" cy="166" rx="72" ry="10" fill="#000" opacity="0.07" />
      {/* fruits & veggies */}
      <circle cx="72" cy="62" r="24" fill="#ef4444" />
      <circle cx="122" cy="52" r="30" fill="#22c55e" />
      <circle cx="162" cy="66" r="20" fill="#f97316" />
      <circle cx="48" cy="86" r="16" fill="#a855f7" />
      <circle cx="102" cy="80" r="18" fill="#fbbf24" />
      <circle cx="142" cy="88" r="15" fill="#84cc16" />
      {/* stems */}
      <path d="M72 40 q2 -10 10 -14" stroke="#166534" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M122 24 q2 -10 12 -14" stroke="#166534" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* basket */}
      <path d="M52 100 L168 100 L156 158 L64 158 Z" fill="#b45309" />
      <path d="M52 100 L168 100 L166 112 L54 112 Z" fill="#92400e" />
      {[78, 102, 126, 148].map((x) => (
        <line key={x} x1={x} y1="112" x2={x - 6} y2="158" stroke="#92400e" strokeWidth="4" />
      ))}
      <rect x="46" y="94" width="128" height="12" rx="6" fill="#78350f" />
    </svg>
  );
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** "123" -> "১২৩" */
export function toBn(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Number with Bengali digits + locale grouping, e.g. 1850 -> "১,৮৫০", 2.1 -> "২.১" */
export function bnNum(n: number, decimals = 0): string {
  return n.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** 2.1 -> "২.১%" */
export function bnPct(pct: number): string {
  return `${bnNum(Math.abs(pct), 1)}%`;
}

const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const UNIT_SHORT_BN: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

/** kg -> "প্রতি কেজি" */
export function unitBn(unit: string): string {
  return UNIT_BN[unit] ?? unit;
}

/** kg -> "কেজি" (for ticker "টাকা/কেজি") */
export function unitShortBn(unit: string): string {
  return UNIT_SHORT_BN[unit] ?? unit;
}

/** e.g. "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" (Asia/Dhaka) */
export function bnDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(d);
}

"use client";

import { useCountUp } from "@/components/ui/FadeIn";

interface CountUpStatProps {
  /** e.g. "3", "100+", "15" — a numeric core with an optional suffix. */
  value: string;
  label: string;
}

/**
 * Display stat that counts up from zero when scrolled into view. The numeral
 * is Cormorant in bronze at display size (the one place decorative bronze is
 * allowed at text weight — it is ≥48px here).
 */
export function CountUpStat({ value, label }: CountUpStatProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const { value: current, ref } = useCountUp(target, 1400);

  return (
    <div ref={ref}>
      <div
        className="mb-2 text-5xl tabular-nums lg:text-6xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--bronze)" }}
      >
        {current}
        {suffix}
      </div>
      <div className="text-sm text-[var(--warm-gray-light)]">{label}</div>
    </div>
  );
}

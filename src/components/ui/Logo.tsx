"use client";

interface LogoProps {
  className?: string;
  height?: number;
  /** "dark" renders ivory/champagne for charcoal surfaces (footer). */
  variant?: "light" | "dark";
}

/**
 * The master lockup (adopted 2026-08-02, concept riff-b1): "THE SURGERY
 * CENTER" stacked in the display serif, a bronze rule, and "PLANO
 * DERMATOLOGY" in tracked caps beneath. Live-text SVG on the site's own font
 * variables — resolution-independent and always in sync with the brand type.
 * (The previous TSC incision-line mark is archived in _logo-concepts-v2/.)
 */
export function Logo({ className = "", height = 64, variant = "light" }: LogoProps) {
  const width = (height * 344) / 170;
  const ink = variant === "dark" ? "var(--ivory)" : "var(--charcoal)";
  const accent = variant === "dark" ? "var(--champagne)" : "var(--bronze)";
  const subInk = variant === "dark" ? "var(--champagne)" : "var(--bronze-text)";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 344 170"
      role="img"
      aria-label="The Surgery Center — Plano Dermatology"
      className={className}
    >
      <text
        x="172"
        y="52"
        textAnchor="middle"
        fill={ink}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "46px",
          letterSpacing: "0.05em",
        }}
      >
        THE SURGERY
      </text>
      <text
        x="172"
        y="100"
        textAnchor="middle"
        fill={ink}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "46px",
          letterSpacing: "0.05em",
        }}
      >
        CENTER
      </text>
      <rect x="84" y="117" width="176" height="2.5" fill={accent} />
      <text
        x="172"
        y="146"
        textAnchor="middle"
        fill={subInk}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "14.5px",
          letterSpacing: "0.34em",
        }}
      >
        PLANO DERMATOLOGY
      </text>
    </svg>
  );
}

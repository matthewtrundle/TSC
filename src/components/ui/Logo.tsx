"use client";

interface LogoProps {
  className?: string;
  height?: number;
}

/**
 * The TSC wordmark, recut as inline SVG. The original raster mark's identity
 * — the monogram with two incision lines passing through it — is kept, but
 * set in the site's display serif, charcoal on ivory with bronze lines. The
 * ivory stroke behind the letters knocks the lines out around each glyph, so
 * the "incision through the monogram" reads crisply at any size.
 * (The old /images/logo-tsc.png remains on disk as rollback.)
 */
export function Logo({ className = "", height = 56 }: LogoProps) {
  const width = (height * 250) / 110;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 250 110"
      role="img"
      aria-label="TSC — The Surgery Center at Plano Dermatology"
      className={className}
    >
      {/* Incision lines */}
      <line x1="4" y1="42" x2="246" y2="42" stroke="var(--bronze)" strokeWidth="2.25" />
      <line x1="4" y1="50" x2="246" y2="50" stroke="var(--bronze)" strokeWidth="2.25" />

      {/* Monogram — ivory stroke knocks the lines out around the glyphs */}
      <text
        x="125"
        y="66"
        textAnchor="middle"
        fill="var(--charcoal)"
        stroke="var(--ivory)"
        strokeWidth="10"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "68px",
          letterSpacing: "0.06em",
          paintOrder: "stroke fill",
        }}
      >
        TSC
      </text>

      {/* Descriptor */}
      <text
        x="125"
        y="97"
        textAnchor="middle"
        fill="var(--bronze-text)"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "12.5px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        THE SURGERY CENTER
      </text>
    </svg>
  );
}

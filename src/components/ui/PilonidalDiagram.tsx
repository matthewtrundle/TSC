/**
 * Simple educational cross-section of pilonidal disease, drawn in the site's
 * line-art language (ivory/charcoal/bronze — matches MohsDiagram). Original
 * artwork: the reference images floating around the web are other clinics'
 * copyrighted graphics.
 */

const INK = "var(--charcoal)";
const ACCENT = "var(--bronze)";

const common = {
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PilonidalDiagram() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 420 300"
        role="img"
        aria-label="Cross-section diagram of a pilonidal cyst in the natal cleft near the tailbone"
        className="w-full"
      >
        {/* Skin surface: two buttock curves meeting at the natal cleft */}
        <path
          d="M10,80 C80,38 150,40 200,96 C210,108 214,120 214,132 M214,132 C214,120 218,108 228,96 C278,40 348,38 410,80"
          stroke={INK}
          {...common}
        />
        {/* Dermis hint lines */}
        <path d="M30,110 C90,72 148,74 190,116" stroke={INK} strokeOpacity="0.25" {...common} />
        <path d="M238,116 C280,74 338,72 396,110" stroke={INK} strokeOpacity="0.25" {...common} />

        {/* Sinus opening (pit) at the midline */}
        <circle cx="214" cy="134" r="4" fill={ACCENT} stroke="none" />

        {/* Sinus tract descending to the cyst pocket */}
        <path d="M214,138 C213,158 210,172 204,186" stroke={ACCENT} strokeDasharray="1 7" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Cyst / abscess pocket */}
        <path
          d="M204,186 C178,192 168,214 180,232 C192,250 226,252 240,236 C254,220 246,196 224,188 C217,186 210,185 204,186 Z"
          stroke={ACCENT}
          {...common}
        />
        {/* Trapped hairs inside the pocket */}
        <path d="M198,214 C206,208 214,220 222,214 M194,228 C204,222 212,234 222,228 M208,200 C214,196 220,204 226,200" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Tailbone (sacrum/coccyx) hint */}
        <path d="M258,180 C282,190 296,210 300,238 C301,247 298,256 290,260" stroke={INK} strokeOpacity="0.45" {...common} />

        {/* Labels */}
        <g style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
          <text x="214" y="118" textAnchor="middle" fill={INK}>Natal cleft</text>
          <line x1="214" y1="122" x2="214" y2="128" stroke={INK} strokeWidth="1" />
          <text x="120" y="250" textAnchor="end" fill={INK}>Pilonidal cyst</text>
          <text x="120" y="266" textAnchor="end" fill={INK} opacity="0.6">with trapped hair</text>
          <line x1="126" y1="248" x2="172" y2="234" stroke={INK} strokeWidth="1" />
          <text x="330" y="270" textAnchor="start" fill={INK} opacity="0.7">Tailbone</text>
          <line x1="326" y1="266" x2="300" y2="252" stroke={INK} strokeWidth="1" opacity="0.7" />
          <text x="298" y="150" textAnchor="start" fill={INK} opacity="0.7">Sinus opening</text>
          <line x1="294" y1="146" x2="222" y2="136" stroke={INK} strokeWidth="1" opacity="0.7" />
        </g>
      </svg>
      <figcaption className="mt-3 text-sm text-[var(--warm-gray-light)]">
        Pilonidal cysts and abscesses form in the natal cleft near the
        tailbone, where hair works under the skin.
      </figcaption>
    </figure>
  );
}

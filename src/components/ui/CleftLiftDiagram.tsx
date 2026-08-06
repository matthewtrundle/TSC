/**
 * "A lift and a shift, drawn simply" — three-panel line-art sequence for the
 * pilonidal page, in the same drawn-simply language as MohsDiagram: thin
 * ivory/charcoal strokes with bronze/champagne accents, schematic rather than
 * anatomical. Posterior view, tasteful and abstract.
 */
const STROKE = "#1C242C";
const ACCENT = "#A6803E";

function Panel({
  step,
  title,
  caption,
  children,
}: {
  step: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 160 120"
        role="img"
        aria-label={`${title} — ${caption}`}
        className="mb-5 h-auto w-full max-w-[220px]"
      >
        {children}
      </svg>
      <figcaption>
        <span
          className="mr-2 text-lg"
          style={{ fontFamily: "var(--font-serif)", color: "var(--bronze-text)" }}
        >
          {step}
        </span>
        <span className="font-semibold text-[var(--navy-primary)]">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-[var(--warm-gray)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/** Shared outline: shoulders-to-thighs posterior silhouette, schematic. */
function Outline() {
  return (
    <path
      d="M30,6 C30,30 22,44 22,64 C22,92 40,112 80,112 C120,112 138,92 138,64 C138,44 130,30 130,6"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  );
}

export function CleftLiftDiagram() {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      <Panel
        step="01"
        title="The problem"
        caption="A deep midline cleft traps hair and debris; pits and abscesses form where healing is hardest."
      >
        <Outline />
        {/* deep midline cleft */}
        <path d="M80,42 L80,112" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
        {/* midline pits */}
        <circle cx="80" cy="62" r="2.2" fill={ACCENT} />
        <circle cx="80" cy="72" r="2.2" fill={ACCENT} />
        {/* abscess */}
        <circle cx="87" cy="82" r="7" fill="none" stroke={ACCENT} strokeWidth="1.6" />
        <circle cx="87" cy="82" r="2.4" fill={ACCENT} />
      </Panel>

      <Panel
        step="02"
        title="The lift and the shift"
        caption="Diseased tissue is removed; healthy skin is brought across, moving the closure off the midline."
      >
        <Outline />
        {/* shallower cleft remnant */}
        <path d="M80,42 L80,66" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
        {/* excised zone, dashed */}
        <ellipse cx="80" cy="82" rx="12" ry="20" fill="none" stroke={STROKE} strokeWidth="1.2" strokeDasharray="3 3" />
        {/* the shift: arrow carrying skin across the midline */}
        <path d="M56,82 C66,74 84,74 96,80" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M96,80 L89,75 M96,80 L88,84" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
      </Panel>

      <Panel
        step="03"
        title="The result"
        caption="A shallow, flattened cleft and a gently curved closure beside the midline — nothing left for the disease to return to."
      >
        <Outline />
        {/* shallow cleft */}
        <path d="M80,42 L80,58" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
        {/* off-midline lazy-S closure */}
        <path d="M84,60 C94,72 90,90 96,106" fill="none" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 3" strokeLinecap="round" />
      </Panel>
    </div>
  );
}

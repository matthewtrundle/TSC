/**
 * "Earlobe repair, drawn simply" — three-panel line-art sequence for the
 * earlobe repair page, in the same drawn-simply language as CleftLiftDiagram:
 * thin charcoal strokes with bronze accents, schematic rather than anatomical.
 * A side-view ear, tasteful and abstract.
 *
 * Deliberately unnumbered (Dr. Modi 2026-08-08): the first two panels are
 * alternative problems, either of which leads to the same fix — the captions
 * carry that logic ("Either way, ...").
 */
const STROKE = "#1C242C";
const ACCENT = "#A6803E";

function Panel({
  title,
  caption,
  children,
}: {
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
        <span className="font-semibold text-[var(--navy-primary)]">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-[var(--warm-gray)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Schematic ear in profile, helix to lobe. When `notched`, the bottom edge of
 * the lobe has a wedge missing — a split, with no tissue connecting across it.
 */
function Ear({ notched = false }: { notched?: boolean }) {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round">
      {notched ? (
        <>
          {/* helix down to the right edge of the split */}
          <path d="M64,18 C86,4 114,14 117,40 C119,62 111,80 98,94 C95,97 92,100 88,102" />
          {/* the split itself — a wedge missing from the lobe edge */}
          <path d="M88,102 L84,88 L79,104" />
          {/* remainder of the lobe, left of the split */}
          <path d="M79,104 C74,107 72,106 69,104 C61,99 60,90 65,84" />
        </>
      ) : (
        <path d="M64,18 C86,4 114,14 117,40 C119,62 111,80 98,94 C90,102 78,109 69,104 C61,99 60,90 65,84" />
      )}
      {/* inner helix hint */}
      <path d="M74,28 C90,20 104,30 105,44 C105,52 102,58 97,63" strokeWidth="1.2" />
    </g>
  );
}

export function EarlobeDiagram() {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      <Panel
        title="A split lobe"
        caption="A sudden pull can tear the piercing clean through the edge of the lobe."
      >
        <Ear notched />
        {/* where the piercing was, at the apex of the split */}
        <circle cx="84" cy="84" r="2" fill={ACCENT} />
      </Panel>

      <Panel
        title="A stretched piercing"
        caption="Years of earrings lengthen the hole until studs sit low, hang unevenly, or slip through."
      >
        <Ear />
        {/* the dilated, drooping tract — wide open, no jewelry */}
        <ellipse
          cx="84"
          cy="90"
          rx="3.4"
          ry="9.5"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.6"
        />
      </Panel>

      <Panel
        title="The custom repair"
        caption="Either way, the damaged tract is removed and the lobe rebuilt with fine layered sutures to a natural contour."
      >
        <Ear />
        {/* fine closure line, fading into the lobe */}
        <path
          d="M84,84 C83,90 82,96 82,102"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.4"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </Panel>
    </div>
  );
}

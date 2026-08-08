/**
 * "Earlobe repair, drawn simply" — three-panel line-art sequence for the
 * earlobe repair page, in the same drawn-simply language as CleftLiftDiagram:
 * thin charcoal strokes with bronze accents, schematic rather than anatomical.
 * A side-view ear, tasteful and abstract.
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

/** Shared outline: a schematic ear in profile, helix to lobe. */
function Ear() {
  return (
    <g fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round">
      {/* outer helix down to the lobe */}
      <path d="M64,18 C86,4 114,14 117,40 C119,62 111,80 98,94 C90,102 78,109 69,104 C61,99 60,90 65,84" />
      {/* inner helix hint */}
      <path d="M74,28 C90,20 104,30 105,44 C105,52 102,58 97,63" strokeWidth="1.2" />
    </g>
  );
}

export function EarlobeDiagram() {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      <Panel
        step="01"
        title="A split lobe"
        caption="A sudden pull can tear the piercing clean through the edge of the lobe."
      >
        <Ear />
        {/* the original piercing */}
        <circle cx="84" cy="86" r="2" fill={ACCENT} />
        {/* tear through the lobe edge */}
        <path
          d="M84,86 L80,104 M84,86 L89,103"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </Panel>

      <Panel
        step="02"
        title="A stretched piercing"
        caption="Years of earrings lengthen the hole until studs sit low, hang unevenly, or slip through."
      >
        <Ear />
        {/* elongated tract */}
        <ellipse
          cx="84"
          cy="91"
          rx="2.4"
          ry="7"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.6"
        />
        {/* a heavy earring, dragging low */}
        <path d="M84,98 L84,101" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="84" cy="107" r="5.5" fill="none" stroke={ACCENT} strokeWidth="1.8" />
      </Panel>

      <Panel
        step="03"
        title="After repair"
        caption="The tract is removed and the lobe rebuilt with fine layered sutures to a natural contour."
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

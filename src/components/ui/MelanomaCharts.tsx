// =============================================================================
// PATIENT-FACING CHARTS FOR /learn/mohs-surgery-for-melanoma
//
// Server components, no JavaScript. Every figure is drawn only from numbers
// that appear verbatim in a verified, peer-reviewed publication (cited in the
// caption and again in the article's reference list). Nothing is estimated,
// digitized, or interpolated: the survival chart plots the reported points and
// joins them with dashed guide lines that the caption names as guides; the
// recurrence chart shows pooled rates with their published confidence
// intervals. Every chart carries a plain table twin for screen readers and for
// anyone who prefers numbers.
//
// Chart designs were settled in a two-round review between Claude and GPT-6
// Astra Pro (research/mohs-melanoma-2026-09/CONSENSUS.md).
//
// Color: Mohs = bronze (the site accent; 3.6:1 on ivory), wide excision =
// slate gray #545C66 (7.6:1). Validated 2026-09-13 for protan/deutan/tritan
// separation (ΔE ≥ 16.7) and normal vision (ΔE 19.0). Identity never rides on
// color alone: series differ in marker shape, are direct-labeled, and appear
// in a legend.
// =============================================================================

const MOHS = "#A6803E";
const WLE = "#545C66";
const INK = "var(--warm-gray)";
const MUTED = "var(--warm-gray-light)";
const HAIRLINE = "var(--gray-200)";

/* --------------------------------------------------------------------------
 * Shared chrome: figure shell, legend swatches, and the "see the numbers"
 * table.
 * ------------------------------------------------------------------------ */

function Marker({ series }: { series: "mohs" | "wle" }) {
  // Mohs = filled circle, wide excision = filled square: identity survives
  // grayscale print and every kind of color-vision deficiency.
  return series === "mohs" ? (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 rounded-full align-middle"
      style={{ background: MOHS }}
    />
  ) : (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 rounded-[2px] align-middle"
      style={{ background: WLE }}
    />
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-7 gap-y-2 text-base" aria-label="Legend">
      <li className="flex items-center gap-2.5">
        <Marker series="mohs" />
        <span style={{ color: INK }}>Mohs surgery</span>
      </li>
      <li className="flex items-center gap-2.5">
        <Marker series="wle" />
        <span style={{ color: INK }}>Wide local excision</span>
      </li>
    </ul>
  );
}

function Figure({
  title,
  subtitle,
  caption,
  table,
  children,
}: {
  title: string;
  subtitle?: string;
  caption: React.ReactNode;
  table: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10 border-y border-[var(--gray-200)] py-8">
      <figcaption className="mb-6">
        <p className="label-caps mb-2 text-xs">Figure</p>
        <p
          className="text-2xl leading-snug text-[var(--navy-primary)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </p>
        {subtitle && (
          <p className="mt-1 text-base" style={{ color: MUTED }}>
            {subtitle}
          </p>
        )}
      </figcaption>
      {children}
      <div className="mt-6 text-sm leading-relaxed" style={{ color: MUTED }}>
        {caption}
      </div>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-[var(--bronze-text)] underline decoration-[var(--hairline-bronze)] underline-offset-4 hover:decoration-[var(--bronze)]">
          See the numbers as a table
        </summary>
        <div className="mt-3 overflow-x-auto">{table}</div>
      </details>
    </figure>
  );
}

function Table({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: (string | number)[][];
  caption: string;
}) {
  return (
    <table className="min-w-[20rem] border-collapse text-left text-sm" style={{ color: INK }}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={i}
              scope="col"
              className="border-b border-[var(--gray-200)] py-2 pr-6 font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={String(r[0])}>
            {r.map((c, i) =>
              i === 0 ? (
                <th key={i} scope="row" className="border-b border-[var(--gray-200)] py-2 pr-6 font-normal">
                  {c}
                </th>
              ) : (
                <td key={i} className="border-b border-[var(--gray-200)] py-2 pr-6 tabular-nums">
                  {c}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* --------------------------------------------------------------------------
 * 1. Survival estimates — Sharma et al. 2026, Arch Dermatol Res 318:242.
 *    Melanoma-specific survival (Kaplan–Meier, unadjusted): Mohs 93% at 5 y,
 *    88% at 10 y; wide local excision 88% at 5 y, 83% at 10 y. Time origin
 *    is diagnosis (SEER). The paper's own figure is a step curve running to
 *    ~17 years; only the 5- and 10-year values are reported as numbers, so
 *    this chart plots those points (plus the definitional 100% at year 0) and
 *    joins them with dashed straight guide lines.
 * ------------------------------------------------------------------------ */

type Pt = readonly [number, number];
const SURVIVAL: Record<"mohs" | "wle", readonly Pt[]> = {
  mohs: [
    [0, 100],
    [5, 93],
    [10, 88],
  ],
  wle: [
    [0, 100],
    [5, 88],
    [10, 83],
  ],
};

const X_MAX = 10;
/** The plot box runs a little past the last data point so the 10-year
 *  markers and their labels sit inside the frame instead of on its edge. */
const X_DOMAIN = 10.9;
/** Map data → a 0–100 plot box (y grows downward in SVG). */
const px = (x: number) => (x / X_DOMAIN) * 100;
const py = (y: number) => 100 - y;

export function MelanomaSurvivalChart() {
  const yTicks = [0, 20, 40, 60, 80, 100];
  const xTicks = [0, 5, 10];
  const guide = (pts: readonly Pt[]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${px(x).toFixed(2)} ${py(y).toFixed(2)}`).join(" ");

  return (
    <Figure
      title="Reported melanoma-specific survival estimates"
      subtitle="One retrospective registry study of more than 90,000 patients with invasive melanoma (U.S. SEER, 2000–2020). The treatment groups differed before surgery."
      caption={
        <p>
          Reported 5- and 10-year estimates from Sharma and colleagues,{" "}
          <em>Archives of Dermatological Research</em>, 2026. Dashed lines
          connect the reported points; they are not the study&rsquo;s survival
          curves. These estimates were not adjusted for differences between the
          groups: patients selected for Mohs generally had thinner, earlier-stage
          melanomas. The results do not show that Mohs caused better survival.
          Melanoma-specific survival is not the same as survival from all
          causes.
        </p>
      }
      table={
        <Table
          caption="Melanoma-specific survival by surgical technique, Sharma et al. 2026"
          head={["Years after diagnosis", "Mohs surgery", "Wide local excision"]}
          rows={[
            ["At diagnosis", "100%", "100%"],
            ["5 years", "93%", "88%"],
            ["10 years", "88%", "83%"],
          ]}
        />
      }
    >
      <div className="mb-5">
        <Legend />
      </div>

      {/* Grid: y-labels | plot ; blank | x-labels. Labels are real HTML text so
          they stay ≥14px at every viewport instead of scaling with the SVG. */}
      <div
        className="grid gap-x-3 text-sm tabular-nums"
        style={{ gridTemplateColumns: "3rem 1fr", color: MUTED }}
        role="img"
        aria-label="Chart of reported melanoma-specific survival estimates. Mohs surgery: 93 percent at five years, 88 percent at ten years. Wide local excision: 88 percent at five years, 83 percent at ten years. Dashed lines connect the reported points."
      >
        <div className="relative" aria-hidden="true">
          {yTicks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 leading-none"
              style={{ top: `${py(t)}%` }}
            >
              {t}%
            </span>
          ))}
        </div>

        <div className="relative aspect-[4/3] sm:aspect-[16/9]" aria-hidden="true">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {yTicks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={100}
                y1={py(t)}
                y2={py(t)}
                stroke={HAIRLINE}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* dashed guide lines between reported points */}
            <path
              d={guide(SURVIVAL.wle)}
              fill="none"
              stroke={WLE}
              strokeWidth={2}
              strokeDasharray="6 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={guide(SURVIVAL.mohs)}
              fill="none"
              stroke={MOHS}
              strokeWidth={2}
              strokeDasharray="6 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* reported points. Zero-length strokes with round or square caps
                give circles and squares that do not distort under
                preserveAspectRatio="none"; a wider ivory stroke underneath is
                the surface ring that keeps them legible where lines cross. */}
            {(["wle", "mohs"] as const).flatMap((series) =>
              SURVIVAL[series].map(([x, y]) => {
                const d = `M ${px(x)} ${py(y)} l 0.001 0`;
                const cap = series === "mohs" ? "round" : "square";
                return (
                  <g key={`${series}-${x}`}>
                    <path d={d} stroke="var(--ivory-deep)" strokeWidth={14} strokeLinecap={cap} vectorEffect="non-scaling-stroke" />
                    <path d={d} stroke={series === "mohs" ? MOHS : WLE} strokeWidth={10} strokeLinecap={cap} vectorEffect="non-scaling-stroke" />
                  </g>
                );
              })
            )}
          </svg>

          {/* direct labels at the reported points (HTML, so they never scale) */}
          {(
            [
              [5, 93, "93%", -1],
              [10, 88, "88%", -1],
              [5, 88, "88%", 1],
              [10, 83, "83%", 1],
            ] as const
          ).map(([x, y, label, dir]) => (
            <span
              key={`${label}-${x}-${dir}`}
              className="absolute whitespace-nowrap text-sm font-semibold leading-none"
              style={{
                left: `${px(x)}%`,
                top: `${py(y)}%`,
                transform: `translate(-50%, ${dir < 0 ? "calc(-100% - 12px)" : "12px"})`,
                color: INK,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div aria-hidden="true" />
        <div className="relative mt-2 h-5" aria-hidden="true">
          {xTicks.map((t) => (
            <span
              key={t}
              className="absolute whitespace-nowrap leading-none"
              style={{ left: `${px(t)}%`, transform: t === 0 ? "none" : "translateX(-50%)" }}
            >
              {t === 0 ? "Diagnosis" : `${t} years`}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  );
}

/* --------------------------------------------------------------------------
 * 2. "100 squares" — the same four numbers, one square per percentage point.
 *    Squares are percentage points, NOT individual patients: melanoma-
 *    specific survival treats deaths from other causes differently, so the
 *    unfilled remainder is not a count of people who died.
 * ------------------------------------------------------------------------ */

function SquareGrid({
  value,
  series,
  label,
}: {
  value: number;
  series: "mohs" | "wle";
  label: string;
}) {
  const color = series === "mohs" ? MOHS : WLE;
  return (
    <div>
      <p className="mb-3 flex items-baseline gap-2.5 text-base" style={{ color: INK }}>
        <Marker series={series} />
        <span className="font-semibold">{label}</span>
        <span className="tabular-nums" style={{ color: MUTED }}>
          {value}%
        </span>
      </p>
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: "repeat(10, 1fr)", maxWidth: "15rem" }}
        aria-hidden="true"
      >
        {Array.from({ length: 100 }, (_, i) =>
          i < value ? (
            <span key={i} className="block aspect-square rounded-[2px]" style={{ background: color }} />
          ) : (
            <span
              key={i}
              className="block aspect-square rounded-[2px]"
              style={{ boxShadow: `inset 0 0 0 1px ${WLE}66` }}
            />
          )
        )}
      </div>
    </div>
  );
}

export function MelanomaIconArray() {
  return (
    <Figure
      title="The same estimates, shown with 100 squares"
      subtitle="Each square is one percentage point of the reported estimate, not one patient followed in the study."
      caption={
        <>
          <p className="mb-2">
            <span className="mr-4 inline-flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-3 w-3 rounded-[2px]" style={{ background: INK }} />
              Filled: estimated melanoma-specific survival
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-3 w-3 rounded-[2px]" style={{ boxShadow: `inset 0 0 0 1px ${WLE}` }} />
              Outline: remaining share to 100%
            </span>
          </p>
          <p>
            These squares illustrate the same estimates as the chart above
            (Sharma et al., 2026); they are not additional study results.
            Deaths from other causes are not counted as melanoma deaths, so the
            percentages do not say how many people were still alive overall.
            The groups differed before treatment, and the five-point gap does
            not mean Mohs saved five additional lives per 100 patients.
          </p>
        </>
      }
      table={
        <Table
          caption="Melanoma-specific survival estimates by technique and time, Sharma et al. 2026"
          head={["", "Mohs surgery", "Wide local excision", "Gap"]}
          rows={[
            ["At 5 years", "93%", "88%", "5 points"],
            ["At 10 years", "88%", "83%", "5 points"],
          ]}
        />
      }
    >
      <div
        role="img"
        aria-label="Grids of 100 squares. At five years: Mohs 93 percent, wide local excision 88 percent. At ten years: Mohs 88 percent, wide local excision 83 percent. Each square is one percentage point."
        className="space-y-10"
      >
        {(
          [
            ["At 5 years", 93, 88],
            ["At 10 years", 88, 83],
          ] as const
        ).map(([when, mohs, wle]) => (
          <div key={when}>
            <p className="label-caps mb-4 text-xs">{when}</p>
            <div className="grid gap-8 sm:grid-cols-2">
              <SquareGrid value={mohs} series="mohs" label="Mohs surgery" />
              <SquareGrid value={wle} series="wle" label="Wide local excision" />
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* --------------------------------------------------------------------------
 * 3. Local recurrence — Pride et al. 2022, Dermatol Surg 48:164 (systematic
 *    review and meta-analysis, 71 studies, 16,575 patients). Pooled local
 *    recurrence: wide local excision 7% (95% CI 5–11%), staged excision 3%
 *    (2–4%), Mohs <1% (0–1%). Axis 0–12% so the widest interval fits; the
 *    Mohs estimate is drawn as a hatched 0–1% band because the paper reports
 *    a ceiling ("<1%"), not a point value.
 * ------------------------------------------------------------------------ */

const RECURRENCE = [
  { label: "Wide local excision", point: 7, lo: 5, hi: 11, display: "7%", ci: "5–11%", series: "wle", ceiling: false },
  { label: "Staged excision", point: 3, lo: 2, hi: 4, display: "3%", ci: "2–4%", series: "wle", ceiling: false },
  { label: "Mohs surgery", point: 1, lo: 0, hi: 1, display: "less than 1%", ci: "0–1%", series: "mohs", ceiling: true },
] as const;

const R_MAX = 12;
const rx = (v: number) => `${(v / R_MAX) * 100}%`;
const SERIES_COLOR = { mohs: MOHS, wle: WLE } as const;

export function MelanomaRecurrenceChart() {
  return (
    <Figure
      title="Local recurrence reported across published studies"
      subtitle="Melanoma in situ and invasive melanoma combined; follow-up times varied."
      caption={
        <p>
          Pride and colleagues, <em>Dermatologic Surgery</em>, 2022, pooled 71
          studies involving 16,575 patients. The studies differed in melanoma
          type, location, treatment methods, and length of follow-up. These are
          pooled local-recurrence estimates, not results from one randomized
          comparison and not rates measured at one common time point. Local
          recurrence means melanoma returning at the treated site; it does not
          measure all spread or deaths. Thin lines show 95% confidence
          intervals. The hatched band marks the reported ceiling for Mohs
          (&ldquo;less than 1%&rdquo;), not an exact value.
        </p>
      }
      table={
        <Table
          caption="Pooled local recurrence of melanoma by surgical technique, Pride et al. 2022"
          head={["Technique", "Local recurrence", "95% confidence interval"]}
          rows={RECURRENCE.map((r) => [r.label, r.display, r.ci])}
        />
      }
    >
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <pattern id="mohs-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={MOHS} strokeWidth="2.5" />
          </pattern>
        </defs>
      </svg>
      <div
        role="img"
        aria-label="Bar chart of pooled local recurrence: wide local excision 7 percent, confidence interval 5 to 11; staged excision 3 percent, interval 2 to 4; Mohs surgery less than 1 percent, interval 0 to 1."
        className="space-y-5"
      >
        {RECURRENCE.map((r) => (
          <div key={r.label} className="grid items-center gap-x-4 sm:grid-cols-[11rem_1fr]">
            <p className="text-base" style={{ color: INK }}>
              {r.label}
            </p>
            <div className="flex items-center gap-3">
              <div className="relative h-7 flex-1">
                {/* bar */}
                {r.ceiling ? (
                  <svg className="absolute inset-y-0 left-0 h-7 rounded-r-[4px]" style={{ width: rx(r.point) }} preserveAspectRatio="none">
                    <rect width="100%" height="100%" fill="url(#mohs-hatch)" />
                  </svg>
                ) : (
                  <div
                    className="absolute inset-y-0 left-0 h-7 rounded-r-[4px]"
                    style={{ width: rx(r.point), background: SERIES_COLOR[r.series] }}
                  />
                )}
                {/* 95% CI whisker (drawn in ink so it reads on the bar and on the surface) */}
                <div
                  className="absolute top-1/2 h-px -translate-y-1/2"
                  style={{ left: rx(r.lo), width: `calc(${rx(r.hi)} - ${rx(r.lo)})`, background: INK }}
                />
                {[r.lo, r.hi].map((v) => (
                  <div
                    key={v}
                    className="absolute top-1/2 h-3 w-px -translate-y-1/2"
                    style={{ left: rx(v), background: INK }}
                  />
                ))}
              </div>
              <span className="w-[8.5rem] shrink-0 text-sm font-semibold tabular-nums" style={{ color: INK }}>
                {r.display}{" "}
                <span className="font-normal" style={{ color: MUTED }}>
                  ({r.ci})
                </span>
              </span>
            </div>
          </div>
        ))}
        <div className="hidden sm:grid sm:grid-cols-[11rem_1fr]" aria-hidden="true">
          <span />
          <div className="flex items-center gap-3">
            <div className="relative h-5 flex-1 border-t border-[var(--gray-200)] text-sm tabular-nums" style={{ color: MUTED }}>
              {[0, 2, 4, 6, 8, 10, 12].map((t) => (
                <span
                  key={t}
                  className="absolute top-1.5 leading-none"
                  style={{ left: rx(t), transform: t === 0 ? "none" : t === R_MAX ? "translateX(-100%)" : "translateX(-50%)" }}
                >
                  {t}%
                </span>
              ))}
            </div>
            <span className="w-[8.5rem] shrink-0 text-xs" style={{ color: MUTED }}>
              Local recurrence
            </span>
          </div>
        </div>
      </div>
    </Figure>
  );
}

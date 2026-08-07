"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Mohs procedure as hand-drawn line art — the practice's signature
 * graphic. Five stages in champagne-and-ivory strokes on the dark band.
 *
 * Motion contract: every path is FULLY DRAWN by default (SSR, no-JS, reduced
 * motion). When the diagram first scrolls into view, .diagram-animate replays
 * the strokes from empty via CSS (see globals.css), staggered per stage.
 */

const STROKE = "rgba(247, 244, 239, 0.85)";
const ACCENT = "var(--champagne)";

type Stage = {
  n: string;
  title: string;
  note: string;
  art: React.ReactNode;
};

const common = {
  fill: "none",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const stages: Stage[] = [
  {
    n: "01",
    title: "Identify",
    note: "The visible tumor is marked on the skin.",
    art: (
      <>
        <path className="draw" style={{ "--path-len": 150, "--draw-delay": "0s" } as React.CSSProperties} d="M8,40 C40,33 120,33 152,40" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 150, "--draw-delay": "0.1s" } as React.CSSProperties} d="M8,54 C40,47 120,47 152,54" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 160, "--draw-delay": "0.25s" } as React.CSSProperties} d="M80,54 C64,56 57,66 61,78 C65,90 95,92 101,80 C107,68 96,56 80,54 Z" stroke={ACCENT} {...common} />
        <path className="draw" style={{ "--path-len": 40, "--draw-delay": "0.5s" } as React.CSSProperties} d="M66,80 L57,94 M99,82 L107,95" stroke={ACCENT} {...common} />
      </>
    ),
  },
  {
    n: "02",
    title: "Remove a thin layer",
    note: "A saucer of tissue comes out under local anesthetic — you are awake but completely numb.",
    art: (
      <>
        <path className="draw" style={{ "--path-len": 150, "--draw-delay": "0s" } as React.CSSProperties} d="M8,40 C40,33 120,33 152,40" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 130, "--draw-delay": "0.2s" } as React.CSSProperties} d="M44,42 C46,72 114,72 116,42" stroke={ACCENT} strokeDasharray="5 5" {...common} />
        <path className="draw" style={{ "--path-len": 110, "--draw-delay": "0.4s" } as React.CSSProperties} d="M80,48 C70,49 66,55 68,62 C71,70 90,71 94,63 C97,55 90,49 80,48 Z" stroke={STROKE} {...common} />
      </>
    ),
  },
  {
    n: "03",
    title: "Map, freeze & stain",
    note: "The specimen is color-coded, frozen, and cut into ultra-thin slices — every edge keeps its address.",
    art: (
      <>
        <circle className="draw" style={{ "--path-len": 200, "--draw-delay": "0s" } as React.CSSProperties} cx="80" cy="66" r="31" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 130, "--draw-delay": "0.25s" } as React.CSSProperties} d="M80,35 V97 M49,66 H111" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 60, "--draw-delay": "0.5s" } as React.CSSProperties} d="M80,29 V23 M80,103 V109 M43,66 H37 M117,66 H123" stroke={ACCENT} {...common} />
      </>
    ),
  },
  {
    n: "04",
    title: "Read 100% of the margin",
    note: "Your surgeon personally examines the entire edge and undersurface under the microscope.",
    art: (
      <>
        <path className="draw" style={{ "--path-len": 70, "--draw-delay": "0s" } as React.CSSProperties} d="M52,102 H108" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 60, "--draw-delay": "0.15s" } as React.CSSProperties} d="M72,102 V64" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 50, "--draw-delay": "0.3s" } as React.CSSProperties} d="M72,64 L96,40 L103,33" stroke={STROKE} {...common} />
        <path className="draw" style={{ "--path-len": 30, "--draw-delay": "0.45s" } as React.CSSProperties} d="M84,52 L93,61" stroke={ACCENT} {...common} />
        <path className="draw" style={{ "--path-len": 45, "--draw-delay": "0.55s" } as React.CSSProperties} d="M60,80 H102" stroke={STROKE} {...common} />
        <circle className="draw" style={{ "--path-len": 30, "--draw-delay": "0.7s" } as React.CSSProperties} cx="81" cy="91" r="4" stroke={ACCENT} {...common} />
      </>
    ),
  },
  {
    n: "05",
    title: "Clear — then repair",
    note: "Margins confirmed clean; the wound is repaired the same day in most cases — stitches, a flap or graft, or healing naturally.",
    art: (
      <>
        <circle className="draw" style={{ "--path-len": 200, "--draw-delay": "0s" } as React.CSSProperties} cx="80" cy="66" r="31" stroke={STROKE} {...common} />
        <circle className="draw" style={{ "--path-len": 140, "--draw-delay": "0.2s" } as React.CSSProperties} cx="80" cy="66" r="21" stroke={ACCENT} strokeDasharray="4 6" {...common} />
        <path className="draw" style={{ "--path-len": 55, "--draw-delay": "0.45s" } as React.CSSProperties} d="M67,66 L77,76 L95,54" stroke={ACCENT} strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function MohsDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={animate ? "diagram-animate" : ""}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage.n}>
            <svg viewBox="0 0 160 120" className="mb-4 w-full max-w-[11rem]" aria-hidden="true">
              {stage.art}
            </svg>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span
                className="text-2xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--champagne)" }}
              >
                {stage.n}
              </span>
              <span className="font-semibold text-[0.9375rem]" style={{ color: "var(--ivory)" }}>
                {stage.title}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">{stage.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 border-t border-white/10 pt-5 text-sm text-white/55">
        If any edge still shows cancer, only that spot is removed and read again —
        the loop repeats until every margin is clear.
      </p>
    </div>
  );
}

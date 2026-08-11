"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

// Reveal-on-scroll that can never blank content. Server-rendered fully
// visible; after mount, elements still BELOW the viewport get .reveal-hidden
// and animate in via .reveal-in when they intersect. No JS, reduced motion,
// or a missed callback all leave content visible. direction is ignored —
// everything rises the same 12px; uniformity reads more expensive.
export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden" | "revealed">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide elements the user hasn't reached yet — above-the-fold content
    // must never flash out.
    if (el.getBoundingClientRect().top >= window.innerHeight * 0.92) {
      setState("hidden");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState("revealed");
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(el);
      // Hard backstop: whatever happens with the observer (headless capture,
      // print, an IO bug), nothing stays hidden longer than 2.5s.
      const failsafe = window.setTimeout(() => setState("revealed"), 2500);
      return () => {
        observer.disconnect();
        window.clearTimeout(failsafe);
      };
    }
  }, []);

  const motionClass =
    state === "hidden" ? "reveal-hidden" : state === "revealed" ? "reveal-in" : "";

  return (
    <div
      ref={ref}
      className={`${motionClass} ${className}`}
      style={state === "revealed" && delay ? { animationDelay: `${Math.min(delay, 0.25)}s` } : undefined}
    >
      {children}
    </div>
  );
}

// Hook for count-up animation
export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
): { value: number; ref: React.RefObject<HTMLDivElement | null> } {
  // Initialize at the target so server-rendered HTML carries the real number
  // (no-JS and crawlers must never read "0 surgeons"); the count-up animation
  // takes over from zero only once the element scrolls into view.
  const [value, setValue] = useState(end);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced-motion users keep the server-rendered target value — no count.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { value, ref };
}

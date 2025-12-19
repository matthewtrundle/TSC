"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  value: string;
  label: string;
  qualifier: string;
  suffix?: string;
  duration?: number;
}

export function CountUpStat({
  value,
  label,
  qualifier,
  suffix = "",
  duration = 2000
}: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric part from value (e.g., "99%" -> 99, "100+" -> 100, "1000s" -> 1000)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const hasPercent = value.includes("%");
  const hasPlus = value.includes("+");
  const hasS = value.toLowerCase().endsWith("s") && !value.includes("%");

  useEffect(() => {
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
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * numericValue);

      let formatted = current.toString();
      if (hasPercent) formatted += "%";
      else if (hasPlus) formatted += "+";
      else if (hasS) formatted += "s";

      setDisplayValue(formatted);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure final value matches exactly
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, numericValue, value, hasPercent, hasPlus, hasS, duration]);

  return (
    <div ref={ref} className="metric-item">
      <div className="metric-number">{displayValue}{suffix}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-qualifier">{qualifier}</div>
    </div>
  );
}

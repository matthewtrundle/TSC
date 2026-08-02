"use client";

import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

// Formerly a Framer Motion entrance animation. Hero copy starting at opacity 0
// is a liability, not polish — see FadeIn for the reasoning. API preserved;
// delay/direction are ignored.
export function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return <div className={className}>{children}</div>;
}

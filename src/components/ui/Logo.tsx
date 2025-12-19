"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className = "", height = 48 }: LogoProps) {
  // The logo image has whitespace, so we need larger dimensions and let CSS handle sizing
  return (
    <Image
      src="/images/logo2.png"
      alt="The Surgery Center"
      width={300}
      height={120}
      className={`h-auto ${className}`}
      style={{ height: height, width: 'auto' }}
      priority
      unoptimized
    />
  );
}

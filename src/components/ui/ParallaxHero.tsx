"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxHeroProps {
  children: React.ReactNode;
}

export function ParallaxHero({ children }: ParallaxHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax layers move at different speeds
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="hero-section relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Aurora background with parallax */}
      <motion.div className="hero-aurora" style={{ y: layer1Y }} />

      {/* Parallax blobs */}
      <motion.div className="hero-blob hero-blob-1" style={{ y: layer2Y }} />
      <motion.div className="hero-blob hero-blob-2" style={{ y: layer3Y }} />
      <motion.div className="hero-blob hero-blob-3" style={{ y: layer2Y }} />

      {/* Content with subtle parallax and fade */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: contentY, opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}

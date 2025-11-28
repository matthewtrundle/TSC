"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface OrganicShapeProps {
  className?: string;
  color?: "teal" | "navy" | "cream";
  size?: "sm" | "md" | "lg" | "xl";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  parallaxIntensity?: number;
  blur?: boolean;
}

const shapes = {
  blob1: "M45.3,-51.2C58.3,-40.9,68.5,-25.6,71.1,-8.6C73.8,8.4,69,27.1,58.2,40.6C47.4,54.1,30.6,62.4,12.3,67.3C-6,72.2,-25.8,73.7,-42.3,66.1C-58.8,58.5,-72,41.8,-76.8,22.9C-81.5,4,-77.8,-17.1,-68,-34.3C-58.2,-51.5,-42.3,-64.8,-25.7,-74C-9.1,-83.2,8.2,-88.3,24.4,-82.5C40.5,-76.7,55.4,-60,45.3,-51.2Z",
  blob2: "M44.9,-52.5C57.8,-43.6,67.5,-29.1,71.5,-12.5C75.5,4.2,73.9,22.9,65.2,37.8C56.5,52.7,40.7,63.7,23.3,69.1C5.9,74.4,-13.1,74,-30.2,67.6C-47.3,61.1,-62.5,48.6,-71.1,32.1C-79.6,15.6,-81.5,-4.8,-76.2,-23.2C-70.9,-41.5,-58.4,-57.8,-43.1,-66.1C-27.9,-74.4,-9.9,-74.8,4.6,-80.3C19.1,-85.8,32,-61.4,44.9,-52.5Z",
  blob3: "M39.5,-47.6C50.4,-38.5,58.1,-25.3,62.1,-10.3C66.1,4.7,66.3,21.5,58.9,34.5C51.5,47.5,36.5,56.7,20.4,62.2C4.3,67.7,-12.9,69.5,-28.2,64.1C-43.5,58.7,-56.9,46.1,-65.1,30.3C-73.3,14.5,-76.3,-4.5,-71.8,-21.7C-67.2,-38.9,-55.1,-54.3,-40.6,-62.8C-26.1,-71.3,-9.3,-72.9,3.8,-77.6C16.9,-82.3,28.5,-56.7,39.5,-47.6Z",
};

const colorMap = {
  teal: "var(--teal-accent)",
  navy: "var(--navy-primary)",
  cream: "var(--cream)",
};

const sizeMap = {
  sm: 200,
  md: 350,
  lg: 500,
  xl: 700,
};

const positionMap = {
  "top-left": { top: "-10%", left: "-10%" },
  "top-right": { top: "-10%", right: "-10%" },
  "bottom-left": { bottom: "-10%", left: "-10%" },
  "bottom-right": { bottom: "-10%", right: "-10%" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

export default function OrganicShape({
  className = "",
  color = "teal",
  size = "md",
  position = "top-right",
  parallaxIntensity = 0.2,
  blur = true,
}: OrganicShapeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, sizeMap[size] * parallaxIntensity]
  );

  const shapeKeys = Object.keys(shapes) as (keyof typeof shapes)[];
  const randomShape = shapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]];

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{
        ...positionMap[position],
        y,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className={blur ? "blur-3xl" : ""}
        style={{ opacity: 0.15 }}
      >
        <path
          fill={colorMap[color]}
          d={randomShape}
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  );
}

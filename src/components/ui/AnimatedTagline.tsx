"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTaglineProps {
  prefix?: string;
  words: string[];
  suffix?: string;
  className?: string;
  wordClassName?: string;
  interval?: number;
}

export default function AnimatedTagline({
  prefix = "",
  words,
  suffix = "",
  className = "",
  wordClassName = "text-[var(--teal-accent)]",
  interval = 3000,
}: AnimatedTaglineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={className}>
      {prefix}{" "}
      <span className="relative inline-block min-w-[200px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`inline-block ${wordClassName}`}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>{" "}
      {suffix}
    </span>
  );
}

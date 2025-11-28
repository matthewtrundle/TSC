"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassmorphismPanelProps {
  children: ReactNode;
  variant?: "subtle" | "medium" | "prominent" | "teal";
  className?: string;
  hover?: boolean;
  delay?: number;
}

const variantStyles = {
  subtle: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(74, 155, 155, 0.05)",
  },
  medium: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(74, 155, 155, 0.1)",
  },
  prominent: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(74, 155, 155, 0.1)",
  },
  teal: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(74, 155, 155, 0.15) 100%)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(74, 155, 155, 0.2)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(74, 155, 155, 0.1)",
  },
};

export default function GlassmorphismPanel({
  children,
  variant = "medium",
  className = "",
  hover = true,
  delay = 0,
}: GlassmorphismPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(74, 155, 155, 0.15)"
      } : undefined}
      className={`rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={{
        ...variantStyles[variant],
        WebkitBackdropFilter: variantStyles[variant].backdropFilter,
      }}
    >
      {children}
    </motion.div>
  );
}

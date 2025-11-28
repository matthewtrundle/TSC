"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, X, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/data/siteData";

interface FloatingCTAProps {
  showAfterScroll?: number;
}

export default function FloatingCTA({ showAfterScroll = 500 }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-0"
        >
          <div className="md:hidden flex gap-2">
            {/* Mobile: Two buttons side by side */}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--navy-primary)] text-white py-4 rounded-lg font-semibold shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white py-4 rounded-lg font-semibold shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Book</span>
            </Link>
          </div>

          {/* Desktop: Banner */}
          <div className="hidden md:block">
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-t-2xl shadow-dramatic border border-gray-200/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--teal-accent)]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[var(--teal-accent)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--navy-primary)]">
                      Ready to schedule your consultation?
                    </p>
                    <p className="text-sm text-gray-600">
                      Our team is here to help with your skin health needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--navy-primary)] text-[var(--navy-primary)] rounded-lg font-medium hover:bg-[var(--navy-primary)] hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-6 py-2 bg-[var(--teal-accent)] text-white rounded-lg font-medium hover:bg-[var(--teal-accent)]/90 transition-colors"
                  >
                    <span>Book Appointment</span>
                  </Link>
                  <button
                    onClick={handleDismiss}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

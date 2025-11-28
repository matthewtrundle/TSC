"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navigation } from "@/lib/data/siteData";
import { Phone, ChevronRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar - Logo only, slides up on scroll */}
        <div
          className={`flex items-center justify-center overflow-hidden transition-all duration-500 ease-out ${
            isScrolled ? "h-0 opacity-0" : "h-14 opacity-100"
          }`}
        >
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-xl font-bold text-[var(--navy-primary)] transition-colors group-hover:text-[var(--teal-accent)]">
              The Surgery Center
            </span>
            <span className="text-xs text-gray-500 -mt-0.5">
              at Plano Dermatology
            </span>
          </Link>
        </div>

        {/* Main Nav Bar - Always visible */}
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-14" : "h-12 border-t border-gray-100"
          }`}
        >
          {/* Left Side - Logo (only shows when scrolled) */}
          <div
            className={`transition-all duration-500 ${
              isScrolled ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-lg font-bold text-[var(--navy-primary)]">TSC</span>
              <span className="hidden sm:inline text-xs text-gray-400">|</span>
              <span className="hidden sm:inline text-xs text-gray-500">Plano Dermatology</span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  isActive(item.href)
                    ? "text-[var(--teal-accent)]"
                    : "text-gray-600 hover:text-[var(--navy-primary)] hover:bg-gray-50"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[var(--teal-accent)] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side - Phone & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                isScrolled
                  ? "text-sm text-[var(--navy-primary)]"
                  : "text-sm text-gray-600"
              } hover:text-[var(--teal-accent)]`}
            >
              <Phone className="w-4 h-4" />
              <span className="tabular-nums">{siteConfig.contact.phone}</span>
            </a>
            <Link
              href="/contact"
              className={`flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "bg-[var(--navy-primary)] text-white px-4 py-2 text-sm hover:bg-[var(--navy-dark)] hover:shadow-md"
                  : "bg-[var(--navy-primary)] text-white px-4 py-2 text-sm hover:bg-[var(--navy-dark)]"
              }`}
            >
              Request Appointment
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 text-[var(--navy-primary)] hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 top-1 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[calc(100vh-5rem)]" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6 bg-white border-t border-gray-100">
          <nav className="flex flex-col gap-1">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center justify-center gap-2 text-[var(--navy-primary)] font-semibold py-3 px-4 border-2 border-[var(--navy-primary)] rounded-xl hover:bg-[var(--navy-primary)] hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-[var(--navy-primary)] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[var(--navy-dark)] transition-colors"
            >
              Request Appointment
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navigation } from "@/lib/data/siteData";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Disappearing header on scroll + logo shrink
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Shrink logo after scrolling 50px
      setIsScrolled(currentY > 50);

      // Show header when scrolling up or at top
      if (currentY < lastScrollY.current || currentY < 50) {
        setIsVisible(true);
      } else if (currentY > 100) {
        // Hide when scrolling down past 100px
        setIsVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.08)" : "0 1px 0 rgba(0, 0, 0, 0.05)"
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-20" : "h-36"
        }`}>
          {/* Logo - starts large, shrinks on scroll */}
          <Link href="/" className="flex items-center">
            <div className="transition-all duration-300" style={{
              transform: isScrolled ? "scale(0.6)" : "scale(1)",
              transformOrigin: "left center"
            }}>
              <Logo height={150} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                  isActive(item.href)
                    ? "text-[var(--navy-primary)]"
                    : "text-[var(--warm-gray)] hover:text-[var(--navy-primary)]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="text-sm text-[var(--warm-gray)] hover:text-[var(--navy-primary)] transition-colors"
            >
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/appointment"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Request Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--navy-primary)]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <nav className="flex flex-col gap-4">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold tracking-wide uppercase py-2 ${
                    isActive(item.href)
                      ? "text-[var(--navy-primary)]"
                      : "text-[var(--warm-gray)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-2 text-[var(--navy-primary)] font-medium"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.contact.phone}
              </a>
              <Link
                href="/appointment"
                className="btn-primary w-full justify-center"
              >
                Request Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

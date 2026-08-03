"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navigation } from "@/lib/data/siteData";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/**
 * Two-row luxury header (the reference-site pattern): a slim utility bar with
 * the phone number and consultation CTA, then the logo + nav row beneath it.
 * Never hides on scroll — the audience skews older and the phone must stay
 * reachable; the utility bar is what collapses when scrolled.
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--ivory)]"
      style={{
        borderBottom: "1px solid var(--gray-200)",
        boxShadow: isScrolled ? "0 1px 6px rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      {/* Utility bar — collapses once the page is scrolled. */}
      {/* 40px + 72px main row = 112px, matching the pt-28 offset every page
          root uses for the fixed header. */}
      <div
        className={`hidden lg:block overflow-hidden border-b border-[var(--hairline)] transition-all duration-300 ${
          isScrolled ? "max-h-0 border-b-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-8 px-6">
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.links.patientPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-semibold tracking-[0.1em] uppercase text-[var(--bronze-text)] transition-colors hover:text-[var(--charcoal)]"
            >
              Patient Portal
            </a>
            <a
              href={siteConfig.links.billPay}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] font-semibold tracking-[0.1em] uppercase text-[var(--bronze-text)] transition-colors hover:text-[var(--charcoal)]"
            >
              Bill Pay
            </a>
          </div>
          <div className="flex items-center gap-8">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 whitespace-nowrap text-[0.9375rem] font-semibold text-[var(--charcoal)] transition-colors hover:text-[var(--bronze-text)]"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="whitespace-nowrap text-sm text-[var(--warm-gray-light)] transition-colors hover:text-[var(--bronze-text)]"
          >
            {siteConfig.contact.email}
          </a>
          <span className="text-sm text-[var(--warm-gray-light)]">
            {siteConfig.hours.short}
          </span>
          </div>
        </div>
      </div>

      {/* Main row — logo left, nav + CTA right. */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-24 items-center justify-between gap-8 lg:h-[4.5rem]">
          <Link href="/" className="flex flex-shrink-0 items-center">
            <Logo height={62} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap text-[0.8125rem] tracking-[0.14em] uppercase font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-[var(--charcoal)] underline decoration-[var(--bronze)] decoration-2 underline-offset-8"
                    : "text-[var(--warm-gray-light)] hover:text-[var(--charcoal)]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              className="btn-outline-bronze whitespace-nowrap px-3.5 py-2 text-[0.75rem]"
            >
              Request Appointment
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-[var(--charcoal)]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[var(--ivory)] border-t border-[var(--gray-200)]">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <nav className="flex flex-col gap-1">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex min-h-[44px] items-center py-2.5 text-lg font-semibold ${
                    isActive(item.href)
                      ? "text-[var(--charcoal)]"
                      : "text-[var(--warm-gray-light)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex gap-6 border-t border-[var(--gray-200)] pt-4">
              <a
                href={siteConfig.links.patientPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center text-[0.9375rem] font-semibold text-[var(--bronze-text)]"
              >
                Patient Portal
              </a>
              <a
                href={siteConfig.links.billPay}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center text-[0.9375rem] font-semibold text-[var(--bronze-text)]"
              >
                Bill Pay
              </a>
            </div>

            <div className="mt-2 space-y-4 border-t border-[var(--gray-200)] pt-6">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex min-h-[44px] items-center gap-2 text-lg font-semibold text-[var(--charcoal)] transition-colors hover:text-[var(--bronze-text)]"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.contact.phone}
              </a>
              <Link href="/appointment" className="btn-primary w-full justify-center">
                Request Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

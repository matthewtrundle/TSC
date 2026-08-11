"use client";

import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data/siteData";

/**
 * Fixed bottom action bar for phones and tablets. A 55+ audience on mobile
 * has two intents — call or request an appointment — so both live one thumb
 * away at all times. Hidden at lg where the header CTAs are visible.
 */
export default function MobileCallBar() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[var(--charcoal)] border-t border-[var(--champagne)] pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="flex items-stretch">
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex flex-1 items-center justify-center gap-2 min-h-[56px] text-[var(--ivory)] font-semibold"
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call</span>
        </a>
        <div className="w-px bg-white/15" aria-hidden="true" />
        <a
          href={`sms:${siteConfig.contact.smsRaw}`}
          className="flex flex-1 items-center justify-center gap-2 min-h-[56px] text-[var(--ivory)] font-semibold"
        >
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          <span>Text</span>
        </a>
        <div className="w-px bg-white/15" aria-hidden="true" />
        <Link
          href="/appointment"
          className="flex flex-1 items-center justify-center min-h-[56px] text-[var(--champagne)] font-semibold"
        >
          Appointment
        </Link>
      </div>
    </div>
  );
}

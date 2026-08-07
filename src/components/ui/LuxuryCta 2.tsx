import Link from "next/link";
import { siteConfig } from "@/lib/data/siteData";

type LuxuryCtaProps = {
  heading: string;
  subtext?: string;
};

/**
 * The full-bleed closing CTA band shared by the main pages: dark marble
 * surface, caps eyebrow, Cormorant heading, the phone number as a huge
 * Cormorant setpiece, then the appointment/call pair and the address line.
 * Server component — all data comes from siteConfig.
 */
export function LuxuryCta({ heading, subtext }: LuxuryCtaProps) {
  const { contact, hours } = siteConfig;

  return (
    <section className="band-dark py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="label-caps-light">Request a Consultation</p>
        <h2 className="text-display-lg mt-5" style={{ color: "var(--ivory)" }}>
          {heading}
        </h2>
        {subtext && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {subtext}
          </p>
        )}
        <a
          href={`tel:${contact.phoneRaw}`}
          className="mt-8 inline-block py-1 text-4xl font-medium lg:text-6xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--ivory)" }}
        >
          {contact.phone}
        </a>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/appointment" className="btn-inverse">
            Request an Appointment
          </Link>
          <a href={`tel:${contact.phoneRaw}`} className="btn-outline-champagne">
            Call the Office
          </a>
        </div>
        <p className="mt-10 text-sm text-white/60">
          {contact.address.full} &middot; {hours.short}
        </p>
      </div>
    </section>
  );
}

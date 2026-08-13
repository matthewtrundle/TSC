import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, doctors } from "@/lib/data/siteData";
import { FadeIn } from "@/components/ui/FadeIn";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { JsonLd, physicianSchema } from "@/lib/structuredData";

// /team is the roster (SEO brief Task 1, 2026-08-13): each card links to the
// surgeon's dedicated page at /team/[slug], where the full biography,
// credentials, and recognition markup now live. Old /team#dr-x anchor links
// still land here — the cards keep their ids.

export const metadata: Metadata = {
  title: "Board-Certified Dermatologists & Mohs Surgeons in Plano, TX",
  description:
    "Meet Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry — three board certified, fellowship trained Mohs surgeons in Plano, Texas.",
  alternates: { canonical: "/team" },
  openGraph: { title: "Board-Certified Dermatologists & Mohs Surgeons in Plano, TX", description: "Meet Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry — three board certified, fellowship trained Mohs surgeons in Plano, Texas.", url: "/team" },
};

const fellowships: Record<string, string> = {
  "dr-modi": "Fellowship, UT Southwestern Medical Center",
  "dr-wells": "Fellowship, UT Southwestern Medical Center",
  "dr-parry": "Fellowship, Scripps Clinic, San Diego",
};

export default function TeamPage() {
  return (
    <div className="pt-28">
      <JsonLd data={physicianSchema()} />

      {/* Intro. Left-aligned, says who they are in two sentences. */}
      <section className="bg-white border-b border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-display mb-6">Our surgeons</h1>
              <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-4">
                Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry are each
                board certified in dermatology and fellowship trained in Mohs
                micrographic surgery. Between them they have trained fifteen Mohs
                surgeons and hundreds of dermatology residents.
              </p>
              <p className="text-[var(--warm-gray-light)]">
                Select a surgeon for the full biography. To see one of them, call{" "}
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Roster — one card per surgeon linking to the dedicated page. */}
      <section className="bg-[var(--surface)] py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-3 lg:gap-14">
            {doctors.map((doctor, index) => (
              <FadeIn key={doctor.id} delay={index * 0.1}>
                <Link
                  href={`/team/${doctor.slug}`}
                  id={doctor.id}
                  className="group block scroll-mt-32"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ivory-deep)] border border-[var(--hairline)]">
                    <DoctorPortrait
                      name={doctor.name}
                      image={doctor.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-2 border border-[var(--hairline-bronze)] z-10 pointer-events-none"
                    />
                  </div>
                  <h2
                    className="mt-6 text-3xl text-[var(--charcoal)] transition-colors group-hover:text-[var(--bronze-text)]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {doctor.name.split(",")[0]}, MD
                  </h2>
                  <p className="label-caps mt-2">{doctor.title}</p>
                  <p className="label-caps mt-1" style={{ color: "var(--warm-gray-light)" }}>
                    {fellowships[doctor.id]}
                  </p>
                  <p className="mt-4 text-[var(--warm-gray)] leading-relaxed">{doctor.shortBio}</p>
                  <p className="mt-4 font-semibold text-[var(--bronze-text)]">
                    Full biography{" "}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — shared closing band. */}
      <LuxuryCta
        heading="See one of our surgeons"
        subtext="Most patients are seen within days of referral."
      />
    </div>
  );
}

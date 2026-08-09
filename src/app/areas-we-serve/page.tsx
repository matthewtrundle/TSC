import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { siteConfig } from "@/lib/data/siteData";

// =============================================================================
// AREAS WE SERVE
// The practice's catchment, stated plainly (Dr. Modi, 2026-08-09): the Collin
// County suburbs, the US-75 corridor north through Grayson County, Denton and
// Cooke County to the west, and southern Oklahoma. One genuinely useful page —
// why the drive is worth it for Mohs — NOT a farm of per-city doorway pages,
// which Google penalizes. Clinical claims here are all previously confirmed
// (one-to-two stages, margins read on site, seen within days of referral).
// =============================================================================

export const metadata: Metadata = {
  title: "Serving North Texas & Southern Oklahoma | Mohs Surgery in Plano, TX",
  description:
    "Patients travel to The Surgery Center at Plano Dermatology from Frisco, McKinney, Allen, Prosper, Celina, Sherman, Denison, Denton, Gainesville, and Durant, OK. Mohs surgery is a one-visit operation — margins read on site the same day.",
};

const AREA_GROUPS = [
  {
    title: "Collin County — close to home",
    blurb: "Minutes away by the Dallas North Tollway, Sam Rayburn Tollway, or US-75.",
    towns: [
      "Frisco", "Allen", "McKinney", "Prosper", "Celina", "Anna", "Melissa",
      "Lucas", "Wylie", "Sachse", "Murphy", "Richardson",
    ],
  },
  {
    title: "North along US-75",
    blurb: "A straight run down the highway — most of Grayson County is under an hour door to door.",
    towns: ["Gunter", "Van Alstyne", "Howe", "Sherman", "Denison", "Pottsboro", "Bells"],
  },
  {
    title: "West and northwest",
    blurb: "US-380 and I-35 bring Denton and Cooke County straight to our door.",
    towns: ["Denton", "Little Elm", "The Colony", "Gainesville"],
  },
  {
    title: "Southern Oklahoma",
    blurb: "US-75 crosses the Red River and keeps going — Texoma-area patients make the trip in about an hour and a half.",
    towns: ["Durant", "Calera", "Kingston"],
  },
];

const WORTH_THE_DRIVE = [
  "Mohs surgery is a one-visit operation here: the tumor is removed and 100% of the margins are read in our own laboratory while you wait.",
  "Most tumors clear in one to two stages, and reconstruction is done the same day — you make the drive once, not repeatedly.",
  "Referred patients are seen within days, not months.",
  "Three fellowship-trained Mohs surgeons under one roof, with same-day melanoma immunostaining that few practices anywhere can offer.",
];

export default function AreasWeServePage() {
  return (
    <div className="pt-28">
      {/* Intro */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="label-caps mb-6">Areas we serve</p>
              <h1 className="text-hero mb-6">
                Patients travel to us from across North Texas
              </h1>
              <p className="mb-4 text-lg leading-relaxed text-[var(--warm-gray)]">
                Skin cancer surgery is worth doing right, and for many of our
                patients that means a drive. Every week our schedule includes
                patients from the suburbs around Plano, the towns up the US-75
                corridor, and communities across the Red River in southern
                Oklahoma.
              </p>
              <p className="text-[var(--warm-gray-light)] leading-relaxed">
                Our office is on Plano&apos;s west side at{" "}
                {siteConfig.contact.address.street}, minutes from the Dallas
                North Tollway and the Sam Rayburn Tollway, with US-75 close by
                for everyone coming from the north.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The communities */}
      <section className="border-t border-[var(--gray-200)] bg-[var(--ivory-deep)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {AREA_GROUPS.map((group, i) => (
              <FadeIn key={group.title} delay={i * 0.05}>
                <h2 className="label-caps mb-2">{group.title}</h2>
                <span aria-hidden="true" className="rule-bronze mb-4" />
                <p className="mb-4 text-sm leading-relaxed text-[var(--warm-gray-light)]">
                  {group.blurb}
                </p>
                <p
                  className="text-lg leading-relaxed text-[var(--navy-primary)]"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  {group.towns.join(" · ")}
                </p>
              </FadeIn>
            ))}
          </div>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-[var(--warm-gray-light)]">
            Not on this list? It is nowhere near complete — these are simply
            the communities we see most. Wherever you are coming from, the
            answer is the same: call, and we will find a time that works.
          </p>
        </div>
      </section>

      {/* Why the drive is worth it */}
      <section className="border-t border-[var(--gray-200)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-display mb-4">One trip, done right</h2>
              <span aria-hidden="true" className="rule-bronze mb-5" />
              <p className="leading-relaxed text-[var(--warm-gray)]">
                The reason Mohs surgery travels well: it is designed to be
                finished in a single visit.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-3">
              <ul className="divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
                {WORTH_THE_DRIVE.map((item) => (
                  <li key={item} className="flex gap-3 py-4 text-[var(--warm-gray)]">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-4 shrink-0 bg-[var(--bronze)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[var(--warm-gray-light)]">
                Referring from an outlying practice?{" "}
                <Link
                  href="/referring"
                  className="font-semibold text-[var(--bronze-text)] transition-colors hover:text-[var(--charcoal)]"
                >
                  See how referrals work
                </Link>{" "}
                — a phone call or fax is enough, and we report back promptly.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <LuxuryCta
        heading="Worth the drive, once"
        subtext="Call the office and we will find a time that works — wherever you are coming from."
      />
    </div>
  );
}

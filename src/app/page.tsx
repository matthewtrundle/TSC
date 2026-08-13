import Link from "next/link";
import Image from "next/image";
import { siteConfig, doctors, services, practiceInfo } from "@/lib/data/siteData";
import { Phone, ChevronRight, Calendar } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { MohsDiagram } from "@/components/ui/MohsDiagram";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { PortraitCard } from "@/components/ui/PortraitCard";
import { CredentialBar } from "@/components/ui/CredentialBar";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { LuxuryCta } from "@/components/ui/LuxuryCta";
import { ServiceAccordion } from "@/components/ui/ServiceAccordion";

// The homepage treatment index, derived from the services data so copy stays
// in one place. Feature lines still pending the practice's confirmation
// ("PLACEHOLDER") are filtered here exactly as on the services page.
const treatmentIndex = ["mohs-surgery", "immunostaining", "high-risk-immunostaining", "reconstruction", "pilonidal", "skin-resurfacing", "hair-loss", "other-procedures"]
  .map((id) => services.find((s) => s.id === id))
  .filter((s): s is NonNullable<typeof s> => Boolean(s))
  .map((s) => ({
    href: `/services#${s.id}`,
    name: s.name,
    note: s.shortDescription,
    detail: s.description,
    features: s.features.filter((f) => !f.includes("PLACEHOLDER")),
  }));

// Fellowship institution per surgeon, pulled from the education data so the
// roster can say something specific instead of a generic title.
const fellowships: Record<string, string> = {
  "dr-modi": "Fellowship, UT Southwestern Medical Center",
  "dr-wells": "Fellowship, UT Southwestern Medical Center",
  "dr-parry": "Fellowship, Scripps Clinic, San Diego",
};

// Editorial portrait per surgeon for the home roster. The siteData image
// fields swap only after the likeness approval gate; the home page opts into
// the editorial set directly.
const editorialPortraits: Record<string, string> = {
  "dr-modi": "/images/dr-modi-warm.webp",
  "dr-wells": "/images/dr-wells-warm.webp",
  "dr-parry": "/images/dr-parry-warm.webp",
};

export default function Home() {
  return (
    <div className="pt-28">
      {/* Hero. Full-bleed dusk skyline with ambient Ken Burns drift; the
          destination claim up top, the factual positioning beneath it. */}
      <HeroMedia
        image="/images/hero-building-glaze.webp"
        alt="The Plano Dermatology building on a clear morning"
        priority
        scrim="left"
        className="flex min-h-[82vh] items-center justify-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="label-caps-light mb-6">
              The Mohs Center &middot; Plano, Texas
            </p>

            <h1 className="text-hero mb-6" style={{ color: "white" }}>
              Plano is <em className="accent-italic">the place</em> for Mohs surgery
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-white/80">
              Skin cancer is what we do. Our{" "}
              <strong className="font-semibold text-white">
                three board-certified and fellowship-trained surgeons
              </strong>{" "}
              remove it with Mohs micrographic surgery, reading 100% of your
              margins in our own laboratory while you wait, with cure rates up
              to 99%.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-6">
              <Link href="/appointment" className="btn-inverse">
                <Calendar className="h-4 w-4" />
                Request an Appointment
              </Link>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-3 py-1 text-3xl font-medium transition-colors hover:text-white/80 lg:text-4xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--ivory)" }}
              >
                <Phone className="h-5 w-5" />
                {siteConfig.contact.phone}
              </a>
            </div>

            <p className="text-sm text-white/60">
              Physician-owned and operated &middot; Physician referrals welcome
              &middot; Most insurance accepted &middot;{" "}
              <Link
                href="/areas-we-serve"
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Serving all of North Texas
              </Link>
            </p>
          </div>
        </div>
      </HeroMedia>

      {/* Credential strip. The four societies, typeset on an ivory band. */}
      <section className="border-y border-[var(--hairline)] bg-[var(--ivory)]">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <CredentialBar variant="light" />
        </div>
      </section>

      {/* The surgeons. They are the product; they come first. */}
      <section className="bg-[var(--surface)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 max-w-2xl">
              <h2 className="text-display mb-4">Your surgeons</h2>
              <span className="rule-bronze mb-6" aria-hidden="true" />
              <p className="text-lg text-[var(--warm-gray-light)]">
                Each is board certified in dermatology and fellowship trained in
                Mohs surgery. Between them, they have trained fifteen Mohs
                surgeons and hundreds of dermatology residents.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-10 md:grid-cols-3 lg:gap-14">
            {doctors.map((doctor, index) => (
              <FadeIn key={doctor.id} delay={index * 0.1}>
                <PortraitCard
                  name={doctor.name}
                  fellowship={fellowships[doctor.id]}
                  image={editorialPortraits[doctor.id]}
                  href={`/team/${doctor.slug}`}
                  bio={doctor.shortBio}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[var(--hairline)] pt-10 sm:grid-cols-3">
              {[
                { value: practiceInfo.stats.surgeons, label: "Fellowship-trained Mohs surgeons" },
                { value: practiceInfo.stats.combinedExperienceYears, label: "Years of combined experience" },
                { value: practiceInfo.stats.mohsSurgeonsTrained, label: "Mohs surgeons trained by our physicians" },
              ].map((stat) => (
                <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </FadeIn>

          {/* Why fellowship training matters — a light education for patients
              and referring physicians alike. */}
          <FadeIn delay={0.35}>
            <aside className="mt-14 border-l-2 border-[var(--bronze)] bg-[var(--ivory-deep)] px-8 py-7 lg:px-10">
              <h3
                className="mb-3 text-xl text-[var(--navy-primary)]"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
              >
                Why fellowship training matters
              </h3>
              <p className="max-w-3xl leading-relaxed text-[var(--warm-gray)]">
                Any dermatologist may perform Mohs surgery. A{" "}
                <strong className="font-semibold">fellowship-trained</strong>{" "}
                Mohs surgeon has done something harder: one to two additional
                years of accredited training under an established Mohs surgeon,
                covering hundreds of cases — the surgery, the microscope work,
                and the reconstruction. All three of our surgeons carry that
                training.
              </p>
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* What is Mohs surgery. The one dark band on the page. */}
      <section className="band-dark py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <FadeIn>
              <h2 className="text-display mb-6" style={{ color: "var(--ivory)" }}>
                What is Mohs surgery?
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-white/75">
                It is the most precise way to remove a skin cancer. The tumor
                comes out one thin layer at a time, and each layer is mapped and
                read under the microscope before the next is taken.
              </p>
              <p className="mb-10 text-lg leading-relaxed text-white/75">
                Because we examine 100% of the margin rather than sampling it,
                the cancer can be traced to its roots and nothing healthy is
                removed unnecessarily.
              </p>

              <dl className="border-t border-white/15">
                {[
                  ["Up to 99%", "cure rate for previously untreated skin cancers"],
                  ["100%", "of the surgical margin examined, not a sample"],
                  ["Same day", "you know the cancer is gone before you leave"],
                ].map(([value, label]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-6 py-4 border-b border-white/15">
                    <dt className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
                      {value}
                    </dt>
                    <dd className="self-center text-white/65">{label}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/services#mohs-surgery"
                className="mt-10 inline-flex items-center gap-2 border-b border-[var(--champagne)]/50 pb-0.5 font-semibold text-[var(--champagne)] transition-colors hover:border-white hover:text-white"
              >
                The procedure in detail
                <ChevronRight className="h-4 w-4" />
              </Link>
            </FadeIn>

          </div>

          {/* The procedure as line art — draws itself in as it enters view. */}
          <div className="mt-20 border-t border-white/10 pt-14">
            <p className="label-caps-light mb-10">The procedure, drawn simply</p>
            <MohsDiagram />
            <p className="mt-6 text-sm">
              <a
                href="#surgery-day"
                className="font-semibold text-[var(--champagne)] hover:text-white transition-colors"
              >
                See how the day unfolds below.
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Surgery day, hour by hour. The #1 anxiety for a patient with a new
          diagnosis is what the day will actually be like — answer it. */}
      <section id="surgery-day" className="texture-ivory scroll-mt-32 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <FadeIn className="lg:col-span-1">
              <h2 className="text-display mb-6">Your surgery day, hour by hour</h2>
              <p className="mb-6 leading-relaxed text-[var(--warm-gray)]">
                Mohs is done in stages, and the waiting between them is why the
                day runs long. Plan for a full day even though the surgery itself
                is short.
              </p>
              <Link
                href="/services#mohs-surgery"
                className="inline-flex items-center gap-1 font-semibold text-[var(--teal-accent)] hover:underline"
              >
                How the stages work
                <ChevronRight className="h-4 w-4" />
              </Link>
            </FadeIn>

            <div className="lg:col-span-2 divide-y divide-[var(--gray-200)] border-t border-[var(--gray-200)]">
              {[
                {
                  time: "7:30 AM",
                  title: "Check in",
                  description:
                    "A typical day starts at 7:30. Bring a book, headphones, and any medication you normally take. Eat breakfast first — there is no fasting requirement.",
                },
                {
                  time: "First hour",
                  title: "Numbing and first stage",
                  description:
                    "Local anesthetic only; you stay awake. Removing the first layer takes about fifteen minutes.",
                },
                {
                  time: "About an hour per stage",
                  title: "Waiting while we read the tissue",
                  description:
                    "Your tissue is frozen, sectioned, and read under the microscope on site — longer when special stains are needed. Most tumors clear in one to two stages.",
                },
                {
                  time: "Same morning",
                  title: "Repair or reconstruction, then home",
                  description:
                    "Once margins are clear, we close the wound. You will know the cancer is out before you leave — and you usually do not need a driver to get home.",
                },
              ].map((step, index) => (
                <FadeIn key={step.title} delay={index * 0.08}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <div className="label-caps pt-1.5">{step.time}</div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-[var(--navy-primary)]">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-[var(--warm-gray)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we treat — an index with hairlines, not a card grid. */}
      <section className="bg-[var(--surface)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-2xl">
                <h2 className="text-display mb-4">What we treat</h2>
                <p className="leading-relaxed text-[var(--warm-gray)]">
                  Skin cancer surgery is the core of the practice, but not all of
                  it. Below is the full range of services we offer.
                </p>
              </div>

              <div className="duotone-frame aspect-[4/3] rounded-sm">
                <Image
                  src="/images/svc-histology-art.webp"
                  alt="Stained histology tissue rendered as abstract art"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="img-duotone object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 z-10 border border-[var(--hairline-bronze)]"
                />
              </div>
            </div>
          </FadeIn>

          {/* Rows expand in place — no navigation, no page shift. */}
          <FadeIn>
            <ServiceAccordion items={treatmentIndex} />
          </FadeIn>
        </div>
      </section>

      {/* Referring physicians — a small strip that signals doctors send
          patients here. */}
      <section className="border-y border-[var(--hairline)] bg-[var(--ivory-deep)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
            <div className="shrink-0">
              <h2
                className="text-xl text-[var(--navy-primary)]"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
              >
                Referring physicians
              </h2>
              <span className="rule-bronze" aria-hidden="true" />
            </div>
            <p className="leading-relaxed text-[var(--warm-gray)]">
              We report back promptly and return every patient to your care.
              Referrals by phone at{" "}
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold text-[var(--navy-primary)] hover:text-[var(--teal-accent)]">
                {siteConfig.contact.phone}
              </a>{" "}
              or fax at <span className="font-semibold text-[var(--navy-primary)]">{siteConfig.contact.fax}</span>.{" "}
              <Link href="/referring" className="font-semibold text-[var(--teal-accent)] hover:underline whitespace-nowrap">
                How to refer a patient
                <ChevronRight className="ml-0.5 inline h-4 w-4 align-[-2px]" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA. Full-bleed dark marble, phone number set large. */}
      <LuxuryCta
        heading="Talk to us about your diagnosis"
        subtext="Most patients are seen within days of referral."
      />
    </div>
  );
}

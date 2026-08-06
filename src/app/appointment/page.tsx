import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/siteData";
import { Phone } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { AppointmentForm } from "@/components/forms/AppointmentForm";


export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Request an appointment with a board certified Mohs surgeon at The Surgery Center at Plano Dermatology. Call (972) 378-0620 or submit a request online.",
  alternates: { canonical: "/appointment" },
  openGraph: { title: "Request an Appointment", description: "Request an appointment with a board certified Mohs surgeon at The Surgery Center at Plano Dermatology. Call (972) 378-0620 or submit a request online.", url: "/appointment" },
};

export default function AppointmentPage() {
  return (
    <div className="pt-28">
      {/* Header. Says what will happen, then puts the phone number first. */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-display mb-6">Request an appointment</h1>
              <p className="text-lg text-[var(--warm-gray)] leading-relaxed mb-8">
                Fill out the form below and our office will call you within one
                business day to set a time and verify your insurance.
              </p>
              <p className="text-[var(--warm-gray)] mb-3">
                Prefer to call? Many patients do — you will reach a person, not
                a phone tree.
              </p>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-4 text-4xl lg:text-5xl text-[var(--charcoal)] hover:text-[var(--bronze-text)] transition-colors"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                <Phone className="w-7 h-7" style={{ color: "var(--bronze)" }} />
                {siteConfig.contact.phone}
              </a>
              <p className="mt-6 text-sm text-[var(--warm-gray-light)]">
                Wondering what to expect?{" "}
                <a
                  href={siteConfig.links.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--bronze-text)] hover:underline"
                >
                  Read our patients&rsquo; reviews on Google
                </a>
                .
              </p>
              <p className="mt-2 text-sm text-[var(--warm-gray-light)]">
                Existing patient?{" "}
                <a
                  href={siteConfig.links.patientPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--bronze-text)] hover:underline"
                >
                  Visit the patient portal
                </a>{" "}
                to message us or manage your visits.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Hours and address as a quiet hairline strip. */}
        <div className="border-y border-[var(--hairline)]">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-x-12 gap-y-2 text-base text-[var(--warm-gray)]">
            <span className="inline-flex items-baseline gap-3">
              <span className="label-caps">Hours</span>
              {siteConfig.hours.short}
            </span>
            <span className="inline-flex items-baseline gap-3">
              <span className="label-caps">Address</span>
              {siteConfig.contact.address.full}
            </span>
          </div>
        </div>
      </section>

      {/* The form, with what-happens-next alongside. */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Form on a stone panel with a hairline. */}
            <FadeIn className="lg:col-span-3">
              <div className="texture-ivory border border-[var(--hairline-bronze)] rounded-sm p-6 lg:p-10">
                <h2
                  className="text-2xl text-[var(--navy-primary)] mb-2"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  Appointment request
                </h2>
                <p className="text-[var(--warm-gray)] mb-8">
                  Fields marked with * are required.
                </p>

                <AppointmentForm />
              </div>
            </FadeIn>

            {/* What happens next, then the practical details. */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <h2
                  className="text-2xl text-[var(--navy-primary)] mb-5"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  What happens next
                </h2>
                <ol className="border-t border-[var(--gray-200)] mb-12">
                  {[
                    "Our team will call you within one business day",
                    "We'll verify your insurance coverage",
                    "New patient forms sent via email",
                    "Appointment confirmation by phone or text",
                  ].map((step, index) => (
                    <li
                      key={step}
                      className="grid grid-cols-[2rem_1fr] gap-3 py-4 border-b border-[var(--gray-200)]"
                    >
                      <span
                        className="text-lg font-semibold"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--bronze-text)" }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[var(--warm-gray)] self-center">{step}</span>
                    </li>
                  ))}
                </ol>
              </FadeIn>

              <FadeIn delay={0.15}>
                <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-2">
                  Office location
                </h3>
                <p className="text-[var(--warm-gray)] mb-1">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                  {siteConfig.contact.address.zip}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--teal-accent)] font-semibold hover:underline"
                >
                  Get directions
                </a>

                <h3 className="text-lg font-semibold text-[var(--navy-primary)] mt-10 mb-2">
                  Office hours
                </h3>
                <div className="space-y-1 text-[var(--warm-gray)]">
                  {siteConfig.hours.detailed.map((item) => (
                    <div key={item.day} className="flex justify-between gap-4 max-w-xs">
                      <span>{item.day}</span>
                      <span className={item.hours === "Closed" ? "text-[var(--warm-gray-light)]" : ""}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl text-sm text-[var(--warm-gray-light)]">
            <p>
              <strong>DISCLAIMER:</strong> By providing my wireless phone number to The Surgery
              Center at Plano Dermatology, I agree and acknowledge that The Surgery Center at
              Plano Dermatology may send text messages to my wireless phone number for any purpose,
              including marketing purposes. Message and data rates may apply. Message frequency
              will vary, and you will be able to Opt-out by replying &quot;STOP&quot;, assistance can be
              found by texting &quot;HELP&quot;.
            </p>
            <p className="mt-2">
              No mobile information will be shared with third parties/affiliates
              for marketing/promotional purposes. See our{" "}
              <a href="/privacy" className="underline hover:text-[var(--warm-gray)]">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

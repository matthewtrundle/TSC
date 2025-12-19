"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, skinCancerTypes, mohsProcess, practiceInfo } from "@/lib/data/siteData";
import { Phone, ChevronRight, CheckCircle, Microscope, Shield, Heart, Plus } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  microscope: Microscope,
  shield: Shield,
  heart: Heart,
  plus: Plus,
};

export default function ServicesPage() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[var(--cream)]/30 via-white to-white py-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Comprehensive Care</p>
              <h1 className="text-display mb-6">
                Our Services
              </h1>
              <div className="organic-accent-line" />
              <p className="text-xl text-[var(--warm-gray)] mt-6">
                Comprehensive skin cancer treatment from diagnosis through reconstruction,
                delivered by board certified specialists.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Microscope;
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={service.id} delay={index * 0.1}>
                  <div
                    id={service.id}
                    className="scroll-mt-32"
                  >
                    <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className={!isEven ? 'lg:order-2' : ''}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center">
                            <Icon className="w-7 h-7 text-[var(--teal-accent)]" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--navy-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            {service.name}
                          </h2>
                        </div>
                        <p className="text-[var(--warm-gray)] mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-4">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                              <span className="text-[var(--navy-primary)]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={`bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)] ${!isEven ? 'lg:order-1' : ''}`}>
                        {service.id === 'mohs-surgery' ? (
                          <>
                            <h3 className="font-semibold text-[var(--navy-primary)] mb-6 text-lg">
                              The Mohs Process
                            </h3>
                            <div className="space-y-4">
                              {mohsProcess.slice(0, 6).map((step) => (
                                <div key={step.step} className="flex gap-4">
                                  <div className="w-8 h-8 rounded-xl bg-[var(--navy-primary)] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                    {step.step}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[var(--navy-primary)]">
                                      {step.title}
                                    </div>
                                    <div className="text-sm text-[var(--warm-gray)]">{step.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg">
                            <Image
                              src="/images/generated/medical-consultation.png"
                              alt={service.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {index < services.length - 1 && (
                      <div className="mt-20">
                        <div className="h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skin Cancer Types */}
      <section className="py-24 bg-gradient-to-b from-[var(--cream)]/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--sage)]/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Expert Treatment</p>
              <h2 className="text-display mb-4">
                Skin Cancers We Treat
              </h2>
              <div className="organic-accent-line" />
              <p className="text-[var(--warm-gray)] max-w-2xl mx-auto mt-6">
                Our surgeons are experts in treating all types of skin cancer, from the
                most common to rare and complex cases.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skinCancerTypes.map((type, index) => (
              <FadeIn key={type.shortName} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-[var(--gray-200)] hover:shadow-lg hover:border-[var(--teal-accent)]/30 transition-all duration-300">
                  <h3 className="font-semibold text-[var(--navy-primary)] mb-3 text-lg">
                    {type.name}
                  </h3>
                  <p className="text-sm text-[var(--warm-gray)] leading-relaxed">{type.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mohs Surgery Detail Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">The Gold Standard</p>
                <h2 className="text-display mb-4">
                  About Mohs Micrographic Surgery
                </h2>
                <div className="organic-accent-line" />
              </div>

              <div className="prose prose-gray max-w-none mb-10">
                <p className="text-[var(--warm-gray)] mb-6 leading-relaxed text-lg">
                  {practiceInfo.mohsDescription.split('\n\n')[0]}
                </p>
                <p className="text-[var(--warm-gray)] mb-6 leading-relaxed">
                  {practiceInfo.mohsDescription.split('\n\n')[1]}
                </p>
                <p className="text-[var(--warm-gray)] leading-relaxed">
                  {practiceInfo.mohsDescription.split('\n\n')[2]}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)]">
                <h3 className="font-semibold text-[var(--navy-primary)] mb-6 text-lg">
                  Advantages of Mohs Surgery
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {practiceInfo.advantages.map((advantage) => (
                    <div key={advantage} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--navy-primary)]">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-gradient-to-b from-[var(--cream)]/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Your Visit</p>
              <h2 className="text-display mb-4">
                What to Expect
              </h2>
              <div className="organic-accent-line" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Before Surgery",
                items: [
                  "Get a good night's rest",
                  "Eat a good breakfast",
                  "Take regular medications unless directed otherwise",
                  "Avoid aspirin for 2 weeks prior",
                  "Avoid alcohol for 2 days prior",
                  "Bring a book or magazine",
                  "Arrange for someone to drive you home"
                ]
              },
              {
                title: "During Surgery",
                items: [
                  "Local anesthesia keeps you comfortable",
                  "Each stage takes 1-2 hours",
                  "Average of 2-3 stages needed",
                  "Most complete by midday",
                  "Tissue examined while you wait",
                  "Stay in our comfortable waiting area"
                ]
              },
              {
                title: "After Surgery",
                items: [
                  "Wound care instructions provided",
                  "Follow-up in 4-6 weeks",
                  "Then at 3 months, 6 months, annually",
                  "5-year observation period",
                  "Healing takes 6-18 months",
                  "Use sun protection going forward"
                ]
              }
            ].map((phase, index) => (
              <FadeIn key={phase.title} delay={index * 0.15}>
                <div className="bg-white rounded-2xl p-8 h-full border border-[var(--gray-200)] hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-[var(--navy-primary)] mb-6 text-lg flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center text-sm font-bold text-[var(--teal-accent)]">
                      {index + 1}
                    </span>
                    {phase.title}
                  </h3>
                  <ul className="space-y-3 text-[var(--warm-gray)]">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--cream)] via-white to-[var(--teal-accent)]/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="bg-[var(--navy-primary)] rounded-3xl p-12 lg:p-16 relative overflow-hidden shadow-2xl">
              {/* Inner decorative orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--teal-accent)]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  Questions About Our Services?
                </h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                  Contact us to learn more about our services or to schedule
                  a consultation with one of our board certified surgeons.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-lg shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    {siteConfig.contact.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy-primary)] px-8 py-4 rounded-xl font-semibold hover:bg-[var(--cream)] transition-colors text-lg shadow-lg"
                  >
                    Request Appointment
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

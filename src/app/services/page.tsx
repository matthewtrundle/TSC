"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, services, skinCancerTypes, mohsProcess, practiceInfo } from "@/lib/data/siteData";
import { Phone, ChevronRight, CheckCircle, Microscope, Shield, Heart, Plus, Target, Clock, Award, Scissors, Stethoscope, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  microscope: Microscope,
  shield: Shield,
  heart: Heart,
  plus: Plus,
};

// Service-specific images and colors
const serviceVisuals: Record<string, { image: string; gradient: string; accent: string }> = {
  "mohs-surgery": {
    image: "/images/generated/mohs-surgery-illustration.png",
    gradient: "from-[var(--navy-primary)] to-[var(--navy-dark)]",
    accent: "var(--teal-accent)"
  },
  "skin-cancer-treatment": {
    image: "/images/generated/skin-health-abstract.png",
    gradient: "from-[var(--teal-accent)]/20 to-[var(--sage)]/20",
    accent: "var(--teal-accent)"
  },
  "reconstruction": {
    image: "/images/generated/medical-consultation.png",
    gradient: "from-[var(--coral-soft)]/20 to-[var(--cream)]",
    accent: "var(--coral-soft)"
  },
  "other-procedures": {
    image: "/images/generated/hero-dermatology.png",
    gradient: "from-[var(--sage)]/20 to-[var(--cream)]",
    accent: "var(--sage)"
  }
};

export default function ServicesPage() {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section - Premium Design */}
      <section className="relative bg-gradient-to-br from-[var(--navy-primary)] via-[var(--navy-dark)] to-[var(--navy-primary)] py-16 lg:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path fill="white" d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.8C87.4,-32.6,90.1,-16.3,88.5,-1C86.9,14.4,81,28.7,72.1,40.6C63.2,52.5,51.4,62,38.1,69.3C24.8,76.6,10.1,81.7,-4.7,82.4C-19.6,83.1,-39.2,79.4,-54.3,70.1C-69.4,60.8,-80.1,46,-84.7,29.6C-89.3,13.2,-87.8,-4.8,-82.4,-21.2C-77,-37.6,-67.7,-52.3,-54.7,-60.3C-41.7,-68.2,-25,-69.3,-9.3,-71.3C6.4,-73.2,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[var(--teal-accent)] text-eyebrow mb-4">Comprehensive Care</p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'white' }}>
                Expert Skin Cancer Treatment
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[var(--teal-accent)] to-[var(--coral-soft)] mx-auto mb-6 rounded-full" />
              <p className="text-lg lg:text-xl text-white/80 mb-10">
                From diagnosis through reconstruction, our board certified Mohs surgeons
                deliver comprehensive care with the highest cure rates.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Target, value: "99%", label: "Cure Rate" },
                  { icon: Clock, value: "Same Day", label: "Results" },
                  { icon: Award, value: "3", label: "Board Certified Surgeons" },
                  { icon: Heart, value: "30+", label: "Years Experience" }
                ].map((stat, index) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/10">
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--teal-accent)] mx-auto mb-2" />
                    <div className="text-xl lg:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">What We Offer</p>
              <h2 className="text-display mb-4">Our Specialized Services</h2>
              <div className="organic-accent-line" />
            </div>
          </FadeIn>

          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Microscope;
              const visuals = serviceVisuals[service.id] || serviceVisuals["other-procedures"];
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={service.id} delay={index * 0.1}>
                  <div
                    id={service.id}
                    className="scroll-mt-32"
                  >
                    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                      {/* Content Side */}
                      <div className={!isEven ? 'lg:order-2' : ''}>
                        {/* Service Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--teal-accent)]/10 to-[var(--sage)]/10 rounded-full px-4 py-2 mb-6">
                          <Icon className="w-4 h-4 text-[var(--teal-accent)]" />
                          <span className="text-xs font-semibold text-[var(--navy-primary)] uppercase tracking-wide">
                            {index === 0 ? 'Gold Standard Treatment' : index === 1 ? 'Expert Diagnosis' : index === 2 ? 'Skilled Reconstruction' : 'Additional Care'}
                          </span>
                        </div>

                        <h2 className="text-2xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                          {service.name}
                        </h2>
                        <p className="text-[var(--warm-gray)] mb-8 leading-relaxed text-lg">
                          {service.description}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 bg-[var(--cream)]/50 rounded-xl p-3">
                              <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[var(--navy-primary)]">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Link
                          href="/appointment"
                          className="inline-flex items-center gap-2 bg-[var(--navy-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--navy-dark)] transition-colors shadow-lg"
                        >
                          Schedule Consultation
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>

                      {/* Visual Side */}
                      <div className={!isEven ? 'lg:order-1' : ''}>
                        {service.id === 'mohs-surgery' ? (
                          /* Mohs Surgery - Premium Process Card */
                          <div className="bg-gradient-to-br from-[var(--navy-primary)] to-[var(--navy-dark)] rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--teal-accent)]/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--teal-accent)]/20 flex items-center justify-center">
                                  <Microscope className="w-6 h-6 text-[var(--teal-accent)]" />
                                </div>
                                <h3 className="font-semibold text-white text-xl">
                                  The Mohs Process
                                </h3>
                              </div>
                              <div className="space-y-4">
                                {mohsProcess.slice(0, 6).map((step) => (
                                  <div key={step.step} className="flex gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--teal-accent)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                                      {step.step}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-white text-sm">
                                        {step.title}
                                      </div>
                                      <div className="text-xs text-white/60">{step.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Other Services - Image Card */
                          <div className="relative group">
                            <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
                              <Image
                                src={visuals.image}
                                alt={service.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              {/* Overlay gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-primary)]/60 via-transparent to-transparent" />

                              {/* Floating stat card */}
                              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-[var(--warm-gray)] uppercase tracking-wide mb-1">Treatment Focus</div>
                                    <div className="font-semibold text-[var(--navy-primary)]">{service.name}</div>
                                  </div>
                                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-[var(--teal-accent)]" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--teal-accent)]/10 rounded-2xl -z-10" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skin Cancer Types */}
      <section className="py-16 lg:py-24 bg-[var(--navy-primary)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-[var(--teal-accent)] text-eyebrow mb-4">Expert Treatment</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'white' }}>
                Skin Cancers We Treat
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[var(--teal-accent)] to-[var(--coral-soft)] mx-auto mb-6 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto">
                Our surgeons are experts in treating all types of skin cancer, from the
                most common to rare and complex cases.
              </p>
            </div>
          </FadeIn>

          {/* Common Skin Cancers - Top Row */}
          <div className="mb-8">
            <FadeIn>
              <p className="text-xs uppercase tracking-wider text-[var(--teal-accent)]/80 mb-4 text-center font-semibold">
                Most Common Types
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {skinCancerTypes.slice(0, 3).map((type, index) => (
                <FadeIn key={type.shortName} delay={index * 0.08}>
                  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--teal-accent)]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <AlertCircle className="w-5 h-5 text-[var(--teal-accent)]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--teal-accent)] uppercase tracking-wide">
                        {type.shortName}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-3 text-lg">
                      {type.name.split(' (')[0]}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed flex-grow">{type.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Rare Skin Cancers - Bottom Row */}
          <div>
            <FadeIn delay={0.25}>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-4 text-center font-semibold">
                Rare & Complex Cases
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {skinCancerTypes.slice(3).map((type, index) => (
                <FadeIn key={type.shortName} delay={0.3 + index * 0.08}>
                  <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 h-full flex flex-col text-center">
                    <div className="w-10 h-10 rounded-xl bg-[var(--coral-soft)]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mx-auto mb-3">
                      <AlertCircle className="w-5 h-5 text-[var(--coral-soft)]" />
                    </div>
                    <span className="text-xs font-bold text-[var(--coral-soft)]/80 uppercase tracking-wide mb-2">
                      {type.shortName}
                    </span>
                    <h3 className="font-semibold text-white mb-2 text-sm">
                      {type.name.split(' (')[0]}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed flex-grow">{type.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <FadeIn delay={0.5}>
            <div className="text-center mt-12">
              <p className="text-white/60 mb-4">Concerned about a spot on your skin?</p>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 bg-[var(--teal-accent)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors"
              >
                Schedule a Screening
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mohs Surgery Detail Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-[var(--cream)]/30">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <FadeIn>
              <div>
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">The Gold Standard</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  About Mohs Micrographic Surgery
                </h2>

                <div className="prose prose-gray max-w-none mb-8">
                  <p className="text-[var(--warm-gray)] mb-4 leading-relaxed">
                    {practiceInfo.mohsDescription.split('\n\n')[0]}
                  </p>
                  <p className="text-[var(--warm-gray)] leading-relaxed">
                    {practiceInfo.mohsDescription.split('\n\n')[1]}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "99%", label: "Cure Rate" },
                    { value: "50+", label: "Years Proven" },
                    { value: "#1", label: "Treatment Choice" }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-white rounded-xl border border-[var(--gray-200)]">
                      <div className="text-2xl font-bold text-[var(--teal-accent)]" style={{ fontFamily: 'var(--font-serif)' }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-[var(--warm-gray)]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 bg-[var(--navy-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--navy-dark)] transition-colors"
                >
                  Schedule Mohs Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            {/* Right - Advantages Card */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--navy-primary)] to-[var(--navy-dark)] rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--teal-accent)]/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--teal-accent)]/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <h3 className="font-semibold text-white text-xl">
                      Why Choose Mohs?
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {practiceInfo.advantages.slice(0, 8).map((advantage, index) => (
                      <div key={advantage} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-lg bg-[var(--teal-accent)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--teal-accent)]/30 transition-colors">
                          <CheckCircle className="w-4 h-4 text-[var(--teal-accent)]" />
                        </div>
                        <span className="text-white/80 text-sm">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Your Visit</p>
              <h2 className="text-display mb-4">
                What to Expect
              </h2>
              <div className="organic-accent-line" />
              <p className="text-[var(--warm-gray)] mt-6 max-w-2xl mx-auto">
                We want you to feel prepared and confident. Here&apos;s what your Mohs surgery experience will look like.
              </p>
            </div>
          </FadeIn>

          {/* Timeline connector for desktop */}
          <div className="hidden lg:block absolute top-[280px] left-1/2 -translate-x-1/2 w-[60%] h-1 bg-gradient-to-r from-[var(--teal-accent)]/20 via-[var(--teal-accent)] to-[var(--teal-accent)]/20 rounded-full" />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Before Surgery",
                icon: Clock,
                color: "teal",
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
                icon: Scissors,
                color: "navy",
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
                icon: Heart,
                color: "coral",
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
                <div className="relative bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-6 lg:p-8 h-full border border-[var(--gray-200)] hover:shadow-xl transition-all hover:-translate-y-1 group">
                  {/* Top Icon Circle */}
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center ${
                    index === 0 ? 'bg-[var(--teal-accent)]' : index === 1 ? 'bg-[var(--navy-primary)]' : 'bg-[var(--coral-soft)]'
                  }`}>
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="pt-6">
                    <h3 className="font-bold text-[var(--navy-primary)] mb-6 text-xl text-center" style={{ fontFamily: 'var(--font-serif)' }}>
                      {phase.title}
                    </h3>
                    <ul className="space-y-3 text-[var(--warm-gray)]">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            index === 0 ? 'text-[var(--teal-accent)]' : index === 1 ? 'text-[var(--navy-primary)]' : 'text-[var(--coral-soft)]'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--gray-200)]/50 flex items-center justify-center text-sm font-bold text-[var(--warm-gray)]">
                    {index + 1}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--cream)] via-white to-[var(--teal-accent)]/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-5xl mx-auto px-4 lg:px-6 relative z-10">
          <FadeIn>
            <div className="bg-[var(--navy-primary)] rounded-2xl lg:rounded-3xl p-8 lg:p-16 relative overflow-hidden shadow-2xl">
              {/* Inner decorative orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--teal-accent)]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'white' }}>
                  Questions About Our Services?
                </h2>
                <p className="text-base lg:text-lg text-white/80 mb-8 lg:mb-10 max-w-2xl mx-auto">
                  Contact us to learn more about our services or to schedule
                  a consultation with one of our board certified surgeons.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-base lg:text-lg shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    {siteConfig.contact.phone}
                  </a>
                  <Link
                    href="/appointment"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy-primary)] px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-[var(--cream)] transition-colors text-base lg:text-lg shadow-lg"
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

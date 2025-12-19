"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, practiceInfo, values } from "@/lib/data/siteData";
import { Phone, MapPin, Clock, ChevronRight, CheckCircle, Award, Target, Heart, GraduationCap, Users, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function PracticePage() {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section - Split Layout: Text Left, Image Right */}
      <section className="relative bg-gradient-to-br from-[var(--cream)]/50 via-white to-[var(--teal-accent)]/5 py-16 lg:py-24 overflow-hidden">
        {/* Glassmorphism Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[var(--sage)]/8 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <FadeIn>
              <div>
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 bg-[var(--teal-accent)]/10 border border-[var(--teal-accent)]/20 rounded-full px-4 py-2 mb-6">
                  <Users className="w-4 h-4 text-[var(--teal-accent)]" />
                  <span className="text-sm text-[var(--navy-primary)] font-medium">Welcome to Our Practice</span>
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--navy-primary)] mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                  World-Class Care,<br />
                  <span className="text-[var(--teal-accent)]">Compassionate Team</span>
                </h1>

                <p className="text-lg lg:text-xl text-[var(--warm-gray)] mb-8 leading-relaxed">
                  Our highly trained and compassionate team is dedicated to providing
                  personalized care in a warm, supportive environment where your
                  comfort and wellbeing come first.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {[
                    { value: "20+", label: "Team Members" },
                    { value: "5-Star", label: "Patient Care" },
                    { value: "100%", label: "Dedicated" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/80 backdrop-blur-sm border border-[var(--gray-200)] rounded-xl px-5 py-3 shadow-sm">
                      <div className="text-2xl font-bold text-[var(--navy-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>{stat.value}</div>
                      <div className="text-xs text-[var(--warm-gray)]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/appointment"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-lg shadow-lg"
                  >
                    Request Appointment
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--navy-primary)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--navy-dark)] transition-colors text-lg"
                  >
                    Meet Our Team
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Right - Team Image */}
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Main image container */}
                <div className="relative">
                  <div className="aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/TheOfficeTeam.png"
                      alt="The Surgery Center at Plano Dermatology team"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>

                  {/* Floating glass stat card */}
                  <div className="absolute -bottom-6 -left-6 lg:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[var(--teal-accent)]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[var(--navy-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>20+</div>
                        <div className="text-sm text-[var(--warm-gray)]">Team Members</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative frame */}
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[var(--teal-accent)]/20 rounded-3xl -z-10" />
                </div>

                {/* Background decorative orb */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[var(--coral-soft)]/20 rounded-full blur-2xl -z-10" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-[var(--teal-accent)]/15 rounded-full blur-2xl -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Glassmorphism orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[var(--teal-accent)]/10 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[var(--teal-accent)]" />
                  <span className="text-sm text-[var(--navy-primary)] font-medium">About Us</span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                  The Surgery Center at Plano Dermatology
                </h2>

                <div className="space-y-6">
                  <p className="text-[var(--warm-gray)] leading-relaxed text-lg">
                    We are committed to providing world-class care in a safe and comfortable
                    environment. Dr. Modi, Dr. Wells, and Dr. Parry are each board certified
                    and fellowship trained in the surgical treatment of skin cancer and other
                    dermatologic conditions.
                  </p>
                  <p className="text-[var(--warm-gray)] leading-relaxed">
                    This includes Mohs micrographic surgery, reconstructive surgery, mole and
                    cyst removal, nail procedures, as well as the treatment of melanoma and
                    other high-risk skin cancers.
                  </p>
                  <p className="text-[var(--warm-gray)] leading-relaxed">
                    Our surgeons have trained at some of the nation&apos;s most prestigious medical
                    institutions and bring decades of combined experience to every patient interaction.
                  </p>
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold mt-8 hover:underline"
                >
                  Learn About Our Services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image with premium treatment */}
              <div className="relative">
                <div className="relative">
                  {/* Main image */}
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/generated/medical-consultation.png"
                      alt="The Surgery Center at Plano Dermatology consultation"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Floating glass card */}
                  <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 max-w-[200px]">
                    <div className="text-3xl font-bold text-[var(--teal-accent)] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>15+</div>
                    <div className="text-sm text-[var(--warm-gray)]">Mohs Fellows Trained</div>
                  </div>

                  {/* Decorative frame */}
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[var(--teal-accent)]/20 rounded-3xl -z-10" />
                </div>

                {/* Glassmorphism orb */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[var(--coral-soft)]/20 rounded-full blur-2xl -z-10" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Values - Glass Cards */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[var(--cream)]/50 to-white relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/8 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-[var(--sage)]/10 rounded-full blur-3xl translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[var(--gray-200)] rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-[var(--coral-soft)]" />
                <span className="text-sm text-[var(--navy-primary)] font-medium">Our Values</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Our Commitment to You
              </h2>
              <p className="text-[var(--warm-gray)] max-w-2xl mx-auto">
                Every patient deserves exceptional care from a team they can trust.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const icons = [Award, Target, Heart, GraduationCap];
              const colors = ["teal-accent", "navy-primary", "coral-soft", "sage"];
              const Icon = icons[index] || Award;
              const color = colors[index] || "teal-accent";

              return (
                <FadeIn key={value.title} delay={index * 0.1}>
                  <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/50 hover:shadow-xl hover:bg-white transition-all duration-300 h-full hover:-translate-y-1">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--${color})]/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-[var(--${color})]`} />
                    </div>
                    <h3 className="font-semibold text-[var(--navy-primary)] mb-3 text-lg">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[var(--warm-gray)] leading-relaxed">{value.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Patients Choose Us - Premium Grid */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Glassmorphism orbs */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-[var(--navy-primary)]/5 rounded-full px-4 py-2 mb-6">
                  <Award className="w-4 h-4 text-[var(--navy-primary)]" />
                  <span className="text-sm text-[var(--navy-primary)] font-medium">Why Choose Us</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  Why Patients Trust Us
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {practiceInfo.advantages.map((advantage, index) => (
                  <FadeIn key={advantage} delay={index * 0.05}>
                    <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-white to-[var(--cream)]/30 rounded-xl border border-[var(--gray-200)] hover:shadow-lg hover:border-[var(--teal-accent)]/30 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-[var(--teal-accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--teal-accent)] transition-colors">
                        <CheckCircle className="w-4 h-4 text-[var(--teal-accent)] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[var(--navy-primary)] font-medium">{advantage}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Location & Hours - Glass Cards */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[var(--cream)]/30 to-white relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--coral-soft)]/8 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[var(--gray-200)] rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[var(--teal-accent)]" />
                <span className="text-sm text-[var(--navy-primary)] font-medium">Find Us</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--navy-primary)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Visit Our Office
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Location Card */}
            <FadeIn delay={0.1}>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/20 to-[var(--teal-accent)]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-[var(--teal-accent)]" />
                  </div>
                  <h3 className="font-bold text-[var(--navy-primary)] text-xl">Location</h3>
                </div>
                <p className="text-[var(--warm-gray)] mb-6 leading-relaxed text-lg">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--teal-accent)]/10 text-[var(--teal-accent)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--teal-accent)] hover:text-white transition-colors"
                >
                  Get Directions
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>

            {/* Hours Card */}
            <FadeIn delay={0.2}>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--coral-soft)]/20 to-[var(--coral-soft)]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-[var(--coral-soft)]" />
                  </div>
                  <h3 className="font-bold text-[var(--navy-primary)] text-xl">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {siteConfig.hours.detailed.map((item) => (
                    <div key={item.day} className="flex justify-between text-[var(--warm-gray)]">
                      <span>{item.day}</span>
                      <span className={item.hours === "Closed" ? "text-[var(--warm-gray)]/50" : "font-semibold text-[var(--navy-primary)]"}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[var(--navy-primary)] via-[var(--navy-dark)] to-[var(--navy-primary)] relative overflow-hidden">
        {/* Glassmorphism orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--teal-accent)]/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Phone className="w-4 h-4 text-[var(--teal-accent)]" />
                <span className="text-sm text-white/90 font-medium">Get Started</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Ready to Schedule Your<br />
                <span className="text-[var(--teal-accent)]">Consultation?</span>
              </h2>

              <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Contact us today to schedule an appointment with one of our
                board certified Mohs surgeons.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy-primary)] px-8 py-4 rounded-xl font-semibold hover:bg-[var(--cream)] transition-colors text-lg shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  {siteConfig.contact.phone}
                </a>
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-lg shadow-lg"
                >
                  Request Appointment
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

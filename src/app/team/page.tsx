"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, doctors } from "@/lib/data/siteData";
import { Phone, ChevronRight, GraduationCap, Award, BookOpen, MapPin, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function TeamPage() {
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
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Expert Care</p>
              <h1 className="text-display mb-6">
                Our Team
              </h1>
              <div className="organic-accent-line" />
              <p className="text-xl text-[var(--warm-gray)] mt-6">
                Three board certified, fellowship trained Mohs surgeons with decades
                of combined experience in skin cancer treatment.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-24">
            {doctors.map((doctor, index) => (
              <FadeIn key={doctor.id} delay={index * 0.1}>
                <div
                  id={doctor.id}
                  className="scroll-mt-32"
                >
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Photo & Quick Info */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-32">
                        <div className="w-56 h-56 mx-auto lg:mx-0 mb-6 rounded-2xl overflow-hidden shadow-xl relative">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <h2 className="text-2xl font-bold text-[var(--navy-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            {doctor.name}
                          </h2>
                          <p className="text-[var(--teal-accent)] font-medium mb-2">
                            {doctor.title}
                          </p>
                          <p className="text-[var(--warm-gray)] text-sm mb-4">
                            {doctor.specialty}
                          </p>
                        </div>

                        {/* Certifications */}
                        <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-6 mt-4 border border-[var(--gray-200)]">
                          <h4 className="font-semibold text-[var(--navy-primary)] mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[var(--teal-accent)]" />
                            Certifications
                          </h4>
                          <ul className="space-y-3 text-sm text-[var(--warm-gray)]">
                            {doctor.certifications.map((cert) => (
                              <li key={cert}>{cert}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Bio & Details */}
                    <div className="lg:col-span-2">
                      {/* Full Bio */}
                      <div className="mb-10">
                        <h3 className="text-xl font-semibold text-[var(--navy-primary)] mb-6">
                          About {doctor.name.split(",")[0]}
                        </h3>
                        <div className="prose prose-gray max-w-none">
                          {doctor.fullBio.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-[var(--warm-gray)] mb-4 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Education & Training */}
                      <div className="mb-10">
                        <h3 className="text-xl font-semibold text-[var(--navy-primary)] mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-[var(--teal-accent)]" />
                          </div>
                          Education & Training
                        </h3>
                        <div className="space-y-4">
                          {doctor.education.map((edu) => (
                            <div key={edu.degree} className="flex gap-4 items-start">
                              <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] mt-2 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-[var(--navy-primary)]">
                                  {edu.degree}
                                </div>
                                <div className="text-[var(--warm-gray)]">
                                  {edu.institution}
                                </div>
                                <div className="text-sm text-[var(--warm-gray)]/70">
                                  {edu.field}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Interests */}
                      {doctor.specialInterests && (
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--navy-primary)] mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-[var(--teal-accent)]" />
                            </div>
                            Special Interests
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {doctor.specialInterests.map((interest) => (
                              <span
                                key={interest}
                                className="px-4 py-2 bg-[var(--teal-accent)]/10 text-[var(--navy-primary)] text-sm rounded-full font-medium"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {index < doctors.length - 1 && (
                    <div className="mt-20">
                      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Summary */}
      <section className="py-24 bg-[var(--navy-primary)] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[var(--teal-accent)] text-eyebrow mb-4">Our Commitment</p>
              <h2 className="text-display text-white mb-6">
                A Legacy of Excellence
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--teal-accent)] to-[var(--coral-soft)] mx-auto mb-8 rounded-full" />
              <p className="text-white/80 text-lg leading-relaxed mb-12">
                Together, our surgeons have trained at the nation&apos;s most prestigious
                medical institutions, taught hundreds of residents and fellows, and
                provided exceptional care to thousands of patients. When you choose
                The Surgery Center at Plano Dermatology, you&apos;re choosing a team
                with unparalleled expertise and a commitment to your wellbeing.
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[
                  { value: "3", label: "Fellowship-Trained Surgeons" },
                  { value: "100+", label: "Years Combined Experience" },
                  { value: "15+", label: "Mohs Fellows Trained" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[var(--warm-gray)]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--teal-accent)]" />
                  <span>{siteConfig.contact.address.full}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--gray-200)]" />
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--teal-accent)]" />
                  <span>{siteConfig.hours.short}</span>
                </div>
              </div>
            </div>
          </FadeIn>
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
                  Request Your Appointment
                </h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                  Ready to meet with one of our board certified Mohs surgeons?
                  Contact us today to schedule your appointment.
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
                    href="/appointment"
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

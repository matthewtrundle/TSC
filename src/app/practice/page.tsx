"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, practiceInfo, doctors, values } from "@/lib/data/siteData";
import { Phone, MapPin, Clock, ChevronRight, CheckCircle, Award, Target, Heart, GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function PracticePage() {
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
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Welcome</p>
              <h1 className="text-display mb-6">
                Our Practice
              </h1>
              <div className="organic-accent-line" />
              <p className="text-xl text-[var(--warm-gray)] mt-6">
                World-class skin cancer care in a safe and comfortable environment.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">About Us</p>
                <h2 className="text-display mb-8">
                  The Surgery Center at Plano Dermatology
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-[var(--warm-gray)] mb-6 leading-relaxed text-lg">
                    We are committed to providing world-class care in a safe and comfortable
                    environment. Dr. Modi, Dr. Wells, and Dr. Parry are each board certified
                    and fellowship trained in the surgical treatment of skin cancer and other
                    dermatologic conditions.
                  </p>
                  <p className="text-[var(--warm-gray)] mb-6 leading-relaxed">
                    This includes Mohs micrographic surgery, reconstructive surgery, mole and
                    cyst removal, nail procedures, as well as the treatment of melanoma and
                    other high-risk skin cancers.
                  </p>
                  <p className="text-[var(--warm-gray)] leading-relaxed">
                    Our surgeons have trained at some of the nation&apos;s most prestigious medical
                    institutions and bring decades of combined experience to every patient interaction.
                    We believe in providing not just excellent medical care, but compassionate,
                    personalized attention to each patient who walks through our doors.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/generated/medical-consultation.png"
                    alt="The Surgery Center at Plano Dermatology consultation room"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--teal-accent)]/10 rounded-2xl -z-10" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-b from-[var(--cream)]/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--sage)]/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Our Values</p>
              <h2 className="text-display mb-4">
                Our Commitment to You
              </h2>
              <div className="organic-accent-line" />
              <p className="text-[var(--warm-gray)] max-w-2xl mx-auto mt-6">
                Every patient deserves exceptional care from a team they can trust.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const icons = [Award, Target, Heart, GraduationCap];
              const Icon = icons[index] || Award;
              return (
                <FadeIn key={value.title} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-8 text-center border border-[var(--gray-200)] hover:shadow-lg transition-shadow h-full">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[var(--teal-accent)]" />
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

      {/* Advantages of Our Practice */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Why Us</p>
                <h2 className="text-display mb-4">
                  Why Patients Choose Us
                </h2>
                <div className="organic-accent-line" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {practiceInfo.advantages.map((advantage, index) => (
                  <FadeIn key={advantage} delay={index * 0.05}>
                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-xl border border-[var(--gray-200)] hover:shadow-md transition-shadow">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--navy-primary)]">{advantage}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Team Preview */}
      <section className="py-24 bg-[var(--navy-primary)] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[var(--teal-accent)] text-eyebrow mb-4">Expert Team</p>
              <h2 className="text-display text-white mb-4">
                Our Surgeons
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--teal-accent)] to-[var(--coral-soft)] mx-auto mb-6 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto">
                Three board certified, fellowship trained Mohs surgeons with
                decades of combined experience.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {doctors.map((doctor, index) => (
              <FadeIn key={doctor.id} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg relative">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-[var(--teal-accent)] mb-4">{doctor.specialty}</p>
                  <Link
                    href={`/team#${doctor.id}`}
                    className="text-sm text-[var(--navy-primary)] font-semibold hover:text-[var(--teal-accent)] inline-flex items-center gap-1 transition-colors"
                  >
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 bg-white text-[var(--navy-primary)] px-8 py-4 rounded-xl font-semibold hover:bg-[var(--cream)] transition-colors text-lg shadow-lg"
              >
                Meet the Full Team
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Find Us</p>
              <h2 className="text-display mb-4">
                Visit Our Office
              </h2>
              <div className="organic-accent-line" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Location */}
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[var(--teal-accent)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg">Location</h3>
                </div>
                <p className="text-[var(--warm-gray)] mb-6 leading-relaxed">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--teal-accent)] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Get Directions
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>

            {/* Hours */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[var(--teal-accent)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg">Office Hours</h3>
                </div>
                <div className="space-y-3 text-[var(--warm-gray)]">
                  {siteConfig.hours.detailed.map((item) => (
                    <div key={item.day} className="flex justify-between">
                      <span>{item.day}</span>
                      <span className={item.hours === "Closed" ? "text-[var(--warm-gray)]/50" : "font-medium text-[var(--navy-primary)]"}>
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
                  Contact us today to schedule a consultation with one of our
                  board certified Mohs surgeons.
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

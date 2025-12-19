"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, doctors, services, mohsProcess, faqs } from "@/lib/data/siteData";
import { Phone, MapPin, Clock, ChevronRight, ChevronDown, Shield, Target, Heart, CheckCircle, Navigation, Calendar, MessageCircle, Microscope, Stethoscope, Scissors, Plus, Star, Award, Coffee, BookOpen, Users, Smile } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { MohsStepper } from "@/components/ui/MohsStepper";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { AnimatedText } from "@/components/ui/AnimatedText";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-32">
      {/* Hero Section - Clean White with Parallax */}
      <ParallaxHero>
        {/* Subtle hand-drawn organic background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Organic blob shapes - more visible */}
          <svg className="absolute -top-20 -left-20 w-[500px] h-[500px] opacity-[0.15]" viewBox="0 0 200 200">
            <path fill="var(--teal-accent)" d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.8C87.4,-32.6,90.1,-16.3,88.5,-1C86.9,14.4,81,28.7,72.1,40.6C63.2,52.5,51.4,62,38.1,69.3C24.8,76.6,10.1,81.7,-4.7,82.4C-19.6,83.1,-39.2,79.4,-54.3,70.1C-69.4,60.8,-80.1,46,-84.7,29.6C-89.3,13.2,-87.8,-4.8,-82.4,-21.2C-77,-37.6,-67.7,-52.3,-54.7,-60.3C-41.7,-68.2,-25,-69.3,-9.3,-71.3C6.4,-73.2,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute top-1/3 -right-32 w-[600px] h-[600px] opacity-[0.08]" viewBox="0 0 200 200">
            <path fill="var(--navy-primary)" d="M39.5,-67.8C51.9,-60.5,63.2,-51.6,71.5,-39.8C79.8,-28,85.2,-13.5,84.9,-0.2C84.6,13.2,78.6,26.3,70.1,37.4C61.6,48.4,50.6,57.3,38.3,63.8C26,70.2,12.5,74.2,-1.3,76.3C-15.1,78.5,-30.2,78.8,-43.1,73.2C-56,67.6,-66.7,56.1,-73.4,42.8C-80.1,29.5,-82.8,14.8,-82.1,0.4C-81.4,-14,-77.2,-28,-69.6,-39.7C-62,-51.4,-51,-60.8,-38.7,-68.1C-26.4,-75.4,-12.7,-80.6,0.4,-81.3C13.5,-82,27.1,-75.1,39.5,-67.8Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] opacity-[0.12]" viewBox="0 0 200 200">
            <path fill="var(--coral-soft)" d="M47.7,-79.1C62.3,-72.3,74.8,-60.4,82.4,-45.8C90,-31.3,92.6,-14.1,90.4,2.1C88.2,18.3,81.2,33.5,71.4,46.3C61.5,59.1,48.8,69.5,34.5,75.5C20.2,81.5,4.3,83.1,-11.9,81.6C-28.1,80.1,-44.6,75.4,-57.3,66C-70,56.6,-78.9,42.4,-83.4,26.9C-87.9,11.4,-88,-5.4,-83.7,-20.8C-79.4,-36.2,-70.7,-50.2,-58.4,-58.3C-46.1,-66.4,-30.2,-68.6,-15.1,-72C-0.1,-75.4,14.1,-80,47.7,-79.1Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute top-10 left-1/3 w-[300px] h-[300px] opacity-[0.10]" viewBox="0 0 200 200">
            <path fill="var(--sage)" d="M41.3,-70.4C54.4,-64.1,66.5,-54.8,74.8,-42.5C83.1,-30.2,87.5,-15.1,87.3,-0.1C87.1,14.9,82.2,29.7,73.8,42.1C65.4,54.5,53.4,64.4,40,71C26.6,77.6,11.8,80.8,-2.5,80.9C-16.7,81,-33.5,78.1,-47.5,71.1C-61.5,64.1,-72.8,53,-79.3,39.5C-85.8,26,-87.5,10.2,-85.2,-4.4C-82.9,-19,-76.6,-32.4,-67.2,-43.3C-57.8,-54.2,-45.3,-62.6,-32.4,-69.1C-19.5,-75.6,-6.2,-80.2,4.1,-81.3C14.5,-82.4,28.2,-76.8,41.3,-70.4Z" transform="translate(100 100)" />
          </svg>
          {/* Lighter gradient overlay so blobs show through */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-[var(--cream)]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* Text Side - Glass Morphism Box (2 cols) */}
            <AnimatedText delay={0} className="h-full lg:col-span-2">
              <div className="h-full bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[var(--teal-accent)]/10 rounded-full px-4 py-2 mb-6 w-fit">
                  <MapPin className="w-4 h-4 text-[var(--teal-accent)]" />
                  <span className="text-sm font-medium text-[var(--navy-primary)]">Plano, Texas</span>
                </div>

                <h1 className="text-hero mb-6">
                  World-Class<br />
                  <span className="text-[var(--teal-accent)]">Skin Cancer</span><br />
                  <span className="text-[var(--teal-accent)]">Care</span>
                </h1>

                <p className="text-lg text-[var(--warm-gray)] mb-8 leading-relaxed">
                  Board certified, fellowship trained Mohs surgeons delivering{" "}
                  <span className="font-semibold text-[var(--navy-primary)]">exceptional results</span>{" "}
                  with the highest cure rates in dermatologic surgery.
                </p>

                {/* Mobile App Style Action Buttons */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  <Link
                    href="/appointment"
                    className="flex flex-col items-center gap-2 bg-[var(--teal-accent)] text-white rounded-xl p-4 hover:bg-[var(--teal-dark)] transition-colors shadow-md"
                  >
                    <Calendar className="w-6 h-6" />
                    <span className="text-xs font-semibold">Request</span>
                  </Link>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex flex-col items-center gap-2 bg-white text-[var(--navy-primary)] rounded-xl p-4 hover:bg-[var(--cream)] transition-colors shadow-md border border-[var(--gray-200)]"
                  >
                    <Phone className="w-6 h-6" />
                    <span className="text-xs font-semibold">Call Us</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 bg-white text-[var(--navy-primary)] rounded-xl p-4 hover:bg-[var(--cream)] transition-colors shadow-md border border-[var(--gray-200)]"
                  >
                    <Navigation className="w-6 h-6" />
                    <span className="text-xs font-semibold">Directions</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex flex-col items-center gap-2 bg-white text-[var(--navy-primary)] rounded-xl p-4 hover:bg-[var(--cream)] transition-colors shadow-md border border-[var(--gray-200)]"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-xs font-semibold">Message</span>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 bg-[var(--navy-primary)]/5 rounded-full px-4 py-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-[var(--navy-primary)]">5.0 Rating</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[var(--navy-primary)]/5 rounded-full px-4 py-2 text-sm">
                    <Award className="w-4 h-4 text-[var(--teal-accent)]" />
                    <span className="font-medium text-[var(--navy-primary)]">Board Certified</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[var(--navy-primary)]/5 rounded-full px-4 py-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-[var(--navy-primary)]">Insurance Accepted</span>
                  </div>
                </div>
              </div>
            </AnimatedText>

            {/* Image Side - Wider (3 cols) */}
            <AnimatedText delay={0.2} direction="right" className="hidden lg:flex h-full lg:col-span-3">
              <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/Team.png"
                  alt="Dr. Modi, Dr. Wells, and Dr. Parry - The Surgery Center at Plano Dermatology"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </AnimatedText>
          </div>
        </div>
      </ParallaxHero>

      {/* Credentials Banner */}
      <section className="py-8 bg-white border-y border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              {[
                { src: "/images/Banner/Gemini_Generated_Image_cemhsocemhsocemh.png", alt: "American Board of Dermatology" },
                { src: "/images/Banner/Gemini_Generated_Image_4h49u34h49u34h49.png", alt: "American College of Mohs Surgery" },
                { src: "/images/Banner/Gemini_Generated_Image_j79v8dj79v8dj79v.png", alt: "American Academy of Dermatology" },
                { src: "/images/Banner/Gemini_Generated_Image_ksju3mksju3mksju.png", alt: "American Society for Dermatologic Surgery" },
              ].map((logo) => (
                <div key={logo.alt} className="relative h-12 lg:h-16 w-auto flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={64}
                    className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave transition to navy surgeons section */}
      <WaveDivider fill="var(--navy-primary)" />

      {/* Our Surgeons - Premium Editorial Layout */}
      <section className="py-24 bg-[var(--navy-primary)] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[var(--teal-accent)] text-eyebrow mb-4">Our Expert Team</p>
              <h2 className="text-display text-white mb-4" style={{ color: 'white' }}>Meet Your Surgeons</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--teal-accent)] to-[var(--coral-soft)] mx-auto mb-6 rounded-full" />
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Three board certified, fellowship trained Mohs surgeons with decades
                of combined experience in skin cancer treatment.
              </p>
            </div>
          </FadeIn>

          {/* Staggered Cards Layout */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {doctors.map((doctor, index) => (
              <FadeIn
                key={doctor.id}
                delay={index * 0.15}
                className={index === 1 ? "lg:-mt-8" : index === 2 ? "lg:mt-8" : ""}
              >
                <Link href={`/team#${doctor.id}`} className="group block">
                  <div className="relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    {/* Photo Section */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Name overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                          {doctor.name}
                        </h3>
                        <p className="text-[var(--teal-accent)] text-sm font-medium">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <p className="text-[var(--warm-gray)] text-sm leading-relaxed mb-5">
                        {doctor.shortBio}
                      </p>

                      {/* Quote */}
                      {doctor.quote && (
                        <div className="relative mb-5 pl-4 border-l-2 border-[var(--teal-accent)]">
                          <p className="text-[var(--navy-primary)] text-sm italic leading-relaxed">
                            &ldquo;{doctor.quote}&rdquo;
                          </p>
                        </div>
                      )}

                      <span className="inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold group-hover:gap-3 transition-all">
                        View Full Bio
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--teal-accent)]/20 to-transparent" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Stats Bar */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
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
          </FadeIn>
        </div>
      </section>

      {/* What is Mohs Surgery */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">The Gold Standard</p>
              <h2 className="text-display mb-6">What is Mohs Surgery?</h2>
              <p className="text-[var(--warm-gray)] mb-6 leading-relaxed">
                Mohs micrographic surgery is a highly specialized procedure for the
                removal of skin cancer. Developed by Dr. Frederick Mohs, it has been
                refined into an incredibly precise and tissue-sparing process.
              </p>
              <p className="text-[var(--warm-gray)] mb-8 leading-relaxed">
                Unlike other treatments, Mohs surgery offers cure rates up to
                <span className="font-semibold text-[var(--navy-primary)]"> 99% </span>
                while preserving maximum healthy tissue. Our surgeons pinpoint cancer
                and selectively remove only affected areas, tracing it to its roots.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: "Up to 99% cure rate" },
                  { icon: Clock, text: "Same-day results" },
                  { icon: Target, text: "Tissue-sparing technique" },
                  { icon: Heart, text: "Minimal scarring" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[var(--teal-accent)]" />
                    <span className="text-sm font-medium text-[var(--navy-primary)]">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/services" className="btn-teal">
                Learn More About Mohs Surgery
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mohs Process - Vertical Stepper */}
            <div className="bg-[var(--navy-primary)] rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-white mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                The Mohs Process
              </h3>
              <MohsStepper steps={mohsProcess.slice(0, 6)} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Premium Bento Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Comprehensive Care</p>
              <h2 className="text-display mb-4">Our Services</h2>
              <div className="organic-accent-line" />
            </div>
          </FadeIn>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured: Mohs Surgery - Large Card */}
            <FadeIn className="lg:col-span-2 lg:row-span-2">
              <Link href="/services#mohs-surgery" className="group block h-full">
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[var(--navy-primary)] via-[var(--navy-dark)] to-[var(--navy-primary)] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--teal-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--coral-soft)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 p-10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Microscope className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-[var(--teal-accent)]/20 text-[var(--teal-accent)] text-xs font-semibold rounded-full uppercase tracking-wide">
                        Gold Standard
                      </span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                      Mohs Micrographic Surgery
                    </h3>

                    <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                      The most precise and effective treatment for skin cancer, offering cure rates up to 99% while preserving maximum healthy tissue.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { icon: Shield, label: "99% Cure Rate" },
                        { icon: Clock, label: "Same-Day Results" },
                        { icon: Target, label: "Tissue Sparing" },
                        { icon: Heart, label: "Minimal Scarring" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-[var(--teal-accent)]" />
                          <span className="text-white/90 text-sm font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        Learn About Mohs Surgery
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Skin Cancer Treatment - Teal Accent */}
            <FadeIn delay={0.1}>
              <Link href="/services#skin-cancer-treatment" className="group block h-full">
                <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[var(--teal-accent)]/10 via-white to-[var(--cream)] rounded-3xl border border-[var(--teal-accent)]/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[var(--teal-accent)]/40 hover:-translate-y-1">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--teal-accent)]/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--sage)]/10 rounded-full blur-xl" />
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--teal-accent)] via-[var(--teal-accent)]/50 to-transparent" />

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--teal-accent)]/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--teal-accent)]/25 transition-all">
                      <Shield className="w-7 h-7 text-[var(--teal-accent)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--navy-primary)] mb-2">Skin Cancer Treatment</h3>
                    <p className="text-[var(--warm-gray)] text-sm leading-relaxed mb-4">Expert diagnosis and treatment for all types of skin cancer.</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold group-hover:gap-3 transition-all">
                      Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Reconstruction - Warm Coral Accent */}
            <FadeIn delay={0.2}>
              <Link href="/services#reconstruction" className="group block h-full">
                <div className="relative h-full min-h-[190px] bg-gradient-to-br from-[var(--coral-soft)]/10 via-white to-[var(--cream)] rounded-3xl border border-[var(--coral-soft)]/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[var(--coral-soft)]/40 hover:-translate-y-1">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--coral-soft)]/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--sage)]/10 rounded-full blur-xl" />
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--coral-soft)] via-[var(--coral-soft)]/50 to-transparent" />

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--coral-soft)]/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--coral-soft)]/25 transition-all">
                      <Scissors className="w-7 h-7 text-[var(--coral-soft)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--navy-primary)] mb-2">Reconstruction</h3>
                    <p className="text-[var(--warm-gray)] text-sm leading-relaxed mb-4">Expert wound closure and reconstruction after cancer removal.</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[var(--coral-soft)] font-semibold group-hover:gap-3 transition-all">
                      Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Other Services - Full Width with Sage Accent */}
            <FadeIn delay={0.3} className="lg:col-span-3">
              <Link href="/services#other-procedures" className="group block">
                <div className="relative bg-gradient-to-r from-[var(--sage)]/15 via-white to-[var(--teal-accent)]/10 rounded-3xl border border-[var(--sage)]/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--sage)]/40">
                  {/* Decorative elements */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--sage)] via-[var(--teal-accent)] to-[var(--sage)]" />
                  <div className="absolute right-0 top-0 w-64 h-32 bg-[var(--teal-accent)]/5 rounded-full blur-2xl" />

                  <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--sage)]/20 to-[var(--teal-accent)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-7 h-7 text-[var(--sage)]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--navy-primary)] mb-1">Additional Services</h3>
                        <p className="text-[var(--warm-gray)]">Mole removal, cyst removal, nail procedures, and more.</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[var(--sage)] font-semibold group-hover:gap-3 transition-all whitespace-nowrap">
                      View All Services
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What to Expect - Emotional Reassurance Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[var(--cream)]/30">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Your Comfort Matters</p>
              <h2 className="text-display mb-4">What to Expect on Surgery Day</h2>
              <p className="text-[var(--warm-gray)] max-w-2xl mx-auto">
                We understand that facing skin cancer surgery can feel overwhelming. Here&apos;s what your day will look like—no surprises, just calm, expert care.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Coffee,
                time: "Morning",
                title: "Arrive & Settle In",
                description: "Enjoy a comfortable waiting area. Bring a book or magazine—we'll take good care of you."
              },
              {
                icon: Users,
                time: "Check-In",
                title: "Meet Your Team",
                description: "Your surgeon and care team will explain each step and answer any last questions."
              },
              {
                icon: Shield,
                time: "During",
                title: "You're in Expert Hands",
                description: "Local anesthesia keeps you comfortable. Most patients feel relaxed and at ease."
              },
              {
                icon: Smile,
                time: "After",
                title: "Go Home Same Day",
                description: "Clear aftercare instructions, our number for questions, and follow-up scheduled."
              }
            ].map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[var(--teal-accent)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--teal-accent)] uppercase tracking-wide">{step.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--navy-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--warm-gray)] leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-10 text-center">
              <p className="text-[var(--warm-gray)] mb-4">
                Most procedures are completed by midday. You&apos;ll know your cancer is gone before you leave.
              </p>
              <Link href="/services#mohs-surgery" className="text-[var(--teal-accent)] font-semibold hover:underline inline-flex items-center gap-1">
                Learn more about the Mohs process
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section - Premium Design */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--teal-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--coral-soft)]/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left Column - Header & Contact */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <FadeIn>
                <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Got Questions?</p>
                <h2 className="text-display mb-6">Frequently Asked Questions</h2>
                <p className="text-[var(--warm-gray)] mb-8 leading-relaxed">
                  Find answers to common questions about Mohs surgery and what to expect during your visit.
                </p>
                <div className="bg-gradient-to-br from-[var(--cream)] to-white rounded-2xl p-6 border border-[var(--gray-200)]">
                  <p className="text-sm text-[var(--navy-primary)] font-medium mb-3">Still have questions?</p>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="flex items-center gap-3 text-[var(--teal-accent)] font-semibold hover:gap-4 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - FAQ Accordion */}
            <div className="lg:col-span-3 space-y-4">
              {faqs.slice(0, 5).map((faq, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className={`group rounded-2xl border transition-all duration-300 ${
                    openFaq === index
                      ? "bg-[var(--navy-primary)] border-[var(--navy-primary)] shadow-lg"
                      : "bg-white border-[var(--gray-200)] hover:border-[var(--teal-accent)]/30 hover:shadow-md"
                  }`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-5 text-left flex items-start gap-4"
                    >
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                        openFaq === index
                          ? "bg-[var(--teal-accent)] text-white"
                          : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                      }`}>
                        {index + 1}
                      </span>
                      <span className={`flex-1 font-semibold transition-colors ${
                        openFaq === index ? "text-white" : "text-[var(--navy-primary)]"
                      }`}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 ${
                          openFaq === index ? "rotate-180 text-white" : "text-[var(--warm-gray)]"
                        }`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}>
                      <div className="px-6 pb-6 pl-[4.5rem] text-white/80 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Light Background for Contrast */}
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
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'white' }}>
                  Ready to Take the Next Step?
                </h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                  Schedule your consultation with one of our board certified Mohs surgeons today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center justify-center gap-2 bg-[var(--teal-accent)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors text-lg shadow-lg">
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

                {/* Location Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{siteConfig.contact.address.full}</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{siteConfig.hours.short}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

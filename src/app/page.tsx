"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, doctors, services, mohsProcess, values, skinCancerTypes, faqs } from "@/lib/data/siteData";
import { Phone, MapPin, Clock, ChevronRight, CheckCircle, Award, GraduationCap, Target, Heart, ChevronDown, Shield, Sparkles, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="pt-20">
      {/* Hero Section - Premium Medical Polish */}
      <section className="hero-bg relative min-h-[90vh] overflow-hidden">
        {/* Refined Accent Orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-24">
            {/* Left Content */}
            <div>
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-[var(--teal-accent)]/10 text-[var(--teal-accent)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Plano, Texas
              </div>

              {/* Polished Typography */}
              <h1>
                <span className="text-hero-primary block">World-Class</span>
                <span className="text-hero-accent block">Skin Cancer Care</span>
              </h1>

              {/* Subtitle with improved spacing */}
              <p className="text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed mt-8">
                Board certified, fellowship trained Mohs surgeons delivering
                <span className="text-[var(--navy-primary)] font-semibold"> exceptional results </span>
                with the highest cure rates in dermatologic surgery.
              </p>

              {/* CTA Buttons - Swapped order for proper hierarchy */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link href="/contact" className="btn-hero-appointment group">
                  Request Appointment
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="btn-hero-phone group"
                >
                  <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* Trust Indicators with border separator */}
              <div className="trust-indicators">
                <div className="trust-item">
                  <CheckCircle className="icon" />
                  <span className="text">Board Certified</span>
                </div>
                <div className="trust-item">
                  <CheckCircle className="icon" />
                  <span className="text">Fellowship Trained</span>
                </div>
                <div className="trust-item">
                  <CheckCircle className="icon" />
                  <span className="text">Same-Day Results</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Image with Polished Stats */}
            <div className="relative hidden lg:block">
              {/* Ambient glow behind image */}
              <div className="hero-image-glow" />

              {/* Image container with refined styling */}
              <div className="hero-image-wrapper">
                <Image
                  src="/images/generated/medical-consultation.png"
                  alt="Modern consultation room at The Surgery Center at Plano Dermatology"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 99% Cure Rate Card - Polished */}
              <div className="stat-card-cure animate-float">
                <div className="stat-number">99%</div>
                <div className="stat-label">Cure Rate</div>
              </div>

              {/* Expert Surgeons Badge - Polished */}
              <div className="stat-card-surgeons animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="stat-number">3</div>
                <div className="stat-label">Expert Surgeons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Key Metrics - Big Numbers */}
      <section
        id="metrics"
        data-reveal
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-1000 ${isVisible("metrics") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { number: "99%", label: "Mohs Surgery Cure Rate", sublabel: "Industry-leading outcomes" },
              { number: "100+", label: "Years Combined Experience", sublabel: "Decades of expertise" },
              { number: "15+", label: "Fellows Trained", sublabel: "Teaching the next generation" },
              { number: "1000s", label: "Patients Treated", sublabel: "Trusted by the community" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-metric text-[var(--navy-primary)] mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-[var(--navy-primary)]">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Surgeons - Premium Card Design */}
      <section
        id="surgeons"
        data-reveal
        className="py-24 bg-[#f8f9fa] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-diagonal-lines opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible("surgeons") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">Our Expert Team</p>
            <h2 className="text-display text-[var(--navy-primary)] mb-6">
              Meet Your Surgeons
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three board certified, fellowship trained Mohs surgeons with decades
              of combined experience in skin cancer treatment.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${isVisible("surgeons") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {doctors.map((doctor, index) => (
              <Link
                key={doctor.id}
                href={`/team#${doctor.id}`}
                className="group"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="card-premium h-full">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--navy-primary)] to-[var(--teal-accent)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">
                      {doctor.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--navy-primary)] mb-2 group-hover:text-[var(--teal-accent)] transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-[var(--teal-accent)] font-medium text-sm mb-3">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doctor.shortBio}</p>
                  <div className="flex items-center justify-center gap-2 text-[var(--navy-primary)] font-medium text-sm group-hover:text-[var(--teal-accent)]">
                    View Full Bio
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What is Mohs Surgery - Split Design */}
      <section
        id="mohs-info"
        data-reveal
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible("mohs-info") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">The Gold Standard</p>
              <h2 className="text-display text-[var(--navy-primary)] mb-6">
                What is Mohs Surgery?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Mohs micrographic surgery is a highly specialized procedure for the
                removal of skin cancer. Developed by Dr. Frederick Mohs, it has been
                refined into an incredibly precise and tissue-sparing process.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Unlike other treatments, Mohs surgery offers cure rates up to
                <span className="font-bold text-[var(--navy-primary)]"> 99% </span>
                while preserving maximum healthy tissue. Our surgeons pinpoint cancer
                and selectively remove only affected areas, tracing it to its roots.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: "Up to 99% cure rate" },
                  { icon: Clock, text: "Same-day results" },
                  { icon: Sparkles, text: "Tissue-sparing technique" },
                  { icon: Heart, text: "Minimal scarring" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-lg">
                    <item.icon className="w-5 h-5 text-[var(--teal-accent)]" />
                    <span className="text-sm font-medium text-[var(--navy-primary)]">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/services" className="btn-teal group">
                Learn More About Mohs Surgery
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mohs Process Steps - Enhanced */}
            <div className="bg-gradient-to-br from-[var(--navy-primary)] to-[var(--navy-primary)]/90 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-diagonal-lines-dark opacity-50" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  The Mohs Process
                </h3>
                <div className="space-y-5">
                  {mohsProcess.slice(0, 6).map((step, index) => (
                    <div key={step.step} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-[var(--teal-accent)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{step.title}</div>
                        <div className="text-sm text-white/70">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Modern Cards */}
      <section
        id="services-section"
        data-reveal
        className="py-24 bg-[#f8f9fa] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-diagonal-lines opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible("services-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">Comprehensive Care</p>
            <h2 className="text-display text-[var(--navy-primary)] mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete skin cancer treatment from diagnosis through reconstruction.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${isVisible("services-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 h-full border-2 border-transparent hover:border-[var(--teal-accent)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--teal-accent)] transition-colors">
                    <Sparkles className="w-6 h-6 text-[var(--teal-accent)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--navy-primary)] mb-2 group-hover:text-[var(--teal-accent)] transition-colors">
                    {service.shortName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{service.shortDescription}</p>
                  <div className="flex items-center gap-1 text-sm text-[var(--teal-accent)] font-medium">
                    Learn More
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary group">
              View All Services
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skin Cancer Types - Compact Grid */}
      <section
        id="cancer-types"
        data-reveal
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible("cancer-types") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">Expert Treatment</p>
            <h2 className="text-display text-[var(--navy-primary)] mb-6">
              Conditions We Treat
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our surgeons are experts in treating all types of skin cancer, from common
              basal cell carcinoma to rare and complex cases.
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible("cancer-types") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {skinCancerTypes.map((type, index) => (
              <div
                key={type.shortName}
                className="bg-[#f8f9fa] rounded-xl p-4 text-center hover:bg-[var(--navy-primary)] hover:text-white group transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="font-bold text-[var(--navy-primary)] group-hover:text-white transition-colors mb-1">
                  {type.shortName}
                </div>
                <div className="text-xs text-gray-500 group-hover:text-white/70 transition-colors">{type.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Icon Grid */}
      <section
        id="why-us"
        data-reveal
        className="py-24 bg-gradient-to-br from-[var(--navy-primary)] to-[var(--navy-primary)]/95 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-diagonal-lines-dark" />

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible("why-us") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">Why Choose Us</p>
            <h2 className="text-display text-white mb-6">
              Excellence in Every Detail
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible("why-us") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {values.map((value, index) => {
              const icons = [Award, Target, Heart, GraduationCap];
              const Icon = icons[index] || Award;
              return (
                <div
                  key={value.title}
                  className="text-center group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[var(--teal-accent)] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[var(--teal-accent)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Accordion */}
      <section
        id="faq-section"
        data-reveal
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible("faq-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-[var(--teal-accent)] font-semibold uppercase tracking-wider mb-4">Got Questions?</p>
              <h2 className="text-display text-[var(--navy-primary)] mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible("faq-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {faqs.slice(0, 5).map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#f8f9fa] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-[var(--navy-primary)]">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-[var(--navy-primary)] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-6 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Design */}
      <section className="py-24 bg-gradient-to-br from-[var(--teal-accent)] to-[var(--teal-accent)]/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines-dark opacity-30" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-display text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Schedule your consultation with one of our board certified Mohs surgeons today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="btn-white group"
            >
              <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
              {siteConfig.contact.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--teal-accent)] transition-all duration-300 text-lg">
              Contact Us Online
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Location Info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{siteConfig.contact.address.full}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{siteConfig.hours.short}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

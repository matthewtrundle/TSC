"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data/siteData";
import { Phone, Calendar, Clock, MapPin, Send, CheckCircle, ChevronRight, User, Mail, MessageSquare } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "morning",
    appointmentType: "new-patient",
    referralSource: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <p className="text-eyebrow text-[var(--teal-accent)] mb-4">Schedule Your Visit</p>
              <h1 className="text-display mb-6">
                Request an Appointment
              </h1>
              <div className="organic-accent-line" />
              <p className="text-xl text-[var(--warm-gray)] mt-6">
                Take the first step toward expert skin cancer care. Fill out the form below and our team will contact you to confirm your appointment.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="py-8 bg-[var(--navy-primary)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[var(--teal-accent)]" />
              <span>Call us: <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold hover:text-[var(--teal-accent)] transition-colors">{siteConfig.contact.phone}</a></span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[var(--teal-accent)]" />
              <span>{siteConfig.hours.short}</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[var(--teal-accent)]" />
              <span>Plano, Texas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left - Form (3 cols) */}
            <FadeIn className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-10 border border-[var(--gray-200)] shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--teal-accent)]/15 to-[var(--teal-accent)]/5 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-[var(--teal-accent)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--navy-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>
                      Appointment Request Form
                    </h2>
                    <p className="text-[var(--warm-gray)] text-sm">
                      Fields marked with * are required
                    </p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-semibold text-[var(--navy-primary)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                      Request Received!
                    </h3>
                    <p className="text-[var(--warm-gray)] text-lg mb-8 max-w-md mx-auto">
                      Thank you for your appointment request. Our team will call you within 1 business day to confirm your appointment.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-[var(--teal-accent)] font-semibold hover:gap-3 transition-all"
                    >
                      Return to Homepage
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]/50" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                            placeholder="First name"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    {/* Contact Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]/50" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Phone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]/50" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Appointment Type */}
                    <div>
                      <label
                        htmlFor="appointmentType"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        Appointment Type *
                      </label>
                      <select
                        id="appointmentType"
                        name="appointmentType"
                        required
                        value={formData.appointmentType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="new-patient">New Patient Consultation</option>
                        <option value="mohs-surgery">Mohs Surgery</option>
                        <option value="follow-up">Follow-Up Appointment</option>
                        <option value="skin-check">Skin Cancer Screening</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Date/Time Preference Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="preferredDate"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--warm-gray)]/50" />
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="preferredTime"
                          className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                        >
                          Preferred Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="morning">Morning (8am - 12pm)</option>
                          <option value="afternoon">Afternoon (12pm - 5pm)</option>
                          <option value="flexible">I&apos;m Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Referral Source */}
                    <div>
                      <label
                        htmlFor="referralSource"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id="referralSource"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="doctor-referral">Doctor Referral</option>
                        <option value="friend-family">Friend or Family</option>
                        <option value="google">Google Search</option>
                        <option value="insurance">Insurance Provider</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[var(--navy-primary)] mb-2"
                      >
                        Additional Information
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[var(--warm-gray)]/50" />
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--teal-accent)] focus:border-transparent outline-none transition-all resize-none bg-white"
                          placeholder="Any additional details about your visit (e.g., referring physician, specific concerns)..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--teal-accent)] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[var(--teal-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                    >
                      {isSubmitting ? (
                        "Submitting Request..."
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Request Appointment
                        </>
                      )}
                    </button>

                    <p className="text-xs text-[var(--warm-gray)] text-center">
                      By submitting this form, you agree to be contacted by our office to schedule your appointment.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Right - Info Cards (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn delay={0.1}>
                <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)]">
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-[var(--warm-gray)]">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span>Our team will call you within 1 business day</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span>We&apos;ll verify your insurance coverage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span>New patient forms sent via email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                      <span>Appointment confirmation by phone or text</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-gradient-to-br from-[var(--navy-primary)] to-[var(--navy-dark)] rounded-2xl p-8 text-white">
                  <h3 className="font-semibold text-lg mb-4">Need Immediate Assistance?</h3>
                  <p className="text-white/80 mb-6">
                    Call us directly to speak with our scheduling team.
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="inline-flex items-center gap-2 bg-white text-[var(--navy-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--cream)] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)]">
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg mb-4">Office Location</h3>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                    <div className="text-[var(--warm-gray)]">
                      <p>{siteConfig.contact.address.street}</p>
                      <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
                    </div>
                  </div>
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

              <FadeIn delay={0.4}>
                <div className="bg-gradient-to-br from-[var(--cream)]/50 to-white rounded-2xl p-8 border border-[var(--gray-200)]">
                  <h3 className="font-semibold text-[var(--navy-primary)] text-lg mb-4">Office Hours</h3>
                  <div className="space-y-2 text-[var(--warm-gray)]">
                    {siteConfig.hours.detailed.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
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
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-[var(--cream)]/30 border-t border-[var(--gray-200)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-xs text-[var(--warm-gray)]">
            <p>
              <strong>DISCLAIMER:</strong> By providing my wireless phone number to The Surgery
              Center at Plano Dermatology, I agree and acknowledge that The Surgery Center at
              Plano Dermatology may send text messages to my wireless phone number for any purpose,
              including marketing purposes. Message and data rates may apply. Message frequency
              will vary, and you will be able to Opt-out by replying &quot;STOP&quot;, assistance can be
              found by texting &quot;HELP&quot;.
            </p>
            <p className="mt-2">
              Privacy Policy: No mobile information will be shared with third parties/affiliates
              for marketing/promotional purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

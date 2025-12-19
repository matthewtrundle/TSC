import Link from "next/link";
import Image from "next/image";
import { siteConfig, doctors } from "@/lib/data/siteData";
import { Phone, ChevronRight, GraduationCap, Award, BookOpen, MapPin } from "lucide-react";

export const metadata = {
  title: "Our Team | The Surgery Center at Plano Dermatology",
  description: "Meet our board certified, fellowship trained Mohs surgeons: Dr. Gunjan Modi, Dr. Michael Wells, and Dr. Edward Parry.",
};

export default function TeamPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-primary)] mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Three board certified, fellowship trained Mohs surgeons with decades
              of combined experience in skin cancer treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                id={doctor.id}
                className="scroll-mt-24"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Photo & Quick Info */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[var(--cream)] to-gray-100 relative">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-[var(--navy-primary)]">
                          {doctor.name}
                        </h2>
                        <p className="text-[var(--teal-accent)] font-medium mb-2">
                          {doctor.title}
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                          {doctor.specialty}
                        </p>
                      </div>

                      {/* Certifications */}
                      <div className="bg-[#f8f9fa] rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-[var(--navy-primary)] mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-[var(--teal-accent)]" />
                          Certifications
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
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
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-4">
                        About {doctor.name.split(",")[0]}
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        {doctor.fullBio.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-600 mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Education & Training */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[var(--teal-accent)]" />
                        Education & Training
                      </h3>
                      <div className="space-y-3">
                        {doctor.education.map((edu) => (
                          <div key={edu.degree} className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-[var(--teal-accent)] mt-2 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-[var(--navy-primary)]">
                                {edu.degree}
                              </div>
                              <div className="text-sm text-gray-600">
                                {edu.institution}
                              </div>
                              <div className="text-xs text-gray-500">
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
                        <h3 className="text-lg font-semibold text-[var(--navy-primary)] mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[var(--teal-accent)]" />
                          Special Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.specialInterests.map((interest) => (
                            <span
                              key={interest}
                              className="px-3 py-1 bg-[var(--teal-accent)]/10 text-[var(--navy-primary)] text-sm rounded-full"
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
                  <hr className="mt-16 border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Summary */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-6">
              A Legacy of Excellence
            </h2>
            <p className="text-gray-600 mb-8">
              Together, our surgeons have trained at the nation&apos;s most prestigious
              medical institutions, taught hundreds of residents and fellows, and
              provided exceptional care to thousands of patients. When you choose
              The Surgery Center at Plano Dermatology, you&apos;re choosing a team
              with unparalleled expertise and a commitment to your wellbeing.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-[var(--navy-primary)]">3</div>
                <div className="text-sm text-gray-600">Fellowship-Trained Surgeons</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[var(--navy-primary)]">100+</div>
                <div className="text-sm text-gray-600">Years Combined Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[var(--navy-primary)]">15+</div>
                <div className="text-sm text-gray-600">Mohs Fellows Trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-5 h-5 text-[var(--teal-accent)]" />
              <span>{siteConfig.contact.address.full}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {siteConfig.hours.weekdays} | {siteConfig.hours.friday}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--navy-primary)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Request Your Appointment
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Ready to meet with one of our board certified Mohs surgeons?
            Contact us today to schedule your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy-primary)] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Request Appointment
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

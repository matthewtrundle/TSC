import Link from "next/link";
import Image from "next/image";
import { siteConfig, practiceInfo, doctors, values } from "@/lib/data/siteData";
import { Phone, MapPin, Clock, ChevronRight, CheckCircle, Award, Target, Heart, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Our Practice | The Surgery Center at Plano Dermatology",
  description: "Learn about The Surgery Center at Plano Dermatology, our commitment to world-class skin cancer care, and our team of board certified Mohs surgeons.",
};

export default function PracticePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-primary)] mb-6">
              Our Practice
            </h1>
            <p className="text-xl text-gray-600">
              World-class skin cancer care in a safe and comfortable environment.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-6">
                The Surgery Center at Plano Dermatology
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  We are committed to providing world-class care in a safe and comfortable
                  environment. Dr. Modi, Dr. Wells, and Dr. Parry are each board certified
                  and fellowship trained in the surgical treatment of skin cancer and other
                  dermatologic conditions.
                </p>
                <p className="text-gray-600 mb-4">
                  This includes Mohs micrographic surgery, reconstructive surgery, mole and
                  cyst removal, nail procedures, as well as the treatment of melanoma and
                  other high-risk skin cancers.
                </p>
                <p className="text-gray-600">
                  Our surgeons have trained at some of the nation&apos;s most prestigious medical
                  institutions and bring decades of combined experience to every patient interaction.
                  We believe in providing not just excellent medical care, but compassionate,
                  personalized attention to each patient who walks through our doors.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/generated/medical-consultation.png"
                  alt="The Surgery Center at Plano Dermatology consultation room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-3">
              Our Commitment to You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every patient deserves exceptional care from a team they can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const icons = [Award, Target, Heart, GraduationCap];
              const Icon = icons[index] || Award;
              return (
                <div key={value.title} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--teal-accent)]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[var(--teal-accent)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--navy-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages of Our Practice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-8 text-center">
              Why Patients Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {practiceInfo.advantages.map((advantage) => (
                <div key={advantage} className="flex items-start gap-3 p-4 bg-[#f8f9fa] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[var(--teal-accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Preview */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-3">
              Our Surgeons
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three board certified, fellowship trained Mohs surgeons with
              decades of combined experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--cream)] to-gray-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-[var(--navy-primary)]">
                    {doctor.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--navy-primary)]">
                  {doctor.name}
                </h3>
                <p className="text-sm text-[var(--teal-accent)] mb-3">{doctor.specialty}</p>
                <Link
                  href={`/team#${doctor.id}`}
                  className="text-sm text-[var(--navy-primary)] font-medium hover:text-[var(--teal-accent)]"
                >
                  View Profile →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 bg-[var(--navy-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--navy-primary)]/90 transition-colors"
            >
              Meet the Full Team
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--navy-primary)] mb-8 text-center">
              Visit Our Office
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="bg-[#f8f9fa] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[var(--teal-accent)]" />
                  <h3 className="font-semibold text-[var(--navy-primary)]">Location</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--teal-accent)] font-medium hover:underline"
                >
                  Get Directions →
                </a>
              </div>

              {/* Hours */}
              <div className="bg-[#f8f9fa] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[var(--teal-accent)]" />
                  <h3 className="font-semibold text-[var(--navy-primary)]">Office Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  {siteConfig.hours.detailed.map((item) => (
                    <div key={item.day} className="flex justify-between">
                      <span>{item.day}</span>
                      <span className={item.hours === "Closed" ? "text-gray-400" : ""}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            Contact us today to schedule a consultation with one of our
            board certified Mohs surgeons.
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

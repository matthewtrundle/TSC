import Link from "next/link";
import { siteConfig, navigation } from "@/lib/data/siteData";
import { Phone, Mail, MapPin, Clock, ChevronRight, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy-primary)] text-white relative overflow-hidden">
      {/* Diagonal Lines Background */}
      <div className="absolute inset-0 bg-diagonal-lines-dark" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold text-white">
                The Surgery Center
              </h3>
              <p className="text-sm text-[var(--teal-accent)] font-medium">
                at Plano Dermatology
              </p>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6">
              Board certified, fellowship trained Mohs surgeons providing
              world-class skin cancer care in Plano, Texas.
            </p>
            <div className="flex gap-3">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-accent)] transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-accent)] transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-accent)] transition-colors"
                aria-label="Get directions"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[var(--teal-accent)]" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-[var(--teal-accent)] opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[var(--teal-accent)]" />
              Services
            </h4>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-[var(--teal-accent)] opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[var(--teal-accent)]" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--teal-accent)] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{siteConfig.contact.phone}</div>
                    <div className="text-xs text-white/50">Call us anytime</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--teal-accent)] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{siteConfig.contact.email}</div>
                    <div className="text-xs text-white/50">Email us</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-medium">{siteConfig.contact.address.street}</div>
                  <div className="text-sm text-white/50">
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-medium">Office Hours</div>
                  <div className="text-sm text-white/50">{siteConfig.hours.short}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

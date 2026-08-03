import Link from "next/link";
import { siteConfig, navigation } from "@/lib/data/siteData";
import { CredentialBar } from "@/components/ui/CredentialBar";
import { Logo } from "@/components/ui/Logo";

/**
 * Slim luxury footer. One nav column only — the Services column duplicated
 * the main nav's destinations and doubled the click surface for no benefit.
 * Type runs a step smaller than body; a footer is reference, not reading.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--charcoal-deep)] text-white"
      style={{ borderTop: "2px solid var(--bronze)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
          {/* Practice */}
          <div>
            <Link href="/" className="mb-5 inline-block">
              <Logo variant="dark" height={92} />
            </Link>
            <p className="text-sm leading-relaxed text-white/65">
              Physician-owned and operated. Board-certified,
              fellowship-trained Mohs surgeons treating skin cancer in Plano,
              Texas.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="label-caps-light mb-4 text-xs">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/75 transition-colors hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-caps-light mb-4 text-xs">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-lg font-semibold text-white transition-colors hover:text-white/80"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>Fax: {siteConfig.contact.fax}</li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.address.full}
                </a>
              </li>
              <li className="pt-1 text-xs text-white/55">
                {siteConfig.hours.weekdays}
                <br />
                {siteConfig.hours.friday}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Credentials + bottom bar, merged into one quiet block. */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-5 px-6 py-7">
          <CredentialBar variant="dark" className="justify-center" />
          <p className="text-center text-xs text-white/45">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="ml-5 text-white/45 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";

// Official marks, downloaded from each organization's own site. All render
// grayscale at uniform height so six different brand palettes read as one
// quiet strip; each links out to the organization (or, for D Best, to
// Dr. Modi's D Magazine directory profile).
const ITEMS = [
  {
    // True vector (Adobe-vectorized from the College's official logo,
    // rearranged mark-left/text-right; tagline dropped per Dr. Modi) —
    // resolution-independent at any zoom.
    name: "American College of Mohs Surgery",
    logo: "/images/societies/acms.svg",
    width: 1392,
    height: 273,
    href: "https://www.mohscollege.org",
  },
  {
    // The board's official round seal, extracted from ABD's own 2023 annual
    // report PDF. The name renders as live text beside it (per abderm.org's
    // own header lockup) — text stays perfectly sharp at any zoom.
    name: "American Board of Dermatology",
    logo: "/images/societies/abd-seal.webp",
    width: 800,
    height: 800,
    href: "https://www.abderm.org",
    seal: true,
    textLockup: true,
  },
  {
    // Academy-only lockup, derived from the AAD's own vector artwork (the
    // previous file was the "Association" variant). Marked seal so it gets
    // the taller size — a dotted mark + three stacked text lines reads
    // optically smaller than the horizontal lockups at equal height.
    name: "American Academy of Dermatology",
    logo: "/images/societies/aad.svg",
    width: 1075,
    height: 475,
    href: "https://www.aad.org",
    seal: true,
  },
  {
    name: "American Society for Dermatologic Surgery",
    logo: "/images/societies/asds.png",
    width: 1176,
    height: 398,
    href: "https://www.asds.net",
  },
  {
    // Adobe-vectorized from the full-size program mark Dr. Modi supplied
    // (transparent; TM intact, rendered navy).
    name: "Certification Matters — American Board of Medical Specialties",
    logo: "/images/societies/certification-matters.svg",
    width: 1015,
    height: 340,
    href: "https://www.certificationmatters.org",
  },
  {
    // Adobe-vectorized from the official 2024 badge Dr. Modi supplied,
    // year cropped (transparent; white D on red with red counter).
    name: "D Magazine Best Doctors",
    logo: "/images/societies/d-best-mark.svg",
    width: 1400,
    height: 1757,
    href: "https://directory.dmagazine.com/doctors/gunjan-m-modi-md/",
    seal: true,
  },
] as const;

type CredentialBarProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * The credential strip. Light variant: official logos, grayscale and muted,
 * uniform height, each linking out. Dark variant (footer): the color artwork
 * doesn't survive charcoal, so names stay typeset in champagne tracked caps —
 * now as links — with diamond separators.
 */
export function CredentialBar({
  variant = "light",
  className = "",
}: CredentialBarProps) {
  if (variant === "dark") {
    return (
      <ul
        className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 ${className}`.trim()}
      >
        {ITEMS.map((item, index) => (
          <li key={item.name} className="flex items-center gap-x-5">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-[0.4375rem] leading-none text-[var(--champagne)]"
              >
                &#9670;
              </span>
            )}
            {/* Nowrap only once the viewport can afford it — on phones the
                longest society name is wider than the screen and must wrap. */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps-light max-w-full text-center text-xs transition-opacity hover:opacity-75 sm:whitespace-nowrap"
            >
              {item.name.split(" — ")[0]}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${className}`.trim()}
    >
      {ITEMS.map((item) => (
        <li key={item.name} className="flex items-center">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-100"
            title={item.name}
          >
            <Image
              src={item.logo}
              // When the name renders as live text beside the mark, the image
              // is decorative — a non-empty alt would read the name twice.
              alt={"textLockup" in item && item.textLockup ? "" : item.name}
              width={item.width}
              height={item.height}
              // Round/stacked marks optically read smaller than horizontal
              // lockups, so they get a step more height.
              className={`w-auto opacity-75 grayscale ${
                "seal" in item && item.seal ? "h-12 lg:h-14" : "h-9 lg:h-11"
              }`}
            />
            {"textLockup" in item && item.textLockup && (
              <span className="text-left text-[0.8125rem] font-semibold leading-snug text-[var(--charcoal)] opacity-75">
                American Board
                <br />
                of Dermatology
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

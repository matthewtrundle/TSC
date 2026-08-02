import Image from "next/image";

// Official society marks, downloaded from each organization's own site.
// The ACMS artwork ships white-only, so a charcoal-tinted copy (same alpha)
// is used on light backgrounds. All render grayscale at uniform height so
// four different brand palettes read as one quiet strip.
const SOCIETIES = [
  {
    name: "American College of Mohs Surgery",
    logo: "/images/societies/acms.png",
    width: 375,
    height: 95,
  },
  {
    name: "American Board of Dermatology",
    logo: "/images/societies/abd.png",
    width: 240,
    height: 57,
  },
  {
    name: "American Academy of Dermatology",
    logo: "/images/societies/aad.svg",
    width: 1157,
    height: 475,
  },
  {
    name: "American Society for Dermatologic Surgery",
    logo: "/images/societies/asds.png",
    width: 473,
    height: 160,
  },
] as const;

type CredentialBarProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * The four professional societies. On light backgrounds: their official
 * logos, grayscale and slightly muted, uniform height. On dark bands the
 * color artwork doesn't survive, so the names stay typeset in champagne
 * tracked caps with diamond separators.
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
        {SOCIETIES.map((society, index) => (
          <li key={society.name} className="flex items-center gap-x-5">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-[0.4375rem] leading-none text-[var(--champagne)]"
              >
                &#9670;
              </span>
            )}
            <span className="label-caps-light whitespace-nowrap text-xs">
              {society.name}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 ${className}`.trim()}
    >
      {SOCIETIES.map((society) => (
        <li key={society.name} className="flex items-center">
          <Image
            src={society.logo}
            alt={society.name}
            width={society.width}
            height={society.height}
            className="h-9 w-auto opacity-75 grayscale lg:h-11"
          />
        </li>
      ))}
    </ul>
  );
}

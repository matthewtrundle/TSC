import Image from "next/image";
import Link from "next/link";

type PortraitCardProps = {
  name: string;
  credentials?: string;
  fellowship: string;
  image: string;
  href: string;
  bio?: string;
};

/**
 * Editorial surgeon portrait: duotone 4:5 image (B&W at rest, color on hover
 * via `.duotone-frame`/`.img-duotone`) with an inset bronze hairline frame.
 * The whole card is one link — the "Full biography" line is styled text, not
 * a nested anchor.
 */
export function PortraitCard({
  name,
  credentials,
  fellowship,
  image,
  href,
  bio,
}: PortraitCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="duotone-frame aspect-[4/5]">
        <Image
          src={image}
          alt={credentials ? `${name}, ${credentials}` : name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="img-duotone object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 z-10 border border-[var(--hairline-bronze)]"
        />
      </div>
      <div className="mt-5">
        <h3 className="serif-sub text-2xl text-[var(--charcoal)]">
          {name}
          {credentials && (
            <span className="text-lg text-[var(--warm-gray-light)]">
              , {credentials}
            </span>
          )}
        </h3>
        <p className="label-caps mt-2 text-xs">{fellowship}</p>
        {bio && (
          <p className="mt-3 leading-relaxed text-[var(--warm-gray)]">{bio}</p>
        )}
        <p className="mt-4 text-sm font-semibold tracking-wide text-[var(--bronze-text)] underline-offset-4 group-hover:underline">
          Full biography <span aria-hidden="true">&rarr;</span>
        </p>
      </div>
    </Link>
  );
}

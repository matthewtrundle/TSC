import Image from "next/image";
import type { ReactNode } from "react";

type HeroMediaProps = {
  /** Still image path — also serves as the poster when `video` is set. */
  image: string;
  /**
   * Reserved forward-compat prop: AVIF variant of the hero still. next/image
   * already negotiates AVIF for the still path; this slot exists so a real
   * video workflow (Veo/Sora clip + AVIF poster) can drop in without an API
   * change on the call sites.
   */
  imageAvif?: string;
  /** When set, an ambient looping video replaces the Ken Burns still. */
  video?: string;
  /** Optional second still — the hero slowly crossfades between the two.
      Reduced-motion users simply see the first image. */
  imageB?: string;
  altB?: string;
  alt: string;
  priority?: boolean;
  scrim?: "left" | "full" | "none";
  className?: string;
  children?: ReactNode;
};

/**
 * Full-bleed hero media band. Server component — the ambient motion is pure
 * CSS (Ken Burns on the still, native looping for video), so no client JS.
 *
 * The frame itself is the `.kenburns-frame` (relative + overflow-hidden):
 * `next/image fill` positions the media absolutely inside it, and `children`
 * render above the media/scrim at z-10, so pages compose their hero content
 * directly inside and the content gives the band its height.
 */
export function HeroMedia({
  image,
  video,
  imageB,
  altB,
  alt,
  priority = false,
  scrim = "left",
  className = "",
  children,
}: HeroMediaProps) {
  return (
    // .grain adds a 5% filmic noise overlay — takes the AI-clean edge off
    // generated imagery. Sits between the media and the content layer.
    <div className={`kenburns-frame grain ${className}`.trim()}>
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} />
        </video>
      ) : (
        <>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            className="kenburns-media object-cover"
          />
          {imageB && (
            // Second layer crossfades in and out on a slow CSS loop; with
            // reduced motion the animation is killed and only the base image
            // shows. Pure CSS — no client JS, nothing can strand the hero.
            <Image
              src={imageB}
              alt={altB ?? alt}
              fill
              sizes="100vw"
              className="kenburns-media hero-crossfade object-cover"
            />
          )}
        </>
      )}
      {scrim === "left" && <div className="hero-scrim" aria-hidden="true" />}
      {scrim === "full" && (
        <div className="hero-scrim-full" aria-hidden="true" />
      )}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
}

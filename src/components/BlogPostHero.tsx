import Image from "next/image";

type BlogPostHeroProps = {
  eyebrow: string;
  title: string;
  /** Optional hero photo (e.g. from `journal-posts`) */
  imageSrc?: string;
  imageAlt?: string;
};

/** Full-width hero for journal posts — optional photo with readable overlay. */
export function BlogPostHero({ eyebrow, title, imageSrc, imageAlt = "" }: BlogPostHeroProps) {
  const hasImage = Boolean(imageSrc);
  return (
    <header className={`blog-post-hero${hasImage ? " blog-post-hero--image" : ""}`}>
      {imageSrc ? (
        <div className="blog-post-hero-media">
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            className="blog-post-hero-img"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
      <div className="blog-post-hero-gradient" aria-hidden />
      <div className="blog-post-hero-inner">
        <span className="blog-post-hero-eyebrow">{eyebrow}</span>
        <h1 className="blog-post-hero-title">{title}</h1>
      </div>
    </header>
  );
}

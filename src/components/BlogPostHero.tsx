type BlogPostHeroProps = {
  eyebrow: string;
  title: string;
};

/** Full-width gradient hero for journal posts (≥400px desktop; shorter on small screens). */
export function BlogPostHero({ eyebrow, title }: BlogPostHeroProps) {
  return (
    <header className="blog-post-hero">
      <div className="blog-post-hero-gradient" />
      <div className="blog-post-hero-inner">
        <span className="blog-post-hero-eyebrow">{eyebrow}</span>
        <h1 className="blog-post-hero-title">{title}</h1>
      </div>
    </header>
  );
}

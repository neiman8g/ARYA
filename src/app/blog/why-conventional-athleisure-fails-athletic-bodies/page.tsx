import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Standard sizing | Arya",
  description: "Most brands grade one pattern. Arya cuts women's and men's patterns from scratch.",
  openGraph: {
    title: "Standard sizing | Arya",
    description: "Most brands grade one pattern. Arya cuts women's and men's patterns from scratch.",
    type: "article",
  },
};

export default function WhyAthleticBodiesPostPage() {
  const journal = getJournalPostBySlug("why-conventional-athleisure-fails-athletic-bodies");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Standard sizing",
          description: "Most brands grade one pattern. Arya cuts women's and men's patterns from scratch.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-03-01",
          dateModified: "2026-03-01",
          image: "https://www.arya.clothing/arya-fit.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/why-conventional-athleisure-fails-athletic-bodies",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="FIT PHILOSOPHY"
          title="Standard sizing"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">March 2026</p>
        <p>Most brands grade one pattern up and down. Arya cuts women&apos;s and men&apos;s patterns from scratch.</p>

        <p className="article-links">
          Start with the <Link href="/products/noble-legging">Noble Legging</Link>, read our <Link href="/fit-guide">fit philosophy</Link>, and visit the <Link href="/faq">FAQ</Link>.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Join the waitlist.</h2>
          <p>Join the waitlist for early access and founder updates.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Is sustainable activewear worth the investment? | Arya",
  description: "A $25 legging replaced every four months costs more per year than a $120 legging kept for two.",
  openGraph: {
    title: "Is sustainable activewear worth the investment? | Arya",
    description: "A $25 legging replaced every four months costs more per year than a $120 legging kept for two.",
    type: "article",
  },
};

export default function SustainableActivewearInvestmentPage() {
  const journal = getJournalPostBySlug("sustainable-activewear-worth-the-investment");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Is sustainable activewear worth the investment?",
          description: "A $25 legging replaced every four months costs more per year than a $120 legging kept for two.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
          dateModified: "2026-04-01",
          image: "https://www.arya.clothing/arya-story.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/sustainable-activewear-worth-the-investment",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="SUSTAINABILITY"
          title="Is sustainable activewear worth the investment?"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">April 2026</p>

        <p>A $25 legging replaced every four months costs $75 a year. A $120 legging kept for two years costs $60 a year.</p>

        <p className="article-links">
          Explore our <Link href="/collection">launch collection</Link>, read about our <Link href="/blog/what-is-nobleflex">NobleFlex fabric</Link>, and visit <Link href="/arya-standard">The Arya Standard</Link>.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Join the waitlist.</h2>
          <p>Early access and founder pricing. Launching 2027.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

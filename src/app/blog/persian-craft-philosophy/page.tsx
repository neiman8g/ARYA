import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "The name | Arya",
  description: "Arya is Persian for noble. Designed in California. Made in Spain.",
  openGraph: {
    title: "The name | Arya",
    description: "Arya is Persian for noble. Designed in California. Made in Spain.",
    type: "article",
  },
};

export default function PersianCraftPostPage() {
  const journal = getJournalPostBySlug("persian-craft-philosophy");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The name",
          description: "Arya is Persian for noble.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-03-01",
          dateModified: "2026-03-01",
          image: "https://www.arya.clothing/arya-story.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/persian-craft-philosophy",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="THE NAME"
          title="Arya is Persian for noble."
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">March 2026</p>
        <p>Arya is Persian for noble.</p>
        <p>Designed in California. Made in Spain.</p>

        <p className="article-links">
          Read the <Link href="/founder">founder story</Link>, explore <Link href="/arya-standard">The Arya Standard</Link>, and shop the <Link href="/collection">Noble Collection</Link>.
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

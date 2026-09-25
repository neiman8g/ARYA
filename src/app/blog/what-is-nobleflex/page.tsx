import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "What is NobleFlex? | Arya",
  description: "NobleFlex is the fabric in the Noble Legging and Noble Sports Bra. Four-way stretch, compression, and UV protection.",
  openGraph: {
    title: "What is NobleFlex? | Arya",
    description: "NobleFlex is the fabric in the Noble Legging and Noble Sports Bra. Four-way stretch, compression, and UV protection.",
    type: "article",
  },
};

export default function WhatIsNobleflexPostPage() {
  const journal = getJournalPostBySlug("what-is-nobleflex");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What is NobleFlex?",
          description: "NobleFlex is the fabric in the Noble Legging and Noble Sports Bra. Four-way stretch, compression, and UV protection.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-03-01",
          dateModified: "2026-03-01",
          image: "https://www.arya.clothing/arya-hero.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/what-is-nobleflex",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="MATERIALS"
          title="What is NobleFlex?"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">March 2026</p>
        <p>NobleFlex is the fabric in the Noble Legging and Noble Sports Bra. Four-way stretch, muscle compression, UV protection, and shape retention after washing.</p>

        <p className="article-links">
          Explore the <Link href="/products/noble-legging">Noble Legging</Link>, read <Link href="/arya-standard">The Arya Standard</Link>, and see how <Link href="/products/noble-tee">NobleSoft</Link> and <Link href="/products/noble-short">NobleDry</Link> fit into the system.
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

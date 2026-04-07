import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "What is NobleFlex? PFAS-Free Performance Fabric Engineered for Athletic Builds | Arya",
  description:
    "NobleFlex is Arya's proprietary performance fabric. Four-way stretch, muscle compression, UV protection, and skin certified. Here is what makes it different from conventional synthetic fabrics.",
  openGraph: {
    title: "What is NobleFlex? PFAS-Free Performance Fabric | Arya",
    description: "NobleFlex is Arya's proprietary performance fabric. Four-way stretch, muscle compression, UV protection, and skin certified.",
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
          headline: "What is NobleFlex? PFAS-Free Performance Fabric Engineered for Athletic Builds",
          description: "NobleFlex is Arya's proprietary performance fabric. Four-way stretch, muscle compression, UV protection, and skin certified.",
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
        <p>NobleFlex is the fabric we built the Noble Legging and Noble Sports Bra from. It is Arya's proprietary performance fabric and it was chosen for one reason: it is the best option available for the body wearing it.</p>

        <h2>What NobleFlex does</h2>
        <p>NobleFlex delivers four-way stretch in every direction so the fabric moves with you rather than against you. It provides muscle compression that supports without restricting, UV protection built into every fiber, and shape retention that holds after repeated washing. It is skin certified and free from the harmful dyes and chemical treatments found in conventional synthetic performance fabrics.</p>

        <h2>What conventional fabrics do instead</h2>
        <p>Most premium athleisure is made from virgin polyester or conventional nylon. These fabrics are derived from petroleum, trap heat against the skin, cause irritation in many wearers, and degrade into microplastics with every wash. They are also treated with chemical finishes including PFAS coatings that sit against your skin all day and never break down in the environment.</p>
        <p>NobleFlex was engineered to replace all of that.</p>

        <h2>Why it matters for your skin</h2>
        <p>Your skin is your largest organ. It absorbs what it touches. Every hour you spend in activewear is an hour your skin is in contact with whatever that fabric is made from and treated with. NobleFlex is skin certified and free from harmful substances. That is not a marketing claim. It is a design requirement.</p>

        <p className="article-links">
          Explore the <Link href="/products/noble-legging">Noble Legging</Link>, read <Link href="/arya-standard">The Arya Standard</Link>, and see how <Link href="/products/noble-tee">NobleSoft</Link> and <Link href="/products/noble-short">NobleDry</Link> fit into the system.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for early access and founder updates.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

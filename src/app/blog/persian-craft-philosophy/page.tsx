import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Persian Craft Philosophy and Premium Athleisure | The Arya Standard | Arya",
  description:
    "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Here is how that belief shapes every Arya garment.",
  openGraph: {
    title: "Persian Craft Philosophy and Premium Athleisure | Arya",
    description: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Here is how that belief shapes every Arya garment.",
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
          headline: "Persian Craft Philosophy and Premium Athleisure",
          description: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Here is how that belief shapes every Arya garment.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-03-01",
          mainEntityOfPage: "https://www.arya.clothing/blog/persian-craft-philosophy",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="HERITAGE"
          title="Persian craft philosophy and what it means for how we make clothes"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">March 2026</p>
        <p>The name Arya comes from the ancient Persian word for noble and honorable. It is the etymological root of the word Iran itself. That name was not chosen for its sound. It was chosen for what it demands.</p>

        <h2>What Persian craft philosophy means</h2>
        <p>In Persian craft tradition, the standard of doing something is not defined by how quickly it can be done or how cheaply it can be produced. It is defined by the precision brought to every detail. A Persian carpet is not valuable because of its materials alone. It is valuable because of the ten thousand decisions made in its creation, each one held to the same uncompromising standard.</p>
        <p>That philosophy shapes how we approach every Arya garment. Every stitch, every seam, every fabric decision is held to the same question: is this the best we can do?</p>

        <h2>The founder connection</h2>
        <p>Arya was founded by Nieman Gougerchian, a Persian-American born and raised in Los Angeles. He grew up visiting Iran as a child. He saw the colors of Isfahan&apos;s architecture, felt the warmth of the culture, and witnessed a people who treated everything they made as worth doing beautifully.</p>
        <p>That experience became the standard Arya is held to.</p>

        <h2>What it means in practice</h2>
        <p>Persian craft philosophy as a design brief means we do not cut corners on construction. It means we pattern from scratch rather than adapting existing blocks. It means we choose fabrics based on what is best for the person wearing them, not what is cheapest to source. It means we build for decades, not for a season.</p>

        <p className="article-links">
          Read the <Link href="/founder">founder story</Link>, explore <Link href="/arya-standard">The Arya Standard</Link>, and shop the <Link href="/collection">Noble Collection</Link>.
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

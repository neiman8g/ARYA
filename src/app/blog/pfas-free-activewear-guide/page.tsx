import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "NobleFlex, NobleSoft, NobleDry | Arya",
  description: "The three fabrics in the collection, and where each one is used.",
  openGraph: {
    title: "NobleFlex, NobleSoft, NobleDry | Arya",
    description: "The three fabrics in the collection, and where each one is used.",
    type: "article",
  },
};

export default function PfasFreeGuidePage() {
  const journal = getJournalPostBySlug("pfas-free-activewear-guide");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "NobleFlex, NobleSoft, NobleDry",
          description: "The three fabrics in the collection, and where each one is used.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
          dateModified: "2026-04-01",
          image: "https://www.arya.clothing/arya-hero.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/pfas-free-activewear-guide",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="SKIN CONSCIOUS"
          title="NobleFlex, NobleSoft, NobleDry"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">April 2026</p>

        <p>NobleFlex is used in the legging, sports bra, and long crop. NobleSoft is used in the tee. NobleDry is used in the short and pant.</p>
        <p>Notes on each fabric are on <Link href="/arya-standard">The Arya Standard</Link>.</p>

        <p className="article-links">
          Read more about our <Link href="/skin-conscious">skin-conscious philosophy</Link>, explore <Link href="/arya-standard">The Arya Standard</Link>, and see our <Link href="/collection">launch collection</Link>.
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

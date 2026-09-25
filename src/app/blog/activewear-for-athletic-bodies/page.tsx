import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "How Arya sizes | Arya",
  description: "Patterns start from scratch. Women's XS to 3XL. Men's S to 3XL.",
  openGraph: {
    title: "How Arya sizes | Arya",
    description: "Patterns start from scratch. Women's XS to 3XL. Men's S to 3XL.",
    type: "article",
  },
};

export default function ActivewearForAthleticBodiesPage() {
  const journal = getJournalPostBySlug("activewear-for-athletic-bodies");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How Arya sizes",
          description: "Patterns start from scratch. Women's XS to 3XL. Men's S to 3XL.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
          dateModified: "2026-04-01",
          image: "https://www.arya.clothing/arya-fit.jpg",
          mainEntityOfPage: "https://www.arya.clothing/blog/activewear-for-athletic-bodies",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="FIT ENGINEERING"
          title="How Arya sizes"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">April 2026</p>

        <p>Most brands start with one pattern and grade it up and down. Arya cuts women&apos;s and men&apos;s patterns from scratch. Women&apos;s sizes run XS to 3XL. Men&apos;s sizes run S to 3XL.</p>
        <p>The size notes are on the <Link href="/fit-guide">fit guide</Link>.</p>

        <p className="article-links">
          Start with the <Link href="/products/noble-legging">Noble Legging</Link>, read our <Link href="/fit-guide">fit philosophy</Link>, and check the <Link href="/faq">FAQ</Link> for sizing details.
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

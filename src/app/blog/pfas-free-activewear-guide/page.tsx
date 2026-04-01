import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "The Complete Guide to PFAS-Free Activewear in 2026 | Why It Matters | Arya",
  description:
    "PFAS forever chemicals are in most activewear. Learn what PFAS are, why they matter for your health, and how to find activewear that is truly free of toxic coatings.",
  openGraph: {
    title: "The Complete Guide to PFAS-Free Activewear in 2026 | Arya",
    description: "PFAS forever chemicals are in most activewear. Learn what they are, why they matter, and how to find truly non-toxic workout clothes.",
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
          headline: "The Complete Guide to PFAS-Free Activewear in 2026",
          description: "PFAS forever chemicals are in most activewear. Learn what PFAS are, why they matter for your health, and how to find activewear that is truly free of toxic coatings.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
          mainEntityOfPage: "https://www.arya.clothing/blog/pfas-free-activewear-guide",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="SKIN CONSCIOUS"
          title="The complete guide to PFAS-free activewear in 2026"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">April 2026</p>

        <p>You spend an hour in them at the gym. You wear them to brunch, on the plane, through the school run. Activewear sits tight against your skin for hours at a time, often while your pores are wide open from heat and exertion. So what is actually in the fabric?</p>

        <p>For most major activewear brands, the answer includes PFAS: per- and polyfluoroalkyl substances, a class of synthetic chemicals nicknamed &ldquo;forever chemicals&rdquo; because they do not break down in the environment or in your body.</p>

        <h2>What are PFAS and why are they in your leggings?</h2>
        <p>PFAS are a family of over 12,000 man-made chemicals used to make products resistant to water, oil, stains, and heat. In activewear, they show up as moisture-wicking coatings, stain-resistant finishes, and water-repellent treatments. The marketing sounds great. The chemistry is less reassuring.</p>

        <p>Independent testing has found fluorine indicators of PFAS in sportswear from brands across the price spectrum. The compounds are applied during manufacturing as a finish or coating, and they sit directly against your skin during the hours you wear the garment.</p>

        <h2>Why this matters more for activewear than other clothing</h2>
        <p>Three factors make activewear a uniquely high-exposure category for chemical absorption. First, compression garments press tightly against the skin, maximizing surface contact. Second, exercise raises body temperature and opens pores, increasing the rate at which compounds can be absorbed. Third, sweat creates a moist environment that can accelerate the transfer of surface chemicals from fabric to skin.</p>

        <p>This is not theoretical. Research has linked PFAS exposure to disrupted hormone function, thyroid disease, immune suppression, and increased cancer risk. The European Chemicals Agency has proposed restricting all PFAS in consumer products, and several US states have already passed legislation banning PFAS in apparel.</p>

        <h2>How to identify truly PFAS-free activewear</h2>
        <p>Marketing language can be misleading. &ldquo;Clean,&rdquo; &ldquo;eco-friendly,&rdquo; and &ldquo;sustainable&rdquo; do not necessarily mean PFAS-free. Here is what to look for.</p>

        <p>Check for explicit PFAS-free claims backed by third-party testing. Certifications like OEKO-TEX Standard 100 and GOTS (Global Organic Textile Standard) test for harmful substances including PFAS. Ask whether the brand tests finished garments, not just raw materials, since PFAS are often applied as a finish after the fabric is woven.</p>

        <p>Be skeptical of &ldquo;moisture-wicking&rdquo; and &ldquo;stain-resistant&rdquo; claims unless the brand explains how those properties are achieved without chemical coatings. Natural fiber blends and mechanical knit structures can achieve moisture management without any chemical treatment.</p>

        <h2>The Arya approach to skin-conscious fabric</h2>
        <p>At Arya, every material decision starts with a simple question: would we wear this against our own skin? The answer has to be yes before any fabric enters our supply chain.</p>

        <p>Our <Link href="/arya-standard">Arya Standard</Link> means no PFAS coatings, no toxic dyes, and no virgin synthetics against your skin. Our proprietary <Link href="/blog/what-is-nobleflex">NobleFlex fabric</Link> achieves four-way stretch, compression, and moisture management through fiber engineering and mechanical knit structure rather than chemical treatments.</p>

        <p>This is not a marketing position. It is a material science decision that costs more and takes longer. We believe it is the only responsible way to make activewear that touches your body for hours at a time.</p>

        <h2>What to do right now</h2>
        <p>Start with what touches your skin most: leggings, sports bras, and compression wear. Replace these first as they wear out. Look for explicit PFAS-free claims with third-party verification. Ask brands directly if they test finished garments for PFAS.</p>

        <p>Your activewear should work as hard as you do without making you question what is pressing against your skin while you do it.</p>

        <p className="article-links">
          Read more about our <Link href="/skin-conscious">skin-conscious philosophy</Link>, explore <Link href="/arya-standard">The Arya Standard</Link>, and see our <Link href="/collection">launch collection</Link>.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for founder pricing and early access to PFAS-free activewear engineered for your body.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

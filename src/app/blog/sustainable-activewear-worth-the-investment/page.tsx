import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Is Sustainable Activewear Worth the Investment? The Real Cost of Cheap Leggings | Arya",
  description:
    "Sustainable activewear costs more upfront. Here is why the true cost of conventional activewear — to your skin, your wardrobe, and the planet — makes the investment worth it.",
  openGraph: {
    title: "Is Sustainable Activewear Worth the Investment? | Arya",
    description: "The real cost of cheap leggings goes beyond price. Here is why sustainable activewear is worth the investment for your skin, your wardrobe, and the planet.",
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
          headline: "Is Sustainable Activewear Worth the Investment? The Real Cost of Cheap Leggings",
          description: "The real cost of cheap leggings goes beyond price. Here is why sustainable activewear is worth the investment.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
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

        <p>A pair of leggings from a fast-fashion brand costs $25. A pair from a sustainable, PFAS-free brand costs $90 to $130. The gap feels steep. But the comparison is incomplete because it only accounts for one kind of cost.</p>

        <h2>The hidden cost of conventional activewear</h2>
        <p>Most activewear on the market is made from virgin polyester derived from petroleum, treated with PFAS coatings for moisture wicking and stain resistance, and dyed with processes that use significant amounts of water and chemical compounds. The $25 price tag reflects the cost of manufacturing. It does not reflect the cost of what that garment does after you buy it.</p>

        <p>Conventional synthetic activewear sheds microplastics with every wash. A single polyester garment can release up to 700,000 microplastic fibers per wash cycle. Those fibers enter waterways, accumulate in soil, and have been found in human blood. The PFAS coatings on the fabric do not break down in the environment. They persist for decades, earning the name &ldquo;forever chemicals.&rdquo;</p>

        <p>Then there is the durability problem. Cheap activewear pills, fades, and loses compression within months. The $25 legging you replace every four months costs $75 a year. The $120 legging that lasts two years costs $60 a year, and it does not shed microplastics or press PFAS against your skin while it does it.</p>

        <h2>What makes sustainable activewear more expensive</h2>
        <p>The price difference is not a brand premium. It is a materials and process premium.</p>

        <p>PFAS-free fabric requires alternative approaches to moisture management. Rather than applying a chemical coating, brands like Arya engineer the knit structure and fiber blend to achieve moisture performance mechanically. This takes more R&D and more specialized manufacturing.</p>

        <p>Skin-conscious dye processes that avoid harmful compounds cost more per meter than conventional dye baths. Sourcing recycled or responsibly grown fibers instead of virgin polyester requires longer supply chains with more quality control checkpoints.</p>

        <p>And then there is fit. Brands that develop proprietary patterns for athletic bodies rather than grading a single standard pattern invest significantly more in development per SKU. Each additional fit profile means more wear testing, more iterations, and more manufacturing complexity.</p>

        <h2>The $176 billion shift</h2>
        <p>The sustainable athleisure market is projected to reach $176 billion by 2030, effectively doubling in six years. This is not a niche trend. It is a structural shift driven by consumers who understand the full cost of what they wear.</p>

        <p>Regulatory pressure is accelerating the timeline. The EU has proposed a comprehensive PFAS restriction that would affect apparel. Multiple US states have passed legislation banning PFAS in clothing. Brands that have not invested in PFAS-free alternatives will face increasing compliance costs, and those costs will eventually be passed on to consumers anyway.</p>

        <h2>How to evaluate the investment</h2>
        <p>When comparing activewear, consider the full picture. How long will the garment maintain its compression and shape? Is the fabric PFAS-free, and is that claim backed by third-party testing? Does the brand disclose its material sourcing and manufacturing processes? Does the fit account for your actual body proportions, or is it a standard pattern scaled up?</p>

        <p>A garment that costs more upfront but lasts longer, avoids pressing chemicals against your skin, and does not shed microplastics into the water supply is not expensive. It is accurately priced.</p>

        <h2>The Arya position</h2>
        <p>At Arya, our pricing reflects the true cost of doing things right. <Link href="/arya-standard">The Arya Standard</Link> means PFAS-free materials, <Link href="/skin-conscious">skin-conscious</Link> dye processes, engineered fit for <Link href="/fit-guide">athletic bodies</Link>, and a commitment to <Link href="/sustainability">sustainable practices</Link> across our supply chain.</p>

        <p>We do not believe sustainable activewear should require sacrificing luxury, performance, or fit. We believe the industry has gotten away with a false tradeoff for too long, and we built Arya to prove it.</p>

        <p className="article-links">
          Explore our <Link href="/collection">launch collection</Link>, read about our <Link href="/blog/what-is-nobleflex">NobleFlex fabric</Link>, and visit <Link href="/arya-standard">The Arya Standard</Link>.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for founder pricing on sustainable activewear that does not compromise on fit, performance, or your health.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

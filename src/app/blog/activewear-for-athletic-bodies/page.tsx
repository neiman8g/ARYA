import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Activewear for Athletic Bodies: Why Standard Sizing Does Not Work | Arya",
  description:
    "If you have muscular thighs, broad shoulders, or a strong chest, standard activewear was not built for you. Here is what engineered fit looks like for the body that actually moves.",
  openGraph: {
    title: "Activewear for Athletic Bodies: Why Standard Sizing Does Not Work | Arya",
    description: "Standard activewear sizing was built for one body type. Here is what real fit engineering looks like for muscular thighs, broad shoulders, and bodies that move.",
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
          headline: "Activewear for Athletic Bodies: Why Standard Sizing Does Not Work",
          description: "If you have muscular thighs, broad shoulders, or a strong chest, standard activewear was not built for you. Here is what engineered fit looks like.",
          author: { "@type": "Organization", name: "Arya" },
          publisher: { "@type": "Organization", name: "Arya", logo: { "@type": "ImageObject", url: "https://www.arya.clothing/arya-logo.png" } },
          datePublished: "2026-04-01",
          mainEntityOfPage: "https://www.arya.clothing/blog/activewear-for-athletic-bodies",
        })}
      </Script>
      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="FIT ENGINEERING"
          title="Activewear for athletic bodies: why standard sizing does not work"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">April 2026</p>

        <p>You squat 225. You surf three mornings a week. You have been an athlete your entire life. And yet every time you walk into a fitting room, the legging that fits your waist gaps at your back, the tee that fits your shoulders billows through the torso, and the short that should give you room cuts into your quad at the first lunge.</p>

        <p>The problem is not your body. The problem is how activewear is designed.</p>

        <h2>How the industry builds patterns</h2>
        <p>The vast majority of activewear brands start with a single base pattern and grade it up and down across sizes. This means they take one set of proportional assumptions and scale them linearly. If the base pattern assumes a certain ratio between waist and thigh circumference, every size up maintains that same ratio.</p>

        <p>The issue is that athletic bodies do not scale linearly. Developed quadriceps add circumference at the thigh without proportional increase at the waist. Broad shoulders widen the yoke without adding bulk through the torso. A strong chest requires room that has nothing to do with the midsection.</p>

        <p>This is why a size up solves one problem and creates three others. The waistband stops digging but now it gaps at the back. The shoulders fit but the torso looks like a tent. The thigh finally has room but the knee pools with excess fabric.</p>

        <h2>What athletes actually need from fit</h2>
        <p>Athletic fit is not a marketing label you put on a standard pattern. It requires rethinking the proportional relationships between body measurements from the ground up.</p>

        <p>For women with muscular legs, that means extended thigh circumference without excess at the waist. A high-rise waistband that holds during deep squats and dynamic movement without rolling or digging. An inseam length that accounts for the fact that muscular legs change the way fabric drapes.</p>

        <p>For men with broad upper bodies, it means a wider yoke that sits at the true shoulder point rather than riding up toward the neck. A tapered torso that provides structure without restriction. Room through the chest that does not create excess fabric everywhere else.</p>

        <h2>Compression versus restriction</h2>
        <p>There is a critical difference between fabric that supports your muscles and fabric that restricts your movement. Compression should feel like the garment is working with you, holding muscle groups together through dynamic motion without limiting your range. Restriction feels like the garment is fighting you.</p>

        <p>The difference comes down to fabric engineering. A four-way stretch fabric with the right compression ratio supports without restricting. A two-way stretch fabric or an over-compressed panel will restrict at the point of greatest need, which is usually the mid-thigh for squats and the upper back for overhead movements.</p>

        <h2>Why Arya patterns start from scratch</h2>
        <p>Every Arya pattern begins with the athletic body as the design brief. We do not start with a standard pattern and modify it. We start with movement data, body proportion research, and the understanding that someone who trains consistently has different proportional needs than the industry standard.</p>

        <p>Our <Link href="/fit-guide">fit philosophy</Link> means extended thigh room in every legging, true shoulder placement in every tee, and waistbands engineered to hold through full range of motion. Women&apos;s and men&apos;s patterns are developed separately, each engineered for the specific proportional needs of athletic bodies.</p>

        <p>Combined with our <Link href="/blog/what-is-nobleflex">NobleFlex fabric</Link> and <Link href="/skin-conscious">skin-conscious materials</Link>, the result is activewear that finally fits the body that actually moves.</p>

        <h2>How to tell if activewear actually fits an athletic body</h2>
        <p>Try a deep squat. If the waistband rolls, the fit is wrong. Reach overhead. If the hem rides up past your hip bones, the torso length is wrong. Lunge forward. If the fabric bunches behind the knee or pulls at the quad, the thigh proportions are wrong.</p>

        <p>Your body was never the problem. The clothes were.</p>

        <p className="article-links">
          Start with the <Link href="/products/noble-legging">Noble Legging</Link>, read our <Link href="/fit-guide">fit philosophy</Link>, and check the <Link href="/faq">FAQ</Link> for sizing details.
        </p>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for founder pricing and activewear engineered for your body, not around it.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

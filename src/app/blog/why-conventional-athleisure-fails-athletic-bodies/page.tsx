import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogPostHero } from "@/components/BlogPostHero";
import { getJournalPostBySlug } from "@/lib/journal-posts";

export const metadata = {
  title: "Why Conventional Athleisure Fails Athletic Bodies | Strong Thighs, Broad Shoulders | Arya",
  description:
    "Standard athleisure sizing was built for one silhouette. If you have muscular thighs, broad shoulders, or a chest that moves, the clothes were never designed for you. Here is why.",
};

export default function WhyAthleticBodiesPostPage() {
  const journal = getJournalPostBySlug("why-conventional-athleisure-fails-athletic-bodies");
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main article-main sp-main--hero-first">
        <BlogPostHero
          eyebrow="FIT PHILOSOPHY"
          title="Why conventional athleisure fails athletic bodies"
          imageSrc={journal?.image}
          imageAlt={journal?.imageAlt}
        />
        <p className="article-date">March 2026</p>
        <p>If you have spent years buying premium athleisure only to find that the waistband gaps at your back, the legging turns into skinny jeans at the thigh, or the tee fits your shoulders but billows through the torso, you are not the problem. The clothes are.</p>

        <h2>The standard body assumption</h2>
        <p>The athleisure industry built its sizing around a single silhouette. Lean, narrow, and statistically unrepresentative of most active people. The result is a market where premium brands still charge top tier for garments that only truly fit a narrow segment of their customers.</p>
        <p>This is not an accident. It is an efficiency decision. Patterning for one body type is cheaper than patterning for the full range of human athletic shapes. The brands that dominate the market have optimized for that efficiency for decades.</p>

        <h2>What the athletic body actually needs</h2>
        <p>The athletic body has different proportions than the fashion industry assumes. Developed quadriceps require more circumference at the thigh without excess at the waist. Broad shoulders require a wider yoke without extra fabric through the torso. A high chest requires room without losing the shoulder line.</p>
        <p>These are not unusual requirements. They are the proportions of anyone who trains consistently. Yet the premium athleisure market has largely ignored them.</p>

        <h2>The Arya approach</h2>
        <p>Arya was founded by Nieman Gougerchian, a former state wrestler and football player who spent years not fitting into premium athleisure. Every Arya pattern starts from scratch with the athletic body as the design brief. Extended thigh room. True shoulder placement. Waistbands engineered to hold.</p>
        <p>This is not a niche product for extreme athletes. It is premium athleisure finally designed for people who actually move.</p>

        <p className="article-links">
          Start with the <Link href="/products/noble-legging">Noble Legging</Link>, read our <Link href="/fit-guide">fit philosophy</Link>, and visit the <Link href="/faq">FAQ</Link>.
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

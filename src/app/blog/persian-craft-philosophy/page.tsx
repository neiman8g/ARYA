import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Persian Craft Philosophy and What It Means for How We Make Clothes | Arya Journal",
  description:
    "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Here is how that belief shapes every Arya garment.",
};

export default function PersianCraftPostPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main article-main">
        <span className="sp-label">HERITAGE</span>
        <p className="article-date">March 2026</p>
        <h1>Persian craft philosophy and what it means for how we make clothes</h1>
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
          <p>Join the waitlist for early access, founder updates, and pre-order pricing.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

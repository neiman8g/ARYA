import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sustainability | Arya | Skin Conscious. Sustainably Minded.",
  description: "Designed in California. Made in Spain.",
};

export default function SustainabilityPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main sustainability-main sp-main--hero-first">
        <header className="sp-page-hero" aria-labelledby="sustainability-hero-title">
          <div className="sp-page-hero-inner">
            <span className="sp-label">SUSTAINABILITY</span>
            <h1 id="sustainability-hero-title">Built with intention. For people and planet.</h1>
          </div>
        </header>

        <section className="sp-copy-section">
          <h2>Why sustainability matters to Arya</h2>
          <p>Designed in California. Made in Spain. Fabric decisions start with the person wearing the garment.</p>
        </section>

        <section className="sp-copy-section">
          <h2>Our fabric philosophy</h2>
          <p>The collection uses <Link href="/arya-standard">NobleFlex</Link>, <Link href="/arya-standard">NobleSoft</Link>, and <Link href="/arya-standard">NobleDry</Link>.</p>
        </section>

        <section className="sp-copy-section">
          <h2>Our giving back commitment</h2>
          <p>A portion of every Arya purchase goes toward building schools for children in underserved communities, starting with Iran and growing wherever the need exists.</p>
        </section>

        <section className="sp-copy-section">
          <h2>Manufacturing</h2>
          <p>As manufacturing continues, Arya will publish verified data on its fabrics, including third-party certifications. Claims go up when they can be checked.</p>
        </section>

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

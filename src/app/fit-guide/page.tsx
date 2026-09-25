import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Fit Guide | Arya",
  description: "Patterns start from scratch. Extended thigh room. Women's XS to 3XL. Men's S to 3XL.",
};

export default function FitGuidePage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main fit-guide-main sp-main--hero-first">
        <header className="sp-page-hero" aria-labelledby="fit-guide-hero-title">
          <div className="sp-page-hero-inner">
            <span className="sp-label">FIT GUIDE</span>
            <h1 id="fit-guide-hero-title">Every pattern starts from scratch.</h1>
          </div>
        </header>

        <section className="sp-copy-section">
          <h2>Sizing</h2>
          <p>Standard sizing was built around one silhouette. Arya patterns start from scratch. Women's and men's cuts are separate.</p>
        </section>

        <section className="sp-copy-section">
          <h2>The Arya fit philosophy</h2>
          <p>Women&apos;s and men&apos;s patterns are cut separately.</p>
          <div className="fit-guide-cards">
            <article className="fit-guide-card">
              <h3>Women&apos;s Engineering</h3>
              <ul>
                <li>Extended thigh and hip room. No pulling at any depth.</li>
                <li>High-rise waistband architecture that holds without digging or rolling.</li>
                <li>Shoulder and chest room that moves with you.</li>
                <li>Inseam length true to movement not a standard measurement.</li>
                <li>Four-way stretch in every direction.</li>
                <li>XS to 3XL with consistent proportional grading.</li>
              </ul>
            </article>
            <article className="fit-guide-card">
              <h3>Men&apos;s Engineering</h3>
              <ul>
                <li>Extended thigh and calf circumference. No restriction through full range of motion.</li>
                <li>Wider shoulder yoke at the true shoulder point.</li>
                <li>Chest room that accommodates movement without excess fabric.</li>
                <li>Waistband that holds through every activity.</li>
                <li>Four-way stretch in every direction.</li>
                <li>S to 3XL with consistent proportional grading.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="sp-copy-section">
          <h2>How to find your Arya size</h2>
          <p>Use these guidelines when choosing your size.</p>
          <div className="fit-guide-table">
            <div>If you need more room in the thigh</div><div>Size up one in bottoms</div>
            <div>If you need more room in tops</div><div>Size up one in tops</div>
            <div>If you are between sizes</div><div>Size up for a relaxed fit, size down for a compression fit</div>
            <div>If you are unsure</div><div>Join the waitlist and we will help you personally</div>
          </div>
        </section>

        <section className="sp-copy-section">
          <h2>The Noble Legging fit</h2>
          <p>The Noble Legging is our most engineered piece. The thigh panel is cut with 15% more room than industry standard. The waistband is a four-layer construction that holds its position through squats, lunges, and runs without rolling or digging. The inseam is measured from real movement data not a dress form.</p>
        </section>

        <section className="fit-guide-links">
          <Link href="/products/noble-legging" className="fit-guide-link-card">Shop the Noble Legging</Link>
          <Link href="/arya-standard" className="fit-guide-link-card">Explore our fabrics</Link>
          <Link href="/faq" className="fit-guide-link-card">Read the FAQ</Link>
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

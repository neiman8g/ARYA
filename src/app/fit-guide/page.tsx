import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Fit Guide | Arya | Engineered for the Body That Moves",
  description:
    "Arya patterns start from scratch for the athletic body. Extended thigh room, shoulder room, and waistbands that hold. Discover how Arya fits differently.",
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
            <h1 id="fit-guide-hero-title">Every pattern starts with the body that moves.</h1>
          </div>
        </header>

        <section className="sp-copy-section">
          <h2>Why standard sizing fails the athletic body</h2>
          <p>Standard sizing in the athleisure industry was built around one silhouette. Lean, narrow, and unchallenging. If you have strong quads, broad shoulders, or a chest that moves, you know the problem. The waistband gaps. The fabric pulls at the thigh. The shirt fits the shoulders but billows through the torso. The industry called this a sizing issue. It is not. It is a design failure.</p>
          <p>Arya was built to correct that failure. Every Arya pattern starts from scratch with the athletic body as the design brief.</p>
        </section>

        <section className="sp-copy-section">
          <h2>The Arya fit philosophy</h2>
          <p>We engineer separately for women and men because the athletic female body and the athletic male body have different requirements. Both deserve the same uncompromising standard of fit.</p>
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
          <p>Our fit is designed to run true to size for the athletic body. Use these guidelines when choosing your size.</p>
          <div className="fit-guide-table">
            <div>If you have muscular thighs</div><div>Size up one in bottoms</div>
            <div>If you have broad shoulders</div><div>Size up one in tops</div>
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
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for early access and founder updates.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

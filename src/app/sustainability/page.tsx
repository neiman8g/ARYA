import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";

export const metadata = {
  title: "Sustainability | Arya | Skin Conscious. Sustainably Minded.",
  description:
    "Arya is built on the belief that what touches your skin matters. Skin certified fabrics, no PFAS, no harmful dyes. Premium sustainable athleisure engineered with intention.",
};

const REFUSALS = [
  {
    name: "Virgin polyester",
    reason: "A petroleum based plastic that traps heat, irritates skin, and sheds microplastics in every wash.",
  },
  {
    name: "PFAS coatings",
    reason: "Forever chemicals that never break down and have no place in fabric that touches your skin all day.",
  },
  {
    name: "Harmful dyes",
    reason: "Conventional dye systems can include toxic compounds that remain against your skin and in waterways.",
  },
  {
    name: "Formaldehyde treatments",
    reason: "Wrinkle resistant treatments using formaldehyde do not meet Arya standards for human health.",
  },
  {
    name: "Virgin petroleum nylon",
    reason: "Conventional virgin nylon production is chemical intensive and misaligned with long term environmental care.",
  },
  {
    name: "Chlorine bleach",
    reason: "Chlorine bleaching can create harmful byproducts and weakens the integrity of better long life fabrics.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main sustainability-main">
        <span className="sp-label">SUSTAINABILITY</span>
        <h1>Built with intention. For people and planet.</h1>

        <section className="sp-copy-section">
          <h2>Why sustainability matters to Arya</h2>
          <p>Arya was not built to be a sustainable brand. It was built to be the best premium athleisure brand in the world. Sustainability is not our marketing headline. It is our design requirement. Every fabric decision starts with one question: is this the best option for the person wearing it and the world they live in?</p>
          <p>The answer to that question consistently leads us away from conventional synthetic materials and toward better alternatives. That is not a sacrifice. It is a higher standard.</p>
        </section>

        <section className="sp-copy-section">
          <h2>What we will never use</h2>
          <div className="sustainability-grid">
            {REFUSALS.map((item) => (
              <article key={item.name} className="sustainability-card">
                <h3>{item.name}</h3>
                <p>{item.reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sp-copy-section">
          <h2>Our fabric philosophy</h2>
          <p>Every Arya fabric is chosen because it is the best option available for the body wearing it. We do not compromise performance for sustainability or sustainability for performance. Our <Link href="/arya-standard">NobleFlex</Link>, <Link href="/arya-standard">NobleSoft</Link>, and <Link href="/arya-standard">NobleDry</Link> fabrics are engineered to a standard that respects your skin, your health, and the environment.</p>
        </section>

        <section className="sp-copy-section">
          <h2>Our giving back commitment</h2>
          <p>A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities. We start with Iran, the ancient land at the root of this brand, and grow wherever the need exists. Because building something real means giving something back.</p>
        </section>

        <section className="sp-copy-section">
          <h2>Coming soon</h2>
          <p>As we move through manufacturing we will publish verified data on our fabrics including third party certifications, recycled content percentages, water usage comparisons, and end of life guidance. We will never publish claims we cannot verify. Everything here will be real.</p>
        </section>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for early access, founder updates, and pre-order pricing.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>

      <footer className="sp-foot" aria-label="Footer navigation">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founders</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}

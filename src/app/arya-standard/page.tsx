import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import "./arya-standard.css";

export const metadata = {
  title: "The Arya Standard",
  description: "NobleFlex, NobleSoft, and NobleDry. Designed in California. Made in Spain.",
  keywords: "Arya Standard, NobleFlex, NobleSoft, NobleDry",
  openGraph: {
    title: "The Arya Standard",
    description: "NobleFlex, NobleSoft, and NobleDry. Designed in California. Made in Spain.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arya Standard",
    description: "NobleFlex, NobleSoft, and NobleDry. Designed in California. Made in Spain.",
    images: ["/arya-hero.jpg"],
  },
};

const BLENDS = [
  {
    name: "NobleFlex",
    feel: "Four-way stretch.",
    description:
      "Used in the Noble Legging and Noble Sports Bra. Four-way stretch, muscle compression, and UV protection. Shape retention after washing.",
  },
  {
    name: "NobleSoft",
    feel: "Silk-like from the first wear.",
    description:
      "Used in the Noble Tee. Odor resistant. Thermoregulating.",
  },
  {
    name: "NobleDry",
    feel: "Quick-dry. Four-way stretch.",
    description: "Used in the Noble Short and Noble Pant.",
  },
];

const STATS = [
  {
    num: "1 in 3",
    label:
      "Children in underserved communities lack access to safe athletic facilities",
  },
  {
    num: "Every purchase",
    label: "A portion of every Arya sale goes directly to this mission",
  },
  {
    num: "Starting now",
    label: "Building schools and athletic centers beginning with Iran",
  },
];

export default function AryaStandardPage() {
  return (
    <div className="section-page std-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <SectionNav activeLink="arya-standard" />

      <main className="sp-main">
        {/* Section 1: Hero */}
        <section className="std-hero">
          <span className="std-eyebrow">THE ARYA STANDARD</span>
          <h1>The Arya Standard.</h1>
          <p className="std-subhead">Designed in California. Made in Spain.</p>
        </section>

        {/* Section 2: The Noble Blends */}
        <section className="std-section">
          <h2 className="std-section-heading">Our proprietary blends.</h2>
          <div className="std-blends">
            {BLENDS.map((b) => (
              <article key={b.name} className="std-blend-card">
                <h3 className="std-blend-name">{b.name}</h3>
                <p className="std-blend-feel">{b.feel}</p>
                <p className="std-blend-desc">{b.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 5: Giving back */}
        <section className="std-section">
          <h2 className="std-section-heading">Giving back.</h2>
          <div className="std-giving-body">
            <p>
              Arya was built on the belief that sport builds character,
              confidence, and community. Our founder Nima knows this firsthand.
              At his lowest points, athletics gave him his mental strength and
              his sense of self. Lucy, who is studying to become a family
              therapist, sees every day how confidence built through movement
              changes lives.
            </p>
            <p>We want every child to have that opportunity.</p>
            <p>
              A portion of every Arya purchase goes toward building schools for
              children in underserved communities, starting with Iran and growing
              wherever the need exists.
            </p>
          </div>
          <div className="std-stats">
            {STATS.map((s) => (
              <div key={s.num} className="std-stat">
                <div className="std-stat-num">{s.num}</div>
                <p className="std-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Bottom CTA */}
        <section className="std-cta">
          <h2>The collection.</h2>
          <div className="std-cta-btns">
            <Link href="/collection" className="std-cta-btn-primary">
              View Collection
            </Link>
            <Link href="/#waitlist" className="std-cta-btn-secondary">
              Join Waitlist
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

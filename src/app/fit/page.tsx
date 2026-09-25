import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Fit Philosophy | Arya | Engineered for the Body That Moves",
  description: "Arya patterns start from scratch. Extended thigh room and waistbands that hold. Cut separately for women and men. XS to 3XL.",
  keywords: "Arya fit, leggings, sizing, XS to 3XL",
  openGraph: {
    title: "Fit Philosophy | Arya | Engineered for the Body That Moves",
    description: "Arya patterns start from scratch. Extended thigh room and waistbands that hold. Cut separately for women and men. XS to 3XL.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit Philosophy | Arya | Engineered for the Body That Moves",
    description: "Arya patterns start from scratch. Extended thigh room and waistbands that hold. Cut separately for women and men. XS to 3XL.",
    images: ["/arya-hero.jpg"],
  },
};

export default function FitPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav activeLink="fit" />

      <main className="sp-main">
        <div className="fit-layout">
          <div className="fit-content">
            <span className="sp-label">Fit Philosophy</span>
            <h1>Every pattern starts from scratch.</h1>
            <p>Standard sizing was built for a standard body. Arya&apos;s patterns start from scratch.</p>
            <p>Our Women&apos;s and Men&apos;s cuts share the same philosophy: engineered separately for each form, so everyone gets the same standard of fit.</p>
            <div className="fit-specs">
              <h3>Women&apos;s</h3>
              {["Thighs — Extended room. No pulling at any depth.", "Hips — Built for the hips that move.", "Waistband — High-rise hold without digging.", "Inseam — True to movement."].map((s, i) => (
                <div key={i} className="fspec"><span>{s.split(" — ")[0]}</span>{s.split(" — ")[1]}</div>
              ))}
            </div>
            <div className="fit-specs">
              <h3>Men&apos;s</h3>
              {["Thighs — Extended circumference. No restriction.", "Shoulders — Wider yoke, true shoulder point.", "Waist — Tapered without restriction.", "Chest — Room to breathe."].map((s, i) => (
                <div key={i} className="fspec"><span>{s.split(" — ")[0]}</span>{s.split(" — ")[1]}</div>
              ))}
            </div>
            <div className="fit-minis">
              <div><strong>4-way</strong><span>Stretch in all directions</span></div>
              <div><strong>XS–3XL</strong><span>Women&apos;s inclusive sizing</span></div>
              <div><strong>S–3XL</strong><span>Men&apos;s inclusive sizing</span></div>
            </div>
            <Link href="/collection" className="sp-btn">View Collection</Link>
          </div>
          <div className="fit-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arya-fit.jpg" alt="Arya fit" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

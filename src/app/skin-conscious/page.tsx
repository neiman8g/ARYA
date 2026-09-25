import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Skin Conscious | Arya | Materials That Respect Your Skin",
  description: "NobleFlex, NobleSoft, and NobleDry. Designed in California. Made in Spain.",
};

export default function SkinConsciousPage() {
  return (
    <div className="section-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <SectionNav />

      <main className="sp-main skin-conscious-main">
        <span className="sp-label">SKIN CONSCIOUS</span>
        <h1>Skin conscious.</h1>

        <section className="sp-copy-section">
          <h2>NobleFlex, NobleSoft, NobleDry</h2>
          <p>
            <Link href="/blog/what-is-nobleflex">NobleFlex</Link> is the performance fabric: four-way
            stretch, compression, and UV support.{" "}
            <Link href="/products/noble-tee">NobleSoft</Link> is the tee blend: silk-like hand, odor
            resistance, thermoregulating.{" "}
            <Link href="/products/noble-short">NobleDry</Link> is the short and pant fabric:
            quick-dry, four-way stretch.
          </p>
          <p>
            Details live on <Link href="/arya-standard">The Arya Standard</Link> and on each product
            page.
          </p>
        </section>

        <section className="sp-waitlist-cta">
          <h2>Join the waitlist.</h2>
          <p>Join the waitlist for early access.</p>
          <Link href="/#waitlist" className="sp-btn">
            Join Waitlist
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

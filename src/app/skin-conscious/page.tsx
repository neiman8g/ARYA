import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Skin Conscious | Arya | Materials That Respect Your Skin",
  description:
    "Most athleisure is made from petroleum. Arya is not. Learn what we refuse, what NobleFlex, NobleSoft, and NobleDry are made from, and how Persian craft philosophy shapes every material decision.",
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
        <h1>Most athleisure is made from petroleum. We are not.</h1>

        <section className="sp-copy-section">
          <h2>Fit for the athletic body — materials that don&apos;t poison you doing it</h2>
          <p>
            Arya sits at a white space no other premium athleisure brand owns:{" "}
            <strong>engineered fit for real bodies</strong> plus{" "}
            <strong>skin-conscious materials</strong> free from PFAS, toxic dyes, and virgin synthetics
            pressed against your skin all day. Fear of what your clothes are made of converts faster
            than preference alone — and we built this brand for people who refuse to compromise.
          </p>
        </section>

        <section className="sp-copy-section">
          <h2>What we refuse — and why</h2>
          <p>
            Forever chemicals (PFAS) have no place in fabric that touches your skin for hours.
            Conventional dye systems can carry compounds that remain against your skin and in
            waterways. Most performance athleisure is plastic: petroleum-based fibers that trap
            heat, irritate skin, and shed microplastics every wash. We refuse all of it by design.
          </p>
          <p>
            If we would not wear it against our own skin, we will not make it. That is{" "}
            <Link href="/arya-standard">The Arya Standard</Link>.
          </p>
        </section>

        <section className="sp-copy-section">
          <h2>NobleFlex, NobleSoft, NobleDry</h2>
          <p>
            <Link href="/blog/what-is-nobleflex">NobleFlex</Link> is our proprietary performance
            fabric — four-way stretch, compression, and UV support without the usual synthetic
            baggage.{" "}
            <Link href="/products/noble-tee">NobleSoft</Link> is our natural-forward blend: silk-like
            hand, odor resistance, thermoregulating — without synthetics against your skin.{" "}
            <Link href="/products/noble-short">NobleDry</Link> delivers durable, quick-dry performance
            for shorts and pants with the same refusal list.
          </p>
          <p>
            Details on composition and certification live on{" "}
            <Link href="/arya-standard">The Arya Standard</Link> and on each product page.
          </p>
        </section>

        <section className="sp-copy-section">
          <h2>Persian craft philosophy</h2>
          <p>
            Persian craft holds that precision is a form of respect — for the wearer, the maker, and
            the work itself. That philosophy does not decorate our marketing; it governs every
            material decision. We choose fibers and finishes the way a craft tradition chooses a
            tool: with intention, and without excuse.
          </p>
        </section>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
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

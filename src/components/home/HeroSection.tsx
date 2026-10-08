import Image from "next/image";
import Link from "next/link";
import { WeavePattern } from "@/components/brand/WeavePattern";
import { AryaMark } from "@/components/AryaLogo";

export function HeroSection() {
  return (
    <section className="hero fade-section" id="main-content">
      <div className="hero-left">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-rule" />
            <span>Designed in California.</span>
          </div>
          <h1 className="sr-only">You were never the problem. The clothes were.</h1>
          <h2 className="hero-h1">
            You were never the problem.<br />The clothes were.
          </h2>
          <p className="hero-sub">Launching 2027.</p>
          <div className="hero-ctas">
            <a href="#waitlist" className="btn-dark">Get Founder Pricing</a>
            <Link href="/collection" className="btn-outline">Preview Collection</Link>
          </div>
          <p className="hero-proof">First access for the founding list.</p>
        </div>
      </div>
      <div className="hero-right">
        <WeavePattern id="hero-p" opacity={0.1} color="#8B6A3E" />
        <Image
          src="/arya-hero.jpg"
          alt="Arya"
          className="hero-placeholder"
          priority
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="hero-right-overlay" />
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-arrow" />
      </div>
    </section>
  );
}

export function Ticker() {
  const items = [
    "DESIGNED IN CALIFORNIA. MADE IN SPAIN.",
    "SKIN CONSCIOUS",
  ];
  return (
    <div className="ticker fade-section">
      <div className="ticker-track">
        {[...Array(2)].map((_, i) => (
          <span key={i} style={{ display: "inline-flex" }}>
            {items.map((t, j) => (
              <span key={j} className="ticker-item">{t}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Arya Mark centered placeholder for product images */
export function ProductPlaceholder({ name, patternId }: { name: string; patternId: string }) {
  return (
    <div className="p-placeholder">
      <div className="p-placeholder-bg" />
      <WeavePattern id={patternId} color="#8B6A3E" opacity={0.08} />
      <div className="p-placeholder-content">
        <AryaMark size={56} color="#8B6A3E" />
        <span className="p-placeholder-name">{name}</span>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Fit Philosophy — Arya",
  description: "Every pattern starts with the body that moves. Arya's fit philosophy.",
};

export default function FitPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/fit" className="active">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main">
        <div className="fit-layout">
          <div className="fit-content">
            <span className="sp-label">Fit Philosophy</span>
            <h1>Every pattern starts with<br />the body that <em>moves.</em></h1>
            <p>Standard sizing was built for a standard body. Arya&apos;s patterns start from scratch — with real movement data and the belief that a body that surfs, moves, rides, and lives fully deserves fabric that keeps up.</p>
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
              <div><strong>4×</strong> Stretch in all directions</div>
              <div><strong>Women&apos;s XS–3XL · Men&apos;s S–3XL</strong> Inclusive sizing</div>
            </div>
            <Link href="/collection" className="sp-btn">View Collection</Link>
          </div>
          <div className="fit-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arya-fit.jpg" alt="Fit and movement" />
          </div>
        </div>
      </main>

      <footer className="sp-foot">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Mission — Arya",
  description: "Built in Los Angeles. Rooted in Persia. Arya is a bridge between two worlds.",
};

export default function MissionPage() {
  return (
    <div className="section-page mission">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story">Story</Link>
          <Link href="/mission" className="active">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main mission-main">
        <span className="sp-label">Mission</span>
        <h1>Built in Los Angeles.<br /><em>Rooted in Persia.</em></h1>
        <p>Arya is a bridge between two worlds — the California coast where this founder was born, and the ancient land that gave him his culture, his values, and his name. Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit spec is held to that standard.</p>
        <p>A portion of every Arya purchase goes toward building schools and community spaces in Iran — because the land that gave this brand its soul deserves to see what its children can become.</p>
        <div className="mission-pillars">
          {[
            { n: "01", t: "Persian Craft", b: "Every garment held to the Persian artisan standard. No shortcuts. Built to outlast trends by decades." },
            { n: "02", t: "Active Community", b: "For everyone who lives fully and moves often — and deserves clothing that keeps up." },
            { n: "03", t: "Giving Back", b: "Every purchase helps build schools and community spaces in Iran." },
          ].map((p) => (
            <div key={p.n} className="pillar">
              <div className="pillar-n">{p.n}</div>
              <div className="pillar-t">{p.t}</div>
              <p>{p.b}</p>
            </div>
          ))}
        </div>
        <Link href="/collection" className="sp-btn">View Collection</Link>
      </main>

      <footer className="sp-foot mission-foot">
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

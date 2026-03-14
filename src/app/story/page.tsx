import Link from "next/link";

export const metadata = {
  title: "Our Story — Arya",
  description: "Where the Pacific Coast meets Persian craft. Arya was born between two worlds.",
};

export default function StoryPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story" className="active">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main">
        <div className="sp-hero">
          <div className="sp-hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/arya-story.jpg" alt="Arya brand story" className="sp-img" />
          </div>
          <div className="sp-hero-content">
            <span className="sp-label">Our Story</span>
            <h1>Where the Pacific Coast<br />meets <em>Persian craft.</em></h1>
            <p>Arya was born between two worlds: the salt air of Southern California and the ancient textile traditions of Persia. One shaped by movement, the other by centuries of craft.</p>
            <p>The name Arya comes from the ancient Persian word for noble and honorable, the very root of the word Iran itself. It is not just a name. It is a standard. A commitment to doing things with precision, care, and intention, the way Persian artisans have approached their craft for thousands of years.</p>
            <p>California gave this brand its energy. Persia gave it its soul. Together they form something that has never existed in athleisure before. Clothing built with the craft philosophy of the ancient world and the movement culture of the modern one.</p>
            <p>At Arya, we build garments with care. Materials chosen with intention. Fit refined through movement. Craft without shortcuts.</p>
            <div className="sp-values">
              <div>Built with intention.</div>
              <div>Made to move with you.</div>
              <div>Rooted in something real.</div>
            </div>
            <Link href="/collection" className="sp-btn">View Collection</Link>
            <Link href="/founder" className="sp-btn sp-btn-secondary">Meet the Founders</Link>
          </div>
        </div>
      </main>

      <footer className="sp-foot">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}

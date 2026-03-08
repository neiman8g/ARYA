import Link from "next/link";

export const metadata = {
  title: "The Founder — Arya",
  description: "I built what I couldn't find. Nima G., Founder & Creative Director of Arya.",
};

export default function FounderPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder" className="active">Founder</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main">
        <div className="fit-layout">
          <div className="fit-content">
            <span className="sp-label">The Founder</span>
            <h1>I built what I couldn&apos;t <em>find.</em></h1>
            <p>I&apos;m Persian-American, born and raised in Los Angeles. I&apos;ve always been drawn to movement. The ocean. The mountains. The trail. Anywhere the body is meant to work.</p>
            <p>The people around me lived actively — but the clothing available to us rarely did. Most brands were built for one kind of space, not for the full life lived around it.</p>
            <p>I grew up visiting Iran as a child. The colors of Isfahan&apos;s architecture. The warmth of the people. The care in everything they made. In that culture, quality was a form of respect for both the maker and the wearer.</p>
            <p>Arya was born where those two worlds meet. The movement and energy of California, and the deep tradition of Persian craft.</p>
            <div className="founder-sig">
              <AryaMark size={36} color="#8B6A3E" />
              <div>
                <div className="f-name">Nima G.</div>
                <div className="f-role">Founder & Creative Director</div>
              </div>
            </div>
            <Link href="/collection" className="sp-btn">View Collection</Link>
          </div>
          <div className="fit-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arya-founder.png" alt="Nima G., Founder & Creative Director of Arya" />
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

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

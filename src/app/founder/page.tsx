import Link from "next/link";

export const metadata = {
  title: "The Founders | Arya | Nima and Lucy",
  description: "Meet Nima and Lucy, founders of Arya. A Persian-American engineer and a future family therapist who built the premium sustainable athleisure brand they couldn't find anywhere else.",
  keywords: "Arya founders, Persian American brand founder, sustainable athleisure founders, Nima Arya clothing, noble by nature founders",
  openGraph: {
    title: "The Founders | Arya | Nima and Lucy",
    description: "Meet Nima and Lucy, founders of Arya. A Persian-American engineer and a future family therapist who built the premium sustainable athleisure brand they couldn't find anywhere else.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Founders | Arya | Nima and Lucy",
    description: "Meet Nima and Lucy, founders of Arya. A Persian-American engineer and a future family therapist who built the premium sustainable athleisure brand they couldn't find anywhere else.",
    images: ["/arya-hero.jpg"],
  },
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
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main">
        <div className="fit-layout">
          <div className="fit-content">
            <span className="sp-label">The Founders</span>
            <h1>We built what didn&apos;t <em>exist.</em></h1>
            <p>Arya was born between two people, two worlds, and one shared belief: that clothing should make you feel like yourself.</p>
            <p>Nima grew up bigger than the clothes that were supposed to fit him. A state wrestler and football player, he lived in his body in a way most brands never accounted for. Joggers that fit his waist turned into skinny jeans at the thigh. Shirts that fit his shoulders billowed everywhere else. He would go for a run and come back with chafing. The fabrics were not right either. Synthetic polymers that did not breathe, did not last, and did not respect the body wearing them.</p>
            <p>But it was more than fit. Sport gave him his confidence. At his lowest points, athletics gave him his mental strength and his sense of self. He knows what it means when your body and your clothes finally work together. That feeling is what Arya is built to give everyone.</p>
            <p>Lucy came to Southern California from Florida in 2022 and found a life built around movement, wellness, and intention. Her first Persian New Year with Nima&apos;s family changed something in her. She was taught about the Haft Seen, each element on the table carrying a meaning, a wish, an intention. A culture that treated everything it touched as worth doing beautifully.</p>
            <p>Studying to become a family therapist, Lucy&apos;s life work is helping people overcome anxiety and rebuild their self worth. She knows the specific discomfort of women&apos;s activewear that rides up, pulls, and makes you self-conscious mid-movement when you should feel free. That problem is personal to her. Fixing it is personal to Arya.</p>
            <p>They share a belief that people are too complex for brands that speak to only one sport, one body, one image. Clothing does not have to choose between performance and beauty. Between function and intention.</p>
            <p>And they believe building something real means giving something back. A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities because the culture that shaped this brand deserves to see what its next generation can become.</p>
            <p>Together they built Arya. A meeting point between two worlds. The California coast that inspires the lifestyle, and the ancient Persian heritage that shaped the craft.</p>
            <div className="founder-sig">
              <AryaMark size={36} color="#8B6A3E" />
              <div>
                <div className="f-name">Nima and Lucy, Founders of Arya</div>
              </div>
            </div>
            <Link href="/collection" className="sp-btn">View Collection</Link>
          </div>
          <div className="fit-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arya-founder.png" alt="Nima and Lucy, Founders of Arya" />
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

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

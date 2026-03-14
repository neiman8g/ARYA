import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";

export const metadata = {
  title: "Our Story | Arya | Where Persian Craft Meets California Soul",
  description: "Arya was born between two worlds. The salt air of Southern California and the ancient craft traditions of Persia. A brand built with intention, made to move with you, rooted in something real.",
  keywords: "Persian American athleisure brand, sustainable luxury athleisure story, California athleisure brand, Persian craft clothing, noble by nature brand story",
  openGraph: {
    title: "Our Story | Arya | Where Persian Craft Meets California Soul",
    description: "Arya was born between two worlds. The salt air of Southern California and the ancient craft traditions of Persia. A brand built with intention, made to move with you, rooted in something real.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Arya | Where Persian Craft Meets California Soul",
    description: "Arya was born between two worlds. The salt air of Southern California and the ancient craft traditions of Persia. A brand built with intention, made to move with you, rooted in something real.",
    images: ["/arya-hero.jpg"],
  },
};

export default function StoryPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav activeLink="story" />

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
            <div className="sp-btn-group">
              <Link href="/collection" className="sp-btn">View Collection</Link>
              <Link href="/founder" className="sp-btn sp-btn-secondary">Meet the Founders</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="sp-foot">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founders</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}

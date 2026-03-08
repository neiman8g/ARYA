import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Collection — Arya",
  description: "The foundation pieces. Engineered for the body that moves.",
};

export default function CollectionPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection" className="active">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main">
        <span className="sp-label">Launch Collection</span>
        <h1>The <em>foundation</em> pieces.</h1>
        <p className="coll-note">Engineered from scratch for the body that moves.</p>
        <div className="coll-grid">
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="coll-card">
              <div className="coll-visual">
                <div className="coll-placeholder">
                  <AryaMark size={48} color="#8B6A3E" />
                  <span>{p.name}</span>
                </div>
                <span className="coll-tag">Pre-Order</span>
              </div>
              <div className="coll-info">
                <span className="coll-cat">{p.gender}</span>
                <span className="coll-name">{p.name}</span>
                <span className="coll-price">{p.price}</span>
              </div>
            </Link>
          ))}
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

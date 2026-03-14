"use client";
import { useState } from "react";
import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { PRODUCTS } from "@/lib/products";

const womenProducts = PRODUCTS.filter((p) => p.gender === "Women's");
const menProducts = PRODUCTS.filter((p) => p.gender === "Men's");

export default function CollectionPage() {
  const [collectionFilter, setCollectionFilter] = useState<"all" | "women" | "men">("all");

  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav activeLink="collection" />

      <main className="sp-main">
        <span className="sp-label">Launch Collection</span>
        <h1>The <em>foundation</em> pieces.</h1>
        <p className="coll-note">Engineered from scratch for the body that moves.</p>
        <div className="coll-tabs">
          <button type="button" className={`coll-tab ${collectionFilter === "all" ? "active" : ""}`} onClick={() => setCollectionFilter("all")}>All</button>
          <button type="button" className={`coll-tab ${collectionFilter === "women" ? "active" : ""}`} onClick={() => setCollectionFilter("women")}>Women&apos;s</button>
          <button type="button" className={`coll-tab ${collectionFilter === "men" ? "active" : ""}`} onClick={() => setCollectionFilter("men")}>Men&apos;s</button>
        </div>
        <div className={`coll-section ${collectionFilter === "men" ? "hide-by-filter" : ""}`} style={collectionFilter === "men" ? { display: "none" } : undefined}>
          <h3 className="coll-section-title">Women&apos;s</h3>
          <div className="coll-grid">
            {womenProducts.map((p) => (
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
        </div>
        <div className={`coll-section ${collectionFilter === "women" ? "hide-by-filter" : ""}`} style={{ marginTop: "48px", ...(collectionFilter === "women" ? { display: "none" } : {}) }}>
          <h3 className="coll-section-title">Men&apos;s</h3>
          <div className="coll-grid">
            {menProducts.map((p) => (
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

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

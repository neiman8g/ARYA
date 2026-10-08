"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductPlaceholder } from "./HeroSection";

const CARD_DESCRIPTIONS: Record<string, string> = {
  "noble-legging": "NobleFlex. Four-way stretch and a high-rise waistband.",
  "noble-bra": "NobleFlex. Medium to high support, four-way stretch.",
  "noble-long-crop": "NobleFlex. Pairs with the Noble Sports Bra.",
  "noble-short": "NobleDry. Extended thigh room, four-way stretch.",
  "noble-tee": "NobleSoft. Silk-like feel, odor resistant.",
  "noble-pant": "NobleDry. Five-pocket trouser, four-way stretch.",
};

function withNobleflexLink(text: string) {
  const parts = text.split("NobleFlex");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <Link href="/arya-standard">NobleFlex</Link>}
          {part}
        </span>
      ))}
    </>
  );
}

type ProductCardProps = {
  p: (typeof PRODUCTS)[0];
  selectedColors: Record<string, string>;
  setColor: (productId: string, colorName: string) => void;
};

function ProductCard({ p, selectedColors, setColor }: ProductCardProps) {
  const selectedColor = selectedColors[p.id] ?? p.colors?.[0]?.name;
  return (
    <div className="p-card">
      <Link href={`/products/${p.slug}`} className="p-visual-link">
        <div className="p-visual" data-color={selectedColor}>
          <ProductPlaceholder name={p.name} patternId={`p-place-${p.id}`} />
          <div className="p-tag">2027</div>
        </div>
      </Link>
      <div className="p-info">
        <div className="p-cat">{p.gender}</div>
        <Link href={`/products/${p.slug}`} className="p-name">{p.name}</Link>
        {CARD_DESCRIPTIONS[p.id] && <p className="p-card-desc">{withNobleflexLink(CARD_DESCRIPTIONS[p.id])}</p>}
        {p.colors?.length > 0 && (
          <div className="p-color-row">
            <span className="p-opt-label">Color</span>
            <div className="p-color-swatches">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`p-color-swatch ${selectedColor === c.name ? "selected" : ""}`}
                  style={{ background: c.hex }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setColor(p.id, c.name); }}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="p-foot">
          <div className="p-coming">Launching 2027</div>
          <Link href={`/products/${p.slug}`} className="btn-p">Select size</Link>
        </div>
      </div>
    </div>
  );
}

export function CollectionSection() {
  const [collectionFilter, setCollectionFilter] = useState<"all" | "women" | "men">("all");
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const womenProducts = useMemo(() => PRODUCTS.filter((p) => p.gender === "Women's"), []);
  const menProducts = useMemo(() => PRODUCTS.filter((p) => p.gender === "Men's"), []);

  const setColor = (productId: string, colorName: string) =>
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));

  return (
    <section className="collection fade-section" id="collection">
      <div className="coll-header">
        <div>
          <div className="label">Launch Collection</div>
          <h2 className="display">The <em>foundation</em> pieces.</h2>
        </div>
        <p className="coll-note">Cut from scratch.</p>
      </div>
      <div className="coll-tabs">
        <button type="button" className={`coll-tab ${collectionFilter === "all" ? "active" : ""}`} onClick={() => setCollectionFilter("all")}>All</button>
        <button type="button" className={`coll-tab ${collectionFilter === "women" ? "active" : ""}`} onClick={() => setCollectionFilter("women")}>Women&apos;s</button>
        <button type="button" className={`coll-tab ${collectionFilter === "men" ? "active" : ""}`} onClick={() => setCollectionFilter("men")}>Men&apos;s</button>
      </div>
      <div className="coll-sections">
        <div className={`coll-section ${collectionFilter === "men" ? "hide-by-filter" : ""}`} id="women">
          <h3 className="coll-section-title">Women&apos;s</h3>
          <div className="product-grid">
            {womenProducts.map((p) => <ProductCard key={p.id} p={p} selectedColors={selectedColors} setColor={setColor} />)}
          </div>
        </div>
        <div className={`coll-section ${collectionFilter === "women" ? "hide-by-filter" : ""}`} id="men">
          <h3 className="coll-section-title">Men&apos;s</h3>
          <div className="product-grid">
            {menProducts.map((p) => <ProductCard key={p.id} p={p} selectedColors={selectedColors} setColor={setColor} />)}
          </div>
        </div>
      </div>
      <div className="coll-waitlist-strip fade-section">
        <p className="coll-waitlist-text">Launching 2027. Founder pricing for waitlist members.</p>
        <a href="#waitlist" className="coll-waitlist-btn">Get Early Access</a>
      </div>
    </section>
  );
}

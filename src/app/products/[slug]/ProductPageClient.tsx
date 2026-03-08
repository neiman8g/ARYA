"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

function ProductPlaceholder({ name }: { name: string }) {
  return (
    <div className="pp-visual">
      <div className="pp-bg" />
      <div className="pp-content">
        <AryaMark size={64} color="#8B6A3E" />
        <span className="pp-name">{name}</span>
      </div>
    </div>
  );
}

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name ?? "");
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pp-layout">
      <div className="pp-visual-wrap">
        <ProductPlaceholder name={product.name} />
        <div className="pp-tag">Pre-Order</div>
      </div>
      <div className="pp-detail">
        <div className="pp-cat">{product.gender}</div>
        <h1 className="pp-title">{product.name}</h1>
        <p className="pp-price">{product.price} <small>USD</small></p>
        <p className="pp-desc">{product.desc}</p>
        <ul className="pp-specs">
          {product.specs.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        {product.colors?.length > 0 && (
          <div className="pp-color">
            <span className="pp-opt-label">Color</span>
            <div className="pp-color-swatches">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`pp-color-swatch ${selectedColor === c.name ? "selected" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="pp-size">
          <span className="pp-opt-label">Size</span>
          <div className="pp-size-btns">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                className={`pp-size-btn ${selectedSize === sz ? "selected" : ""}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`pp-add ${added ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          {!selectedSize ? "Select Size" : added ? "Added ✓" : "Pre-Order"}
        </button>
        <p className="pp-note">Every purchase helps build schools and community spaces in Iran.</p>
      </div>
    </div>
  );
}

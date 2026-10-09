"use client";

import Link from "next/link";
import { useState } from "react";
import { COLORS, priceLabel, type Product } from "@/lib/products";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const back = product.line === "Women" ? "/women" : "/men";

  return (
    <div className="wrap stack" style={{ gap: 32 }}>
      <Link className="link" href={back}>Back to {product.line}</Link>
      <div className="pp">
        <div className="stack" style={{ gap: 16 }}>
          <div className="arch photo pp-arch">
            <ProductPlaceholder name={product.name} colorName={color} hex={COLORS[color]} alt={`${product.name} in ${color}`} />
          </div>
        </div>
        <div className="stack" style={{ gap: 24 }}>
          <p className="caps bronze">{product.line} &middot; {product.searchName}</p>
          <h1 className="h-1">{product.name}</h1>
          <p className="pp-price">{priceLabel(product)}</p>
          <p className="body">{product.description}</p>
          <div className="stack" style={{ gap: 12 }}>
            <p className="caps">Color &middot; {color}</p>
            <div className="opts">
              {product.colors.map((c) => (
                <button key={c} type="button" className="sw" style={{ background: COLORS[c] }} aria-label={c} aria-pressed={c === color} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <p className="caps">Size</p>
            <div className="opts">
              {product.sizes.map((s) => (
                <button key={s} type="button" className="sz" aria-pressed={s === size} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <a className="btn solid" href="#join">Join the list for first access</a>
          <p className="caps status">Fabric in final testing &middot; Arriving 2027</p>
          <ul className="details">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

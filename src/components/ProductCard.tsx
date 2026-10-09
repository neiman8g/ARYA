import Link from "next/link";
import { COLORS, priceLabel, type Product } from "@/lib/products";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function ProductCard({ product }: { product: Product }) {
  const color = product.colors[0];
  return (
    <Link className="card" href={`/products/${product.slug}`}>
      <div className="arch photo">
        <ProductPlaceholder name={product.name} colorName={color} hex={COLORS[color]} alt={`${product.name}, ${product.searchName.toLowerCase()} by ARYA`} />
      </div>
      <div className="row">
        <span className="name">{product.name}</span>
        <span className="price">{priceLabel(product)}</span>
      </div>
      <span className="caps soft">{product.colors.join(" · ")}</span>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="pgrid">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

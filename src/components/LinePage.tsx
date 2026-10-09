import { ProductGrid } from "./ProductCard";
import { productsFor, type Line } from "@/lib/products";

const COPY: Record<Line, { kicker: string; title: string; body: string }> = {
  Women: {
    kicker: "Women's non-toxic activewear",
    title: "Women",
    body: "Leggings, sports bras, shorts and tanks, patterned from scratch in sizes XS to 3XL. Always in stock, in the same colors every year.",
  },
  Men: {
    kicker: "Men's non-toxic activewear",
    title: "Men",
    body: "Tees, shorts and joggers cut on their own pattern, not graded from someone else's. Sizes S to 3XL.",
  },
};

export function LinePage({ line }: { line: Line }) {
  const c = COPY[line];
  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 48 }}>
        <div className="stack" style={{ gap: 16 }}>
          <h1 className="h-hero">
            <span className="kicker">{c.kicker}</span>
            {c.title}
          </h1>
          <p className="body">{c.body}</p>
        </div>
        <ProductGrid products={productsFor(line)} />
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Arya`,
    description: product.desc,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="arya-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="p-nav">
        <Link href="/" className="p-nav-logo" aria-label="Arya home">
          <AryaMark size={28} color="#8B6A3E" />
          <span className="p-nav-wordmark">ARYA</span>
        </Link>
        <div className="p-nav-links">
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist" className="p-nav-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="p-main">
        <Link href="/collection" className="p-back">← Collection</Link>
        <ProductPageClient product={product} />
      </main>

      <footer className="p-foot">
        <Link href="/" className="p-foot-logo">
          <AryaMark size={20} color="#8B6A3E" />
          <span>Arya</span>
        </Link>
        <div className="p-foot-links">
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

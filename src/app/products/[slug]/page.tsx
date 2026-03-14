import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

const PRODUCT_META: Record<string, { title: string; description: string; keywords: string }> = {
  "noble-legging": {
    title: "The Noble Legging | Arya | Sustainable Athletic Legging XS–3XL",
    description: "The Noble Legging by Arya. NobleFlex proprietary fabric with four-way stretch, muscle compression, and extended thigh room. Skin certified, sustainable, engineered for the body that moves. XS to 3XL.",
    keywords: "sustainable legging athletic fit, leggings for strong thighs, premium eco friendly leggings, NobleFlex legging, activewear for muscular legs, skin safe leggings, athletic body legging",
  },
  "noble-bra": {
    title: "The Noble Sports Bra | Arya | Sustainable Athletic Support XS–3XL",
    description: "The Noble Sports Bra by Arya. NobleFlex fabric with medium to high support, four-way stretch, and skin-conscious construction. Pairs with the Noble Legging. XS to 3XL.",
    keywords: "sustainable sports bra athletic support, eco friendly sports bra, skin conscious sports bra, NobleFlex bra, premium activewear bra, sports bra for athletic body",
  },
  "noble-long-crop": {
    title: "The Noble Long Crop | Arya | Sustainable Athletic Top XS–3XL",
    description: "The Noble Long Crop by Arya. NobleFlex fabric designed to pair with the Noble Sports Bra as a complete set. Skin-conscious, sustainable, built for movement. XS to 3XL.",
    keywords: "sustainable athletic crop top, eco friendly long sleeve crop, NobleFlex top, premium activewear set, athletic crop top skin conscious",
  },
  "noble-short": {
    title: "The Noble Short | Arya | Sustainable Athletic Short S–3XL",
    description: "The Noble Short by Arya. NobleDry fabric with extended thigh room, four-way stretch, and quick-dry construction. Engineered for the body that actually trains. S to 3XL.",
    keywords: "sustainable athletic shorts, shorts for strong thighs, extended thigh room shorts, NobleDry shorts, premium eco friendly shorts, activewear for muscular legs",
  },
  "noble-tee": {
    title: "The Noble Tee | Arya | Natural Performance Tee S–3XL",
    description: "The Noble Tee by Arya. NobleSoft natural blend with silk-like feel, natural odor resistance, and no synthetics against your skin. Thermoregulating and fully skin-conscious. S to 3XL.",
    keywords: "natural performance tee, sustainable athletic tee, no synthetic activewear, NobleSoft tee, skin safe workout shirt, natural fiber athletic top, sustainable men's activewear",
  },
  "noble-pant": {
    title: "The Noble Pant | Arya | Sustainable Performance Trouser S–3XL",
    description: "The Noble Pant by Arya. NobleDry fabric engineered between a jogger and a tailored trouser. Built for the trail, the gym, and the table. S to 3XL.",
    keywords: "sustainable performance trouser, athletic fit pants, NobleDry pant, premium eco friendly jogger, activewear trouser athletic body, sustainable men's pants",
  },
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const meta = product ? PRODUCT_META[slug] : null;
  if (!product || !meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: ["/arya-hero.jpg"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/arya-hero.jpg"],
    },
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

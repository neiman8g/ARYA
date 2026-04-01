import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import ProductPageClient from "./ProductPageClient";

const PRODUCT_META: Record<string, { title: string; description: string; keywords: string }> = {
  "noble-legging": {
    title: "Women's Athletic Legging for Strong Thighs | PFAS-Free NobleFlex | Arya",
    description: "Finally a legging engineered for athletic thighs. Arya Noble Legging uses PFAS-free NobleFlex fabric with four-way stretch, butt-lifting construction, and extended thigh room for bodies that actually train.",
    keywords: "sustainable legging athletic fit, leggings for strong thighs, premium eco friendly leggings, NobleFlex legging, activewear for muscular legs, skin safe leggings, athletic body legging",
  },
  "noble-bra": {
    title: "Women's Athletic Sports Bra | Skin-Conscious NobleFlex Fabric | Arya",
    description: "A sports bra that supports athletic chests without digging in. Arya Noble Sports Bra uses PFAS-free NobleFlex fabric with secure support, adaptive stretch, and skin-conscious comfort for high-movement training.",
    keywords: "sustainable sports bra athletic support, eco friendly sports bra, skin conscious sports bra, NobleFlex bra, premium activewear bra, sports bra for athletic body",
  },
  "noble-long-crop": {
    title: "Women's Athletic Longsleeve Crop Top | PFAS-Free | NobleFlex | Arya",
    description: "A longsleeve crop that moves with athletic shoulders and lats. Arya Noble Long Crop uses PFAS-free NobleFlex fabric with flexible recovery, breathable comfort, and skin-conscious materials for all-day wear.",
    keywords: "sustainable athletic crop top, eco friendly long sleeve crop, NobleFlex top, premium activewear set, athletic crop top skin conscious",
  },
  "noble-short": {
    title: "Men's Athletic Shorts for Muscular Thighs | NobleDry Fabric | Arya",
    description: "Finally shorts built for muscular thighs without waist compromise. Arya Noble Short uses PFAS-free NobleDry fabric with quick-dry stretch, athletic taper, and skin-conscious construction for hard training days.",
    keywords: "sustainable athletic shorts, shorts for strong thighs, extended thigh room shorts, NobleDry shorts, premium eco friendly shorts, activewear for muscular legs",
  },
  "noble-tee": {
    title: "Men's Fitted Athletic Tee for Broad Shoulders | NobleSoft Fabric | Arya",
    description: "A fitted tee for broad shoulders that does not billow at the waist. Arya Noble Tee uses NobleSoft fabric with a smooth natural feel, thermoregulating breathability, and skin-conscious no-synthetic-against-skin comfort.",
    keywords: "natural performance tee, sustainable athletic tee, no synthetic activewear, NobleSoft tee, skin safe workout shirt, natural fiber athletic top, sustainable men's activewear",
  },
  "noble-pant": {
    title: "Men's Performance Trouser | Athletic Fit | NobleDry Fabric | Arya",
    description: "Performance trousers that fit athletic quads and glutes without restricting movement. Arya Noble Pant uses PFAS-free NobleDry fabric with stretch structure, clean tailoring, and skin-conscious comfort from commute to training.",
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
      <SectionNav />

      <main className="p-main">
        <Link href="/collection" className="p-back">← Collection</Link>
        <Script
          id={`${product.slug}-product-schema`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.desc,
            image: `https://www.arya.clothing/arya-hero.jpg`,
            brand: {
              "@type": "Brand",
              name: "Arya",
            },
            offers: {
              "@type": "Offer",
              url: `https://www.arya.clothing/products/${product.slug}`,
              availability: "https://schema.org/PreOrder",
              priceCurrency: "USD",
              itemCondition: "https://schema.org/NewCondition",
            },
            ...(product.fabric && { material: product.fabric }),
            ...(product.sizes && {
              size: product.sizes,
            }),
          })}
        </Script>
        <Script
          id={`${product.slug}-breadcrumb-schema`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.arya.clothing/" },
              { "@type": "ListItem", position: 2, name: "Collection", item: "https://www.arya.clothing/collection" },
              { "@type": "ListItem", position: 3, name: product.name, item: `https://www.arya.clothing/products/${product.slug}` },
            ],
          })}
        </Script>
        <ProductPageClient product={product} />
      </main>

      <SiteFooter variant="product" />
    </div>
  );
}

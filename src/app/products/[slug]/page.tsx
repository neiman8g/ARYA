import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import ProductPageClient from "./ProductPageClient";

const PRODUCT_META: Record<string, { title: string; description: string; keywords: string }> = {
  "noble-legging": {
    title: "The Noble Legging | NobleFlex | Arya",
    description: "NobleFlex. Four-way stretch, high-rise waistband, extended thigh room. XS to 3XL. Launching 2027.",
    keywords: "Noble Legging, NobleFlex, Arya",
  },
  "noble-bra": {
    title: "The Noble Sports Bra | NobleFlex | Arya",
    description: "NobleFlex. Medium to high support, four-way stretch. XS to 3XL. Launching 2027.",
    keywords: "Noble Sports Bra, NobleFlex, Arya",
  },
  "noble-long-crop": {
    title: "The Noble Long Crop | NobleFlex | Arya",
    description: "NobleFlex long sleeve. Pairs with the Noble Sports Bra. XS to 3XL. Launching 2027.",
    keywords: "Noble Long Crop, NobleFlex, Arya",
  },
  "noble-short": {
    title: "The Noble Short | NobleDry | Arya",
    description: "NobleDry. Extended thigh room, four-way stretch. S to 3XL. Launching 2027.",
    keywords: "Noble Short, NobleDry, Arya",
  },
  "noble-tee": {
    title: "The Noble Tee | NobleSoft | Arya",
    description: "NobleSoft. Silk-like feel, odor resistant. S to 3XL. Launching 2027.",
    keywords: "Noble Tee, NobleSoft, Arya",
  },
  "noble-pant": {
    title: "The Noble Pant | NobleDry | Arya",
    description: "NobleDry five-pocket trouser. Four-way stretch. S to 3XL. Launching 2027.",
    keywords: "Noble Pant, NobleDry, Arya",
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetail } from "@/components/ProductDetail";
import { StandardCertificate } from "@/components/StandardCertificate";
import { getProduct, PRODUCTS } from "@/lib/products";
import { SITE_URL, STANDARD_LINE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} | ${p.searchName}`,
    description: `${p.description} Made to the Arya Standard: ${STANDARD_LINE}. Arriving 2027.`,
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Params) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const url = `${SITE_URL}/products/${p.slug}`;
  const linePath = p.line === "Women" ? "/women" : "/men";
  return (
    <>
      <section className="first">
        <ProductDetail product={p} />
      </section>
      <section className="plaster">
        <div className="wrap split top">
          <div className="stack">
            <p className="caps bronze">Before it ships</p>
            <h2 className="h-1">What this piece has to meet.</h2>
            <p className="body">
              Each line is a test the fabric must pass. Results, the mill and the certificate number are added here once the fabric
              is locked.
            </p>
          </div>
          <StandardCertificate subject={p.name} />
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          url,
          category: p.searchName,
          brand: { "@type": "Brand", name: "ARYA" },
          color: p.colors.join(", "),
          size: p.sizes.join(", "),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ARYA", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: p.line, item: `${SITE_URL}${linePath}` },
            { "@type": "ListItem", position: 3, name: p.name, item: url },
          ],
        }}
      />
    </>
  );
}

export const metadata = {
  title: "The Noble Collection | Arya Sustainable Athleisure",
  description: "Shop the Arya Noble Collection. Premium sustainable athleisure engineered for the body that moves. Noble Legging, Noble Sports Bra, Noble Tee, Noble Short and more. XS to 3XL.",
  keywords: "noble legging, noble sports bra, sustainable leggings athletic fit, premium athleisure collection, eco friendly activewear, activewear for strong quads, skin conscious leggings",
  openGraph: {
    title: "The Noble Collection | Arya Sustainable Athleisure",
    description: "Shop the Arya Noble Collection. Premium sustainable athleisure engineered for the body that moves. Noble Legging, Noble Sports Bra, Noble Tee, Noble Short and more. XS to 3XL.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Noble Collection | Arya Sustainable Athleisure",
    description: "Shop the Arya Noble Collection. Premium sustainable athleisure engineered for the body that moves. Noble Legging, Noble Sports Bra, Noble Tee, Noble Short and more. XS to 3XL.",
    images: ["/arya-hero.jpg"],
  },
};

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

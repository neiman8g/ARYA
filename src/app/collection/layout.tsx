export const metadata = {
  title: "The Noble Collection | Arya Sustainable Athleisure",
  description: "The Noble Collection. Legging, sports bra, tee, short, and pant. XS to 3XL. Launching 2027.",
  keywords: "Noble Legging, Noble Sports Bra, Noble Tee, Noble Short, Arya",
  openGraph: {
    title: "The Noble Collection | Arya Sustainable Athleisure",
    description: "The Noble Collection. Legging, sports bra, tee, short, and pant. XS to 3XL. Launching 2027.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Noble Collection | Arya Sustainable Athleisure",
    description: "The Noble Collection. Legging, sports bra, tee, short, and pant. XS to 3XL. Launching 2027.",
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

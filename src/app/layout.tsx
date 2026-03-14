import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F5EFE4",
};

// Canonical URL for OG/Twitter previews when shared. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.arya.clothing).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arya — Noble by nature | Premium Sustainable Athleisure",
  description: "Arya is a premium sustainable athleisure brand engineered for the body that moves. Persian craft philosophy meets California living. Skin-conscious fabrics, athletic fit, and giving back. Shop the Noble Collection.",
  keywords: "sustainable athleisure, premium activewear, athletic fit leggings, skin conscious activewear, sustainable luxury athleisure, Persian American brand, eco friendly athleisure, activewear for athletic bodies, NobleFlex fabric, noble by nature",
  openGraph: {
    title: "Arya — Noble by nature | Premium Sustainable Athleisure",
    description: "Arya is a premium sustainable athleisure brand engineered for the body that moves. Persian craft philosophy meets California living. Skin-conscious fabrics, athletic fit, and giving back. Shop the Noble Collection.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya — Noble by nature | Premium Sustainable Athleisure",
    description: "Arya is a premium sustainable athleisure brand engineered for the body that moves. Persian craft philosophy meets California living. Skin-conscious fabrics, athletic fit, and giving back. Shop the Noble Collection.",
    images: ["/arya-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

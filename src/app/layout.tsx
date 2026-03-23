import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Geist, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";
import "./home-page.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F5EFE4",
  // Mobile keyboards: avoid layout jumps where possible
  interactiveWidget: "resizes-content",
};

// Canonical URL for OG/Twitter previews when shared. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.arya.clothing).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arya | Premium Activewear for Athletic Bodies | PFAS-Free | Los Angeles",
  description: "Arya is a premium activewear brand engineered for athletic bodies. No PFAS, no toxic dyes, no virgin synthetics. Built for strong quads, broad shoulders, and bodies that move through every version of life. Persian craft. California soul. Launching Fall 2026.",
  keywords: "activewear for athletic bodies, PFAS free activewear, non toxic activewear, activewear for strong thighs, activewear for broad shoulders, Persian American brand, skin conscious activewear, NobleFlex fabric, noble by nature, Los Angeles activewear brand",
  openGraph: {
    title: "Arya | Premium Activewear for Athletic Bodies | PFAS-Free | Los Angeles",
    description: "Arya is a premium activewear brand engineered for athletic bodies. No PFAS, no toxic dyes, no virgin synthetics. Persian craft. California soul. Launching Fall 2026.",
    images: ["https://www.arya.clothing/arya-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya | Premium Activewear for Athletic Bodies | PFAS-Free | Los Angeles",
    description: "Arya is a premium activewear brand engineered for athletic bodies. No PFAS, no toxic dyes, no virgin synthetics. Persian craft. California soul. Launching Fall 2026.",
    images: ["https://www.arya.clothing/arya-hero.jpg"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JCSYYDXMC"
          strategy="afterInteractive"
        />
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Arya",
            url: "https://www.arya.clothing",
            logo: "https://www.arya.clothing/arya-logo.png",
            description:
              "Premium athleisure engineered for athletic bodies. PFAS-free, skin-conscious materials. Persian craft. California soul.",
            foundingLocation: "Los Angeles, California",
            sameAs: [
              "https://instagram.com/wear_arya",
              "https://tiktok.com/@wear_arya",
            ],
          })}
        </Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-0JCSYYDXMC');
  `}
        </Script>
      </body>
    </html>
  );
}

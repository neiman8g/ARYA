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
};

// Canonical URL for OG/Twitter previews when shared. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.arya.clothing).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arya — Noble by nature",
  description: "Where Persian craft meets California living. Engineered for the body that moves, built for every version of your life.",
  openGraph: {
    title: "Arya — Noble by nature",
    description: "Where Persian craft meets California living. Engineered for the body that moves, built for every version of your life.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Arya — Noble by nature" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya — Noble by nature",
    description: "Where Persian craft meets California living. Engineered for the body that moves, built for every version of your life.",
    images: ["/opengraph-image"],
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

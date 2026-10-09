import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Italiana, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinSection } from "@/components/JoinSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SOCIAL } from "@/lib/site";

const display = Italiana({ variable: "--font-display", subsets: ["latin"], weight: "400", display: "swap" });
// Josefin Sans is the wordmark's typeface, so UI text matches the logo.
const text = Josefin_Sans({ variable: "--font-text", subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F5EFE4",
};

// Production always canonicalizes to the real domain, so preview URLs never leak into search results.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? SITE_URL : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

const DESCRIPTION =
  "Premium non-toxic activewear, designed in California. Every fabric held to a published standard: OEKO-TEX 100, no added PFAS, no toxic dyes. Women's and men's. Arriving 2027.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ARYA | Premium Non-Toxic Activewear", template: "%s | ARYA" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { siteName: "ARYA", locale: "en_US", type: "website", description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${text.variable}`}>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <JoinSection />
        <SiteFooter />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ARYA",
            url: SITE_URL,
            logo: `${SITE_URL}/brand/arya-icon.png`,
            description: DESCRIPTION,
            slogan: "Noble by nature.",
            foundingLocation: "Santa Monica, California",
            email: "hello@arya.clothing",
            sameAs: [SOCIAL.instagram, SOCIAL.tiktok],
          }}
        />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "ARYA", url: SITE_URL }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0JCSYYDXMC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-0JCSYYDXMC');
window.aryaTrack = function(name, params){ if (typeof gtag === 'function') gtag('event', name, params || {}); };`}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","w54dta35ut");`}
        </Script>
      </body>
    </html>
  );
}

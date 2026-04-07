import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Arya terms of service — the rules and guidelines for using arya.clothing and placing pre-orders.",
  alternates: { canonical: "https://www.arya.clothing/terms" },
};

export default function TermsPage() {
  return (
    <div className="section-page">
      <SectionNav />
      <main className="sp-main">
        <span className="sp-label">Legal</span>
        <h1>Terms of Service</h1>
        <p className="coll-note">Effective: Fall 2026 &middot; Last updated: April 2026</p>

        <div className="sp-copy-section">
          <h2>1. Agreement</h2>
          <p>By accessing arya.clothing or placing a pre-order, you agree to these terms. If you do not agree, please do not use our site.</p>
        </div>

        <div className="sp-copy-section">
          <h2>2. Pre-Orders</h2>
          <p>All products listed on arya.clothing are currently available for pre-order only. Pre-orders are expected to ship Fall 2026. By placing a pre-order, you understand that:</p>
          <p>Your payment will be processed at the time of order. Estimated delivery dates are approximate and subject to change. We will notify you by email if there are any significant delays. You may cancel your pre-order for a full refund at any time before the product ships.</p>
        </div>

        <div className="sp-copy-section">
          <h2>3. Pricing</h2>
          <p>All prices are listed in USD. We reserve the right to adjust pricing at any time. If you have already placed a pre-order, the price at the time of your order will be honored.</p>
        </div>

        <div className="sp-copy-section">
          <h2>4. Intellectual Property</h2>
          <p>All content on arya.clothing — including the Arya name, logo, product names (NobleFlex, NobleSoft, NobleDry), images, and copy — is the property of Arya and may not be reproduced without written permission.</p>
        </div>

        <div className="sp-copy-section">
          <h2>5. Limitation of Liability</h2>
          <p>Arya is provided &ldquo;as is.&rdquo; We are not liable for any indirect, incidental, or consequential damages arising from your use of the site or products.</p>
        </div>

        <div className="sp-copy-section">
          <h2>6. Governing Law</h2>
          <p>These terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of Los Angeles County, California.</p>
        </div>

        <div className="sp-copy-section">
          <h2>7. Changes</h2>
          <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
        </div>

        <div className="sp-copy-section">
          <h2>8. Contact</h2>
          <p>Questions? Contact us at <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a>.</p>
        </div>
      </main>
      <SiteFooter variant="section" />
    </div>
  );
}

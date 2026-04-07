import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Arya privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.arya.clothing/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="section-page">
      <SectionNav />
      <main className="sp-main">
        <span className="sp-label">Legal</span>
        <h1>Privacy Policy</h1>
        <p className="coll-note">Effective: Fall 2026 &middot; Last updated: April 2026</p>

        <div className="sp-copy-section">
          <h2>1. Information We Collect</h2>
          <p>When you visit arya.clothing, join our waitlist, or place a pre-order, we may collect:</p>
          <p><strong>Information you provide:</strong> Email address (waitlist), name, shipping address, payment information (pre-orders processed via Stripe — we never store card numbers), and any messages you send us.</p>
          <p><strong>Automatically collected:</strong> Browser type, device information, IP address, pages visited, and referring URL. We use Google Analytics 4 and Microsoft Clarity for site analytics and session recording.</p>
        </div>

        <div className="sp-copy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to: process pre-orders and payments, send waitlist updates and launch announcements, improve our website and product experience, and respond to your inquiries.</p>
          <p>We do not sell, rent, or trade your personal information to third parties. We share data only with service providers essential to our operations (Stripe for payments, Resend for email, Vercel for hosting).</p>
        </div>

        <div className="sp-copy-section">
          <h2>3. Cookies &amp; Analytics</h2>
          <p>We use essential cookies for site functionality and analytics tools (Google Analytics 4, Microsoft Clarity) to understand how visitors use our site. You can disable cookies in your browser settings at any time.</p>
        </div>

        <div className="sp-copy-section">
          <h2>4. Your Rights (CCPA)</h2>
          <p>If you are a California resident, you have the right to: know what personal information we collect, request deletion of your data, opt out of any sale of personal information (we do not sell data), and non-discrimination for exercising your rights.</p>
          <p>To exercise any of these rights, contact us at <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a>.</p>
        </div>

        <div className="sp-copy-section">
          <h2>5. Data Security</h2>
          <p>We implement reasonable security measures to protect your information. Payment processing is handled entirely by Stripe, which is PCI-DSS compliant. We never store credit card numbers on our servers.</p>
        </div>

        <div className="sp-copy-section">
          <h2>6. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Changes will be posted on this page with an updated effective date.</p>
        </div>

        <div className="sp-copy-section">
          <h2>7. Contact</h2>
          <p>Questions about this policy? Contact us at <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a>.</p>
          <p>Arya &middot; Los Angeles, California</p>
        </div>
      </main>
      <SiteFooter variant="section" />
    </div>
  );
}

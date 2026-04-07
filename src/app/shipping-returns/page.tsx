import type { Metadata } from "next";
import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Arya shipping, delivery, returns, and exchanges policy for pre-orders and future orders.",
  alternates: { canonical: "https://www.arya.clothing/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <div className="section-page">
      <SectionNav />
      <main className="sp-main">
        <span className="sp-label">Policy</span>
        <h1>Shipping &amp; Returns</h1>

        <div className="sp-copy-section">
          <h2>Pre-Order Shipping</h2>
          <p>All current orders are pre-orders for our Fall 2026 launch collection. Here is what to expect:</p>
          <p><strong>When will I be charged?</strong> Your card is charged at the time of pre-order to secure your spot.</p>
          <p><strong>When does it ship?</strong> Pre-orders are expected to ship Fall 2026. We will send you tracking information via email as soon as your order ships.</p>
          <p><strong>Shipping cost:</strong> Standard shipping within the United States is complimentary on all orders. International shipping will be available at launch — join our <Link href="/#waitlist" className="fabric-link">waitlist</Link> for updates.</p>
          <p><strong>Delivery time:</strong> Once shipped, domestic orders typically arrive within 5–7 business days.</p>
        </div>

        <div className="sp-copy-section">
          <h2>Pre-Order Cancellation</h2>
          <p>You may cancel your pre-order at any time before the product ships for a full refund. To cancel, email <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a> with your order number.</p>
        </div>

        <div className="sp-copy-section">
          <h2>Returns &amp; Exchanges</h2>
          <p>We want you to love what you wear. Once our products ship, we will offer:</p>
          <p><strong>30-day returns:</strong> Unworn items with tags attached can be returned within 30 days of delivery for a full refund.</p>
          <p><strong>Exchanges:</strong> Need a different size? We offer free exchanges within 30 days of delivery. Contact us and we will send you the right size.</p>
          <p><strong>Condition:</strong> Items must be unworn, unwashed, and in original condition with all tags attached.</p>
        </div>

        <div className="sp-copy-section">
          <h2>How to Initiate a Return or Exchange</h2>
          <p>Email <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a> with your order number and whether you would like a return or exchange. We will respond within 1 business day with a prepaid return label.</p>
        </div>

        <div className="sp-copy-section">
          <h2>Refund Processing</h2>
          <p>Refunds are processed to the original payment method within 5–10 business days of receiving the returned item.</p>
        </div>

        <div className="sp-waitlist-cta">
          <h2>Have a question?</h2>
          <p>Our team is here to help. Check our <Link href="/faq" className="fabric-link">FAQ</Link> or reach out directly at <a href="mailto:hello@arya.clothing" className="fabric-link">hello@arya.clothing</a>.</p>
        </div>
      </main>
      <SiteFooter variant="section" />
    </div>
  );
}

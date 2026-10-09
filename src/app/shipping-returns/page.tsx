import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "ARYA shipping, returns and exchanges: complimentary US shipping, 30 day returns and free size exchanges from launch in 2027.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <section className="first">
      <div className="wrap article">
        <h1 className="h-1"><span className="kicker">Policy</span>Shipping &amp; Returns</h1>
        <p className="lede">ARYA launches in 2027. Nothing is for sale yet, so no one is charged today. Here is how orders will work from launch.</p>
        <h2>Shipping</h2>
        <p><strong>Within the United States:</strong> standard shipping is complimentary on every order. Orders usually arrive within 5 to 7 business days of shipping, with tracking by email.</p>
        <p><strong>International:</strong> we&apos;ll share international options closer to launch.</p>
        <h2>Returns</h2>
        <p>Unworn, unwashed items with tags attached can be returned within 30 days of delivery for a full refund to the original payment method, usually within 5 to 10 business days of the return arriving.</p>
        <h2>Exchanges</h2>
        <p>Need a different size? Exchanges are free within 30 days of delivery. Write to us and we&apos;ll send the right size.</p>
        <h2>Starting a return or exchange</h2>
        <p>Email <a href="mailto:hello@arya.clothing">hello@arya.clothing</a> with your order number. We reply within one business day with a prepaid label.</p>
      </div>
    </section>
  );
}

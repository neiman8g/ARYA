import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using arya.clothing and joining the ARYA founding list.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="first">
      <div className="wrap article">
        <h1 className="h-1"><span className="kicker">Legal</span>Terms of Service</h1>
        <p className="caps soft">Last updated October 2026</p>
        <h2>1. Agreement</h2>
        <p>By using arya.clothing or joining the founding list, you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>2. Before launch</h2>
        <p>ARYA products are not yet for sale. Product details, colors, sizes and prices shown on the site describe the planned 2027 collection and may change before launch. Joining the founding list does not create an order or any obligation to buy.</p>
        <h2>3. Pricing</h2>
        <p>Prices are listed in US dollars. Final prices are confirmed when products go on sale.</p>
        <h2>4. Intellectual property</h2>
        <p>All content on arya.clothing, including the ARYA name, logo, product names, images and copy, belongs to ARYA and may not be reproduced without written permission.</p>
        <h2>5. Limitation of liability</h2>
        <p>The site is provided as is. ARYA is not liable for indirect, incidental or consequential damages arising from your use of the site.</p>
        <h2>6. Governing law</h2>
        <p>These terms are governed by the laws of the State of California. Disputes will be resolved in the courts of Los Angeles County, California.</p>
        <h2>7. Changes</h2>
        <p>We may update these terms. Continuing to use the site after a change means you accept the updated terms.</p>
        <h2>8. Contact</h2>
        <p>Questions? Write to <a href="mailto:hello@arya.clothing">hello@arya.clothing</a>.</p>
      </div>
    </section>
  );
}

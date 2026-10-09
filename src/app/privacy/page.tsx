import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ARYA collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="first">
      <div className="wrap article">
        <h1 className="h-1"><span className="kicker">Legal</span>Privacy Policy</h1>
        <p className="caps soft">Last updated October 2026</p>
        <h2>1. What we collect</h2>
        <p><strong>What you give us:</strong> your email address when you join the founding list, and anything you write to us.</p>
        <p><strong>Collected automatically:</strong> browser type, device information, IP address, pages visited and referring site. We use Google Analytics 4 and Microsoft Clarity to understand how the site is used.</p>
        <h2>2. How we use it</h2>
        <p>To send founding list updates and launch news, to improve the site, and to reply to you. We do not sell, rent or trade your personal information.</p>
        <p>We share data only with the services that run ARYA: Klaviyo for email, Vercel for hosting, and the analytics tools above.</p>
        <h2>3. Cookies and analytics</h2>
        <p>We use essential cookies for the site to work and analytics cookies to understand visits. You can turn cookies off in your browser settings at any time.</p>
        <h2>4. Your rights (CCPA)</h2>
        <p>If you live in California, you can ask what personal information we hold, ask us to delete it, and opt out of any sale of it (we do not sell data). We will never treat you differently for using these rights. Every email includes an unsubscribe link.</p>
        <p>To make a request, write to <a href="mailto:hello@arya.clothing">hello@arya.clothing</a>.</p>
        <h2>5. Security</h2>
        <p>We use reasonable measures to protect your information. No payment information is collected on this site.</p>
        <h2>6. Changes</h2>
        <p>We will post any changes to this policy here with a new date.</p>
        <h2>7. Contact</h2>
        <p>ARYA, Santa Monica, California. <a href="mailto:hello@arya.clothing">hello@arya.clothing</a></p>
      </div>
    </section>
  );
}

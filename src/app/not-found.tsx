import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 24 }}>
        <h1 className="h-hero"><span className="kicker">404</span>This page has moved on.</h1>
        <p className="body">The page you were looking for doesn&apos;t exist anymore. Most of the site now lives in a few places.</p>
        <div className="actions">
          <Link className="btn solid" href="/">Home</Link>
          <Link className="btn" href="/women">Women</Link>
          <Link className="btn" href="/men">Men</Link>
        </div>
      </div>
    </section>
  );
}

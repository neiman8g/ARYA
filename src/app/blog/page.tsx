import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from ARYA on fit, fabric and choosing non-toxic activewear without the guesswork.",
  alternates: { canonical: "/blog" },
};

export default function JournalPage() {
  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 48 }}>
        <h1 className="h-hero">
          <span className="kicker">The ARYA Journal</span>
          Notes, plainly.
        </h1>
        {POSTS.map((p) => (
          <Link key={p.slug} className="post-card" href={`/blog/${p.slug}`}>
            <span className="caps bronze">{p.date}</span>
            <h2>{p.title}</h2>
            <p className="body">{p.excerpt}</p>
            <span className="link">Read</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

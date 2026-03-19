import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Journal | Arya | Sustainable Athleisure Stories and Insights",
  description:
    "The Arya Journal. Stories on sustainable materials, movement-friendly design, Persian craft philosophy, and the people building a better standard in athleisure.",
};

const POSTS = [
  {
    title: "Why conventional athleisure fails athletic bodies",
    excerpt:
      "Standard athleisure sizing was built for one silhouette. Here is why athletic bodies are underserved and what true fit engineering changes.",
    date: "March 2026",
    href: "/blog/why-conventional-athleisure-fails-athletic-bodies",
  },
  {
    title: "What is NobleFlex?",
    excerpt:
      "NobleFlex is Arya's proprietary performance fabric. Four-way stretch, compression, UV support, and skin conscious engineering.",
    date: "March 2026",
    href: "/blog/what-is-nobleflex",
  },
  {
    title: "Persian craft philosophy and what it means for how we make clothes",
    excerpt:
      "How the Persian standard of precision shapes every stitch, seam, and fabric decision at Arya.",
    date: "March 2026",
    href: "/blog/persian-craft-philosophy",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />

      <main className="sp-main blog-main">
        <span className="sp-label">ARYA JOURNAL</span>
        <h1>The Journal.</h1>
        <div className="blog-grid">
          {POSTS.map((post) => (
            <article key={post.href} className="blog-card">
              <p className="blog-date">{post.date}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href={post.href} className="blog-read">Read more</Link>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

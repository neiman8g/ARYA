import Image from "next/image";
import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { HomeBrandedFooter } from "@/components/HomeBrandedFooter";
import { JOURNAL_POSTS } from "@/lib/journal-posts";

export const metadata = {
  title: "Journal | Arya | Sustainable Athleisure Stories and Insights",
  description:
    "The Arya Journal. Stories on sustainable materials, movement-friendly design, Persian craft philosophy, and the people building a better standard in athleisure.",
};

export default function BlogIndexPage() {
  return (
    <div className="section-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <SectionNav />

      <main className="sp-main blog-main">
        <span className="sp-label">ARYA JOURNAL</span>
        <h1>The Journal.</h1>
        <div className="blog-grid">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-visual">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="blog-card-image"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className="blog-card-body">
                <p className="blog-date">{post.date}</p>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-read">Read more</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <HomeBrandedFooter />
    </div>
  );
}

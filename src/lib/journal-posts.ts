/** Shared metadata and imagery for Journal listing + article heroes */
export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "why-conventional-athleisure-fails-athletic-bodies",
    title: "Why conventional athleisure fails athletic bodies",
    excerpt:
      "Standard athleisure sizing was built for one silhouette. Here is why athletic bodies are underserved and what true fit engineering changes.",
    date: "March 2026",
    image: "/arya-fit.jpg",
    imageAlt: "Athletic fit activewear engineered for strong quads and broad shoulders",
  },
  {
    slug: "what-is-nobleflex",
    title: "What is NobleFlex?",
    excerpt:
      "NobleFlex is Arya's proprietary performance fabric. Four-way stretch, compression, UV support, and skin conscious engineering.",
    date: "March 2026",
    image: "/arya-hero.jpg",
    imageAlt: "Woman running through desert — premium athleisure for athletic bodies by Arya",
  },
  {
    slug: "persian-craft-philosophy",
    title: "Persian craft philosophy and what it means for how we make clothes",
    excerpt:
      "How the Persian standard of precision shapes every stitch, seam, and fabric decision at Arya.",
    date: "March 2026",
    image: "/arya-story.jpg",
    imageAlt: "Arya brand — Persian craft meets California athleisure",
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}

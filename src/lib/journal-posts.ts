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
    slug: "pfas-free-activewear-guide",
    title: "NobleFlex, NobleSoft, NobleDry",
    excerpt: "The three fabrics in the collection, and where each one is used.",
    date: "April 2026",
    image: "/arya-hero.jpg",
    imageAlt: "Arya",
  },
  {
    slug: "activewear-for-athletic-bodies",
    title: "How Arya sizes",
    excerpt: "Patterns start from scratch. Women's XS to 3XL. Men's S to 3XL.",
    date: "April 2026",
    image: "/arya-fit.jpg",
    imageAlt: "Arya fit",
  },
  {
    slug: "why-conventional-athleisure-fails-athletic-bodies",
    title: "Standard sizing",
    excerpt: "Most brands grade one pattern. Arya cuts women's and men's patterns from scratch.",
    date: "March 2026",
    image: "/arya-fit.jpg",
    imageAlt: "Arya fit",
  },
  {
    slug: "what-is-nobleflex",
    title: "What is NobleFlex?",
    excerpt:
      "NobleFlex is Arya's performance fabric. Four-way stretch, compression, UV support, and skin conscious engineering.",
    date: "March 2026",
    image: "/arya-hero.jpg",
    imageAlt: "Arya",
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}

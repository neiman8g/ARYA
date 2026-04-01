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
    title: "The complete guide to PFAS-free activewear in 2026",
    excerpt:
      "PFAS forever chemicals are in most activewear. Learn what they are, why they matter for your health, and how to find workout clothes that are truly non-toxic.",
    date: "April 2026",
    image: "/arya-hero.jpg",
    imageAlt: "PFAS-free activewear — skin conscious premium athleisure by Arya",
  },
  {
    slug: "activewear-for-athletic-bodies",
    title: "Activewear for athletic bodies: why standard sizing does not work",
    excerpt:
      "If you have muscular thighs, broad shoulders, or a strong chest, standard activewear was not built for you. Here is what engineered fit looks like.",
    date: "April 2026",
    image: "/arya-fit.jpg",
    imageAlt: "Activewear engineered for athletic bodies with muscular thighs and broad shoulders",
  },
  {
    slug: "sustainable-activewear-worth-the-investment",
    title: "Is sustainable activewear worth the investment?",
    excerpt:
      "The real cost of cheap leggings goes beyond price. Here is why sustainable activewear is worth it for your skin, your wardrobe, and the planet.",
    date: "April 2026",
    image: "/arya-story.jpg",
    imageAlt: "Sustainable activewear investment — Persian craft meets California soul by Arya",
  },
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

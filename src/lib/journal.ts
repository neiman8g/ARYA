export type Post = { slug: string; title: string; excerpt: string; date: string; isoDate: string };

export const POSTS: Post[] = [
  {
    // Slug kept from the original PFAS post so its existing search history carries over.
    slug: "pfas-free-activewear-guide",
    title: "Non-toxic activewear: what to check before you buy",
    excerpt:
      "Five things to look for on any brand's site, in about two minutes. No chemistry degree required, and no scare stories.",
    date: "October 2026",
    isoDate: "2026-10-09",
  },
];

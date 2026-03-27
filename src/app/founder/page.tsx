import { FoundersSection } from "@/components/FoundersSection";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "The Founders | Arya",
  description: "Nima Gougerchian and Lucy Sager, founders of Arya.",
  openGraph: {
    title: "The Founders | Arya",
    description: "Nima Gougerchian and Lucy Sager, founders of Arya.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Founders | Arya",
    description: "Nima Gougerchian and Lucy Sager, founders of Arya.",
    images: ["/arya-hero.jpg"],
  },
};

export default function FounderPage() {
  return (
    <div className="section-page">
      <SectionNav activeLink="founder" />

      <main className="sp-main sp-main--founder">
        <FoundersSection />
      </main>

      <SiteFooter />
    </div>
  );
}

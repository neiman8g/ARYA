"use client";

import { CartProvider } from "@/components/commerce/CartProvider";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { HomeNav, StickyCtaBar, FadeInObserver } from "@/components/home/HomeNav";
import { HeroSection, Ticker } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { FitSection } from "@/components/home/FitSection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/home/MissionSection";
import { FoundersSection } from "@/components/FoundersSection";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { StandardTeaser } from "@/components/home/StandardTeaser";
import { HomeBrandedFooter } from "@/components/HomeBrandedFooter";

// ─── Homepage ────────────────────────────────────────────────────────────────
// Section order optimized for conversion:
//   1. Hero        — Hook (brand promise + CTA)
//   2. Problem     — WHY existing activewear fails (build desire)
//   3. Materials   — PROOF (refusal list — what's NOT in our fabric)
//   4. Fit         — Engineered for athletic bodies
//   5. Collection  — NOW shop (user is sold)
//   6. Story       — Brand origin (Persian craft + California soul)
//   7. Mission     — Four pillars
//   8. Founders    — Trust (Nima & Lucy)
//   9. Waitlist    — Final conversion
//  10. Standard    — Teaser
//  11. Footer

export default function AryaPage() {
  return (
    <CartProvider>
      <div className="arya-home">
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <HomeNav />
        <CartDrawer />

        <div className="arya-home-main">
          <HeroSection />
          <Ticker />
          <ProblemSection />
          <MaterialsSection />
          <FitSection />
          <CollectionSection />
          <StorySection />
          <MissionSection />
          <FoundersSection showCtas={false} />
          <WaitlistSection />
          <StandardTeaser />
        </div>

        <HomeBrandedFooter />
        <StickyCtaBar />
        <FadeInObserver />
      </div>
    </CartProvider>
  );
}

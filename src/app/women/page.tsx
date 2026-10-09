import type { Metadata } from "next";
import { LinePage } from "@/components/LinePage";

export const metadata: Metadata = {
  title: "Women's Non-Toxic Activewear: Leggings, Sports Bras, Shorts",
  description:
    "Premium non-toxic activewear for women: high rise leggings, sports bras, bike shorts and tanks, held to a published standard. OEKO-TEX 100, no added PFAS, no toxic dyes. XS to 3XL.",
  alternates: { canonical: "/women" },
};

export default function WomenPage() {
  return <LinePage line="Women" />;
}

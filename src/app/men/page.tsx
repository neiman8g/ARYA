import type { Metadata } from "next";
import { LinePage } from "@/components/LinePage";

export const metadata: Metadata = {
  title: "Men's Non-Toxic Activewear: Tees, Shorts, Joggers",
  description:
    "Premium non-toxic activewear for men: training tees, shorts and joggers held to a published standard. OEKO-TEX 100, no added PFAS, no toxic dyes. S to 3XL.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  return <LinePage line="Men" />;
}

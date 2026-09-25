export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  gender: string;
  name: string;
  desc: string;
  specs: string[];
  sizes: string[];
  colors: ProductColor[];
  oneLine?: string;
  fabricStory?: string;
  features?: string[];
  fabric?: "NobleFlex" | "NobleSoft" | "NobleDry";
};

export const PRODUCTS: Product[] = [
  {
    id: "noble-legging",
    slug: "noble-legging",
    gender: "Women's",
    name: "The Noble Legging",
    desc: "NobleFlex. Four-way stretch and compression. XS to 3XL.",
    specs: ["Extended thigh room", "High-rise waistband", "NobleFlex proprietary blend — see The Arya Standard", "Geometric waistband detail"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleFlex. Four-way stretch. High-rise waistband.",
    fabricStory:
      "The Noble Legging is built from NobleFlex. Four-way stretch in every direction. Muscle compression that supports without restricting. A high-rise waistband that holds without digging or rolling. Extended thigh and hip room.",
    features: [
      "NobleFlex proprietary fabric",
      "Four-way stretch with full range of motion",
      "Muscle compression without restriction",
      "UV protection built into the fabric",
      "Extended thigh and hip room",
      "High-rise waistband that holds without digging or rolling",
      "Sizes XS to 3XL",
    ],
    fabric: "NobleFlex",
  },
  {
    id: "noble-bra",
    slug: "noble-bra",
    gender: "Women's",
    name: "The Noble Sports Bra",
    desc: "NobleFlex. Medium to high support, four-way stretch. XS to 3XL.",
    specs: ["Encapsulation + compression hybrid", "NobleFlex proprietary blend — see The Arya Standard", "Adjustable straps", "Hook-free"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleFlex. Medium to high support.",
    fabricStory:
      "The Noble Sports Bra is built from the same NobleFlex fabric as the Noble Legging, designed to be worn as a set or on its own. Medium to high support that stays in place through every movement. Four-way stretch, moisture management, and a construction that respects your skin as much as your performance. Pairs perfectly with the Noble Legging for the complete Noble Set.",
    features: [
      "NobleFlex proprietary fabric",
      "Medium to high support",
      "Four-way stretch that moves in every direction",
      "Moisture management built in",
      "Skin certified and free from harmful substances",
      "Designed to pair with the Noble Legging as a set",
      "Sizes XS to 3XL",
    ],
    fabric: "NobleFlex",
  },
  {
    id: "noble-long-crop",
    slug: "noble-long-crop",
    gender: "Women's",
    name: "The Noble Long Crop",
    desc: "NobleFlex fabric. Designed to move with you and pair with the Noble Sports Bra.",
    specs: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleFlex fabric. Designed to move with you and pair with the Noble Sports Bra.",
    fabricStory:
      "The Noble Long Crop is built from the same NobleFlex fabric as the Noble Legging and Noble Sports Bra. Designed as the third piece of the Noble Set, it pairs with the Sports Bra for a complete coordinated look, or wears on its own as a versatile long sleeve top. Four-way stretch, moisture management, and a length that covers and flatters through every movement. From the studio to the street without a second thought.",
    features: [
      "NobleFlex proprietary fabric linked to /arya-standard",
      "Designed to pair with the Noble Sports Bra as a complete set",
      "Four-way stretch with full range of motion",
      "Moisture management built in",
      "Skin certified and free from harmful substances",
      "Flattering length that moves with you",
      "Sizes XS to 3XL",
    ],
    fabric: "NobleFlex",
  },
  {
    id: "noble-short",
    slug: "noble-short",
    gender: "Men's",
    name: "The Noble Short",
    desc: "NobleDry. Extended thigh room, four-way stretch. S to 3XL.",
    specs: ["Extended thigh circumference", "NobleDry proprietary blend — see The Arya Standard", "Geometric waistband detail", "Deep side pockets"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleDry. Extended thigh room.",
    fabricStory:
      "The Noble Short is built from NobleDry. Durable, quick-dry, with extended thigh room. Four-way stretch. Reinforced seams. A waistband that stays in place.",
    features: [
      "NobleDry proprietary performance fabric",
      "Four-way stretch with full range of motion",
      "Quick-dry construction",
      "Extended thigh room with no restriction and no pulling",
      "Reinforced seams built for real movement",
      "Waistband that holds through every activity",
      "Sizes S to 3XL",
    ],
    fabric: "NobleDry",
  },
  {
    id: "noble-tee",
    slug: "noble-tee",
    gender: "Men's",
    name: "The Noble Tee",
    desc: "NobleSoft. Silk-like feel, odor resistant. S to 3XL.",
    specs: ["Extended shoulder and sleeve room", "NobleSoft natural blend — see The Arya Standard", "Minimal seam construction"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleSoft. Silk-like feel, odor resistant.",
    fabricStory:
      "The Noble Tee is made from NobleSoft. Silk-like against the skin from the first wear. Naturally odor resistant. Thermoregulating.",
    features: [
      "NobleSoft proprietary natural blend",
      "Silk-like hand feel from the first wear",
      "Naturally odor resistant",
      "Thermoregulating",
      "Sizes S to 3XL",
    ],
    fabric: "NobleSoft",
  },
  {
    id: "noble-pant",
    slug: "noble-pant",
    gender: "Men's",
    name: "The Noble Pant",
    desc: "NobleDry. Five-pocket trouser. S to 3XL.",
    specs: [],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "NobleDry. Five-pocket trouser.",
    fabricStory:
      "The Noble Pant is built from NobleDry. Five-pocket construction with extended thigh room. Four-way stretch. A waistband that holds without digging.",
    features: [
      "NobleDry proprietary performance fabric linked to /arya-standard",
      "Five pocket construction",
      "Four-way stretch with full range of motion",
      "Extended thigh room with no restriction",
      "Waistband that holds through every activity",
      "Five-pocket construction",
      "Sizes S to 3XL",
    ],
    fabric: "NobleDry",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByGender(gender: string) {
  return PRODUCTS.filter((p) => p.gender === gender);
}

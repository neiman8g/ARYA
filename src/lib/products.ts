export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  gender: string;
  name: string;
  price: string;
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
    price: "$118",
    desc: "NobleFlex fabric. Four-way stretch, muscle compression, and extended thigh room engineered for the body that moves. XS to 3XL.",
    specs: ["Extended thigh room", "High-rise waistband", "Persian cotton, silk, nylon blend", "Geometric waistband detail"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "Engineered fit. Skin conscious fabric. Built for the body that moves.",
    fabricStory:
      "The Noble Legging is built from NobleFlex, Arya's proprietary performance fabric. Designed from scratch for the athletic body. Four-way stretch in every direction. Muscle compression that supports without restricting. A high-rise waistband that holds without digging or rolling. Extended thigh and hip room that finally fits the body that surfs, trains, rides, and lives fully. Skin certified and free from harmful chemicals. Noble from the inside out.",
    features: [
      "NobleFlex proprietary fabric",
      "Four-way stretch with full range of motion",
      "Muscle compression without restriction",
      "UV protection built into the fabric",
      "Skin certified and free from harmful dyes or chemicals",
      "Extended thigh and hip room engineered for the body that moves",
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
    price: "$68",
    desc: "NobleFlex fabric. Medium to high support, four-way stretch, built to pair with the Noble Legging. XS to 3XL.",
    specs: ["Encapsulation + compression hybrid", "Persian cotton, silk, nylon blend", "Adjustable straps", "Hook-free"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "Skin-conscious support. Built to move with you.",
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
    price: "$88",
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
    price: "$98",
    desc: "NobleDry fabric. Extended thigh room, four-way stretch, built for real movement. S to 3XL.",
    specs: ["Extended thigh circumference", "Persian cotton, silk, nylon blend", "Geometric waistband detail", "Deep side pockets"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "Noble fabric. Engineered thigh room. Built for real movement.",
    fabricStory:
      "The Noble Short is built from NobleDry, Arya's performance short fabric. Durable, quick-dry, and engineered with extended thigh room for the body that actually trains. Four-way stretch that follows every movement without pulling or bunching. Reinforced seams that hold up to real use. A waistband that stays in place whether you are running, lifting, or sitting down to eat. Built for the full day, not just the workout.",
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
    price: "$78",
    desc: "NobleSoft fabric. Silk-like against the skin, naturally odor resistant, no synthetics touching your body. S to 3XL.",
    specs: ["Extended shoulder and sleeve room", "Persian cotton, silk, nylon blend", "Minimal seam construction"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "No synthetics. No compromise. Just the finest natural blend against your skin.",
    fabricStory:
      "The Noble Tee is made from NobleSoft, Arya's natural performance blend. Silk-like against the skin from the first wear. Naturally odor resistant so it stays fresh through every hour of your day. Thermoregulating so it adapts to your body temperature rather than fighting it. No synthetics touching your skin. A tee that respects what you put on your body as much as it respects how you move in it. Cut for broad shoulders with room through the chest and a length that works from the gym to the table.",
    features: [
      "NobleSoft proprietary natural blend",
      "Silk-like hand feel from the first wear",
      "Naturally odor resistant",
      "Thermoregulating adapts to your body temperature",
      "No synthetics touching your skin",
      "Cut for broad shoulders with room through the chest",
      "Sizes S to 3XL",
    ],
    fabric: "NobleSoft",
  },
  {
    id: "noble-pant",
    slug: "noble-pant",
    gender: "Men's",
    name: "The Noble Pant",
    price: "$128",
    desc: "NobleDry fabric. Five pocket design. Built for the body that moves from the trail to the table.",
    specs: [],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
    oneLine: "Noble fabric. Five pocket design. Built for the body that moves from the trail to the table.",
    fabricStory:
      "The Noble Pant is built from NobleDry, Arya's performance fabric. Engineered to live between a jogger and a tailored trouser. Five pocket construction with extended thigh room that accommodates the athletic body without sacrificing the clean lines of a well-made pant. Four-way stretch that moves with you. A waistband that holds without digging. Built for the full day from a morning run to a dinner table without changing.",
    features: [
      "NobleDry proprietary performance fabric linked to /arya-standard",
      "Five pocket construction",
      "Four-way stretch with full range of motion",
      "Extended thigh room with no restriction",
      "Waistband that holds through every activity",
      "Transitions from movement to lifestyle without compromise",
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

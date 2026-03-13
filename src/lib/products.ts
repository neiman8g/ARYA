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
};

export const PRODUCTS: Product[] = [
  {
    id: "noble-legging",
    slug: "noble-legging",
    gender: "Women's",
    name: "The Noble Legging",
    price: "$118",
    desc: "The legging built for the body that does everything — from morning movement to the rest of your day.",
    specs: ["Extended thigh room", "High-rise waistband", "Persian cotton, silk, nylon blend", "Geometric waistband detail"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
  {
    id: "noble-long-crop",
    slug: "noble-long-crop",
    gender: "Women's",
    name: "The Noble Long Crop",
    price: "$88",
    desc: "A long crop built for movement and everyday wear.",
    specs: ["Extended length crop", "Persian cotton, silk, nylon blend", "Comfortable fit", "Versatile layering piece"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
  {
    id: "noble-short",
    slug: "noble-short",
    gender: "Men's",
    name: "The Noble Short",
    price: "$98",
    desc: "The short that finally fits the way you move — without restriction, without compromise.",
    specs: ["Extended thigh circumference", "Persian cotton, silk, nylon blend", "Geometric waistband detail", "Deep side pockets"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
  {
    id: "noble-pant",
    slug: "noble-pant",
    gender: "Men's",
    name: "The Noble Pant",
    price: "$128",
    desc: "The pant built for the body that moves — from studio to street.",
    specs: ["Extended thigh room", "Persian cotton, silk, nylon blend", "Geometric waistband detail", "Deep pockets"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
  {
    id: "noble-bra",
    slug: "noble-bra",
    gender: "Women's",
    name: "The Noble Sports Bra",
    price: "$68",
    desc: "Support that moves with you. Built for every part of your day.",
    specs: ["Encapsulation + compression hybrid", "Persian cotton, silk, nylon blend", "Adjustable straps", "Hook-free"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
  {
    id: "noble-tee",
    slug: "noble-tee",
    gender: "Men's",
    name: "The Noble Tee",
    price: "$78",
    desc: "Cut for the way you're built. Soft, breathable, made to go everywhere you do.",
    specs: ["Extended shoulder and sleeve room", "Persian cotton, silk, nylon blend", "Minimal seam construction"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Ink", hex: "#1E1810" },
      { name: "Cognac", hex: "#7A5A2F" },
      { name: "Sand", hex: "#E6DCC9" },
      { name: "Slate", hex: "#3A5A6E" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByGender(gender: string) {
  return PRODUCTS.filter((p) => p.gender === gender);
}

/**
 * Launch lineup, per the FW tech packs (Decision Log v2.3 addendum).
 * Fabric is not locked: never add fiber content, fabric names or performance claims here
 * until the hero fabric passes the written standard.
 */
export type Line = "Women" | "Men";

export type Product = {
  slug: string;
  name: string;
  line: Line;
  /** USD. null until the founders set it. */
  price: number | null;
  /** What people search for, used in page titles and alt text. */
  searchName: string;
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
};

export const COLORS: Record<string, string> = {
  Black: "#1E1B18",
  Navy: "#1F2A3A",
  Olive: "#4F5541",
  Charcoal: "#3D3D3B",
};

const WOMEN_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const MEN_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export const PRODUCTS: Product[] = [
  {
    slug: "noble-bra",
    name: "The Noble Sports Bra",
    line: "Women",
    price: 88,
    searchName: "Non-Toxic Sports Bra",
    colors: ["Black", "Navy", "Olive"],
    sizes: WOMEN_SIZES,
    description:
      "Scoop front, scoop back, nothing to adjust. Medium support that stays put through a reformer class and the rest of the day.",
    details: ["Scoop neck and back", "Encased elastic at neckline and straps", "Jacquard underband", "Removable cups", "Pairs with the Noble Legging"],
  },
  {
    slug: "noble-legging",
    name: "The Noble Legging",
    line: "Women",
    price: 148,
    searchName: "Non-Toxic High Rise Legging",
    colors: ["Black", "Navy", "Olive"],
    sizes: WOMEN_SIZES,
    description:
      "High rise, patterned from scratch. Made to stay opaque at full depth and to hold at the waist without digging or rolling.",
    details: ["High rise jacquard waistband", "Four way stretch", "Full length, flat seams", "Room through the thigh and hip", "Hidden key pocket at the back waist"],
  },
  {
    slug: "noble-short-women",
    name: "The Noble Short",
    line: "Women",
    price: 94,
    searchName: "Non-Toxic Bike Short",
    colors: ["Black", "Navy", "Olive"],
    sizes: WOMEN_SIZES,
    description:
      "The legging's waistband and fit at mid thigh. Stays down when you sit and doesn't ride up when you move.",
    details: ["High rise jacquard waistband", "Four way stretch", "Mid thigh length", "Gusset for movement", "Flat seams throughout"],
  },
  {
    slug: "noble-tank",
    name: "The Noble Tank",
    line: "Women",
    price: 78,
    searchName: "Non-Toxic Workout Tank",
    colors: ["Black", "Olive"],
    sizes: WOMEN_SIZES,
    description: "A slim, longer tank with a low back. Wear it on its own or over the bra.",
    details: ["Slim fit, hip length", "Fine straps, low back", "Built in shelf support", "Four way stretch", "Flat seams"],
  },
  {
    slug: "noble-tee",
    name: "The Noble Tee",
    line: "Men",
    price: 78,
    searchName: "Men's Non-Toxic Training Tee",
    colors: ["Charcoal", "Black"],
    sizes: MEN_SIZES,
    description: "A clean crewneck that drapes rather than clings. Wears to a session and to dinner.",
    details: ["Crew neck", "Relaxed through the body", "Soft hand with a slight drape", "Four way stretch", "Printed label, nothing to scratch"],
  },
  {
    slug: "noble-short-men",
    name: "The Noble Short",
    line: "Men",
    price: 94,
    searchName: "Men's Non-Toxic Training Short",
    colors: ["Navy", "Olive", "Charcoal", "Black"],
    sizes: MEN_SIZES,
    description:
      "A seven inch short with real room through the thigh. Jacquard waistband, inner drawcord and a liner that holds your phone.",
    details: ["Jacquard waistband, interior drawcord", "Forward angled side pockets", "Zip back pocket", "Phone pocket on the inner liner", "Split hem"],
  },
  {
    slug: "noble-jogger",
    name: "The Noble Jogger",
    line: "Men",
    price: null,
    searchName: "Men's Non-Toxic Jogger",
    colors: ["Olive", "Black"],
    sizes: MEN_SIZES,
    description: "Tapered, cuffed and shaped at the knee. Smart enough for a flight, easy enough for everything else.",
    details: ["Interior drawcord", "Shaped knee panels", "Ribbed cuffs", "Side pockets and zip back pocket", "Tapered leg"],
  },
];

export function productsFor(line: Line) {
  return PRODUCTS.filter((p) => p.line === line);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function priceLabel(p: Product) {
  return p.price === null ? "Price at launch" : `$${p.price}`;
}

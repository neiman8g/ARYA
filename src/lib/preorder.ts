/**
 * Pre-order checkout is off until the hero fabric is locked and a written product standard is signed
 * (Decision Log v2.2, 3.3). Set NEXT_PUBLIC_PREORDER_ENABLED=true in Vercel to turn it back on.
 */
export const PREORDER_ENABLED = process.env.NEXT_PUBLIC_PREORDER_ENABLED === "true";

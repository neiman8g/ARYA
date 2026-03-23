import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCT_UNIT_PRICE_USD } from "@/lib/product-prices";

export type CheckoutItem = {
  id: string;
  productId: string;
  name: string;
  size: string;
  color?: string;
  qty: number;
};

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.error("STRIPE_SECRET_KEY is not set");
    return NextResponse.json(
      { error: "Checkout is not configured" },
      { status: 500 }
    );
  }

  let body: { items: CheckoutItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  for (const item of items) {
    const unitUsd = PRODUCT_UNIT_PRICE_USD[item.productId];
    if (unitUsd == null || unitUsd <= 0) {
      return NextResponse.json(
        { error: "Invalid cart item" },
        { status: 400 }
      );
    }
  }

  const stripe = new Stripe(stripeSecret);
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const baseUrl = origin.replace(/\/$/, "");

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      const unitUsd = PRODUCT_UNIT_PRICE_USD[item.productId]!;
      const unitAmount = unitUsd * 100; // cents
      return {
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name: item.name,
            description: [item.size && `Size: ${item.size}`, item.color && `Color: ${item.color}`].filter(Boolean).join(" · ") || "Pre-order",
          },
        },
        quantity: item.qty,
      };
    }
  );

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/?checkout=success`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Payment service error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type CheckoutItem = {
  id: string;
  name: string;
  price: string; // e.g. "$118"
  size: string;
  qty: number;
};

function parsePrice(price: string): number {
  const num = parseInt(price.replace(/\$/g, "").trim(), 10);
  return Number.isNaN(num) ? 0 : num;
}

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

  const stripe = new Stripe(stripeSecret);
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const baseUrl = origin.replace(/\/$/, "");

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      const unitAmount = parsePrice(item.price) * 100; // cents
      return {
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name: item.name,
            description: `Size: ${item.size}`,
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

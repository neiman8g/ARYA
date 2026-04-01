import { NextRequest, NextResponse } from "next/server";

/**
 * Optional server fallback when the browser cannot reach Klaviyo (ad blockers, strict filters, etc.).
 * Set `KLAVIYO_PRIVATE_API_KEY` on the server (never `NEXT_PUBLIC_*`). Uses the same list id as
 * `src/lib/klaviyo-waitlist.ts` / `NEXT_PUBLIC_KLAVIYO_WAITLIST_LIST_ID`.
 *
 * @see https://developers.klaviyo.com/en/reference/subscribe_profiles
 */
const SERVER_REVISION = process.env.KLAVIYO_API_REVISION ?? "2024-10-15";
const LIST_ID =
  process.env.KLAVIYO_WAITLIST_LIST_ID ??
  process.env.NEXT_PUBLIC_KLAVIYO_WAITLIST_LIST_ID ??
  "YxmBfA";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.trim() ?? "");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server waitlist fallback is not configured" },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const payload = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: "Arya website waitlist (server fallback)",
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: { consent: "SUBSCRIBED" },
                  },
                },
              },
            },
          ],
        },
      },
      relationships: {
        list: {
          data: { type: "list", id: LIST_ID },
        },
      },
    },
  };

  try {
    const res = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          revision: SERVER_REVISION,
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok || res.status === 202) {
      return NextResponse.json({ ok: true });
    }

    const detail = await res.text();
    console.error("Klaviyo bulk subscribe failed:", res.status, detail.slice(0, 600));
    return NextResponse.json({ error: "Upstream signup failed" }, { status: 502 });
  } catch (err) {
    console.error("Klaviyo bulk subscribe error:", err);
    return NextResponse.json({ error: "Signup request failed" }, { status: 502 });
  }
}

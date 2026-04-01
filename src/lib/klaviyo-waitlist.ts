/**
 * Single Klaviyo destination for every waitlist signup (web + mobile, any UI).
 * Defaults: company `RkkP9u`, list `YxmBfA`. Override per deploy via NEXT_PUBLIC_* (same build = same list everywhere).
 *
 * Optional: set `KLAVIYO_PRIVATE_API_KEY` on the server so failed browser calls can fall back to
 * `POST /api/klaviyo-waitlist` (helps Android / ad blockers that block `a.klaviyo.com`).
 *
 * All surfaces must call {@link subscribeToKlaviyoWaitlist} only — do not duplicate list/company IDs elsewhere.
 */
export const KLAVIYO_COMPANY_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID ?? "RkkP9u";
export const KLAVIYO_WAITLIST_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_WAITLIST_LIST_ID ?? "YxmBfA";
/** Match <https://developers.klaviyo.com/en/reference/create_client_subscription> (requires `application/vnd.api+json`). */
export const KLAVIYO_API_REVISION =
  process.env.NEXT_PUBLIC_KLAVIYO_API_REVISION ?? "2026-01-15";

type KlaviyoWindow = Window & {
  klaviyo?: {
    push: (args: unknown[]) => unknown;
  };
};

async function tryKlaviyoClientSubscribe(trimmed: string): Promise<boolean> {
  const payload = {
    data: {
      type: "subscription",
      attributes: {
        custom_source: "Arya website waitlist",
        profile: {
          data: {
            type: "profile",
            attributes: { email: trimmed },
          },
        },
      },
      relationships: {
        list: {
          data: { type: "list", id: KLAVIYO_WAITLIST_LIST_ID },
        },
      },
    },
  };

  try {
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(KLAVIYO_COMPANY_ID)}`,
      {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          revision: KLAVIYO_API_REVISION,
        },
        body: JSON.stringify(payload),
      }
    );

    return response.ok || response.status === 202;
  } catch {
    return false;
  }
}

type LocalWaitlistApiResult = "ok" | "unavailable" | "error";

/** `POST /api/klaviyo-waitlist` when `KLAVIYO_PRIVATE_API_KEY` is set on the server. */
async function postLocalWaitlistApi(trimmed: string): Promise<LocalWaitlistApiResult> {
  try {
    const res = await fetch("/api/klaviyo-waitlist", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
    });
    if (res.ok) return "ok";
    if (res.status === 503) return "unavailable";
    return "error";
  } catch {
    return "error";
  }
}

/**
 * Subscribe the profile to the waitlist list.
 * 1) Same-origin `POST /api/klaviyo-waitlist` when the private key is configured (reliable on mobile / with blockers).
 * 2) Else Klaviyo Create Client Subscription from the browser.
 *
 * @see https://developers.klaviyo.com/en/reference/create_client_subscription
 * @see https://developers.klaviyo.com/en/reference/bulk_subscribe_profiles
 */
export async function subscribeToKlaviyoWaitlist(email: string): Promise<boolean> {
  const trimmed = email.trim();
  if (!trimmed) return false;

  if (typeof window !== "undefined") {
    const w = window as KlaviyoWindow;
    const push = w.klaviyo?.push;
    if (push) {
      try {
        await Promise.resolve(push(["identify", { email: trimmed }]));
        await Promise.resolve(push(["track", "Joined Waitlist", { email: trimmed }]));
      } catch {
        /* Extensions or partial shims can throw on some browsers; list subscribe must still run. */
      }
    }
  }

  if (typeof window !== "undefined") {
    const local = await postLocalWaitlistApi(trimmed);
    if (local === "ok") return true;
  }

  if (await tryKlaviyoClientSubscribe(trimmed)) return true;

  return false;
}

/** Klaviyo waitlist list + company (RkkP9u matches onsite script in layout). */
export const KLAVIYO_COMPANY_ID = "RkkP9u";
export const KLAVIYO_WAITLIST_LIST_ID = "YxmBfA";
export const KLAVIYO_API_REVISION = "2023-12-15";

type KlaviyoWindow = Window & {
  klaviyo?: {
    push: (args: unknown[]) => unknown;
  };
};

/**
 * Identify + track in Klaviyo onsite JS, then subscribe email to the waitlist list via Client Subscriptions API.
 * Returns true if the list subscription request succeeded (2xx / 202).
 */
export async function subscribeToKlaviyoWaitlist(email: string): Promise<boolean> {
  const trimmed = email.trim();
  if (!trimmed) return false;

  try {
    if (typeof window !== "undefined") {
      const w = window as KlaviyoWindow;
      const push = w.klaviyo?.push;
      if (push) {
        await Promise.resolve(push(["identify", { email: trimmed }]));
        await Promise.resolve(push(["track", "Joined Waitlist", { email: trimmed }]));
      }
    }

    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          revision: KLAVIYO_API_REVISION,
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
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
        }),
      }
    );

    return response.ok || response.status === 202;
  } catch {
    return false;
  }
}

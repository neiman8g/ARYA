import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  WAITLIST_AUTO_OPEN_DELAY_MS,
  waitlistAutoOpenDelayMs,
  type WaitlistAutoOpenSnapshot,
} from "./waitlist-local-storage.ts";

const now = 1_700_000_000_000;

function snap(partial: Partial<WaitlistAutoOpenSnapshot> = {}): WaitlistAutoOpenSnapshot {
  return {
    joined: false,
    legacyDismissed: false,
    dismissedUntil: null,
    snoozeUntil: null,
    sessionMark: null,
    now,
    ...partial,
  };
}

describe("waitlist auto-open schedule", () => {
  it("opens once after 10 seconds for a new visitor", () => {
    assert.equal(waitlistAutoOpenDelayMs(snap()), WAITLIST_AUTO_OPEN_DELAY_MS);
  });

  it("does not arm another 10 second open after it has shown or been dismissed", () => {
    assert.equal(waitlistAutoOpenDelayMs(snap({ sessionMark: "shown" })), null);
    assert.equal(waitlistAutoOpenDelayMs(snap({ sessionMark: "dismissed" })), null);
  });

  it("stays closed during a dismiss window and during an older 2 minute snooze", () => {
    assert.equal(waitlistAutoOpenDelayMs(snap({ dismissedUntil: now + 1_000 })), null);
    assert.equal(waitlistAutoOpenDelayMs(snap({ snoozeUntil: now + 1_000 })), null);
  });

  it("does not turn an expired snooze into another open after this visit already saw it", () => {
    assert.equal(
      waitlistAutoOpenDelayMs(snap({ snoozeUntil: now - 1, sessionMark: "shown" })),
      null,
    );
  });

  it("stays closed after a Klaviyo signup", () => {
    assert.equal(waitlistAutoOpenDelayMs(snap({ joined: true })), null);
    assert.equal(waitlistAutoOpenDelayMs(snap({ legacyDismissed: true })), null);
  });
});

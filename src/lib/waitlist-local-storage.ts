/** Shared with WaitlistPopup + homepage form so “already joined” is consistent. */

const STORAGE_JOINED = "arya_popup_joined";
/** Legacy: older builds wrote this on join; still treated as permanent opt-out for the timed popup. */
const STORAGE_DISMISSED_LEGACY = "arya_popup_dismissed";
const STORAGE_SNOOZE_UNTIL = "arya_popup_snooze_until";
/** Soft-dismiss expiry. While this is in the future the timed popup must not return. */
const STORAGE_DISMISSED_UNTIL = "arya_popup_dismissed_until";
/** sessionStorage: "shown" after an automatic open, "dismissed" after X / No thank you. */
const SESSION_AUTO_MARK = "arya_popup_session_mark";
/** First successful waitlist email on this device (lowercase); extras must differ. */
const STORAGE_FIRST_EMAIL = "arya_waitlist_first_email";

/** First automatic open, once per visit. This is the only short delay. */
export const WAITLIST_AUTO_OPEN_DELAY_MS = 10_000;
/** How long X / "No, thank you" keeps the automatic popup away. */
export const WAITLIST_DISMISS_FOR_MS = 14 * 24 * 60 * 60 * 1000;

export type WaitlistAutoOpenSnapshot = {
  joined: boolean;
  legacyDismissed: boolean;
  dismissedUntil: number | null;
  snoozeUntil: number | null;
  sessionMark: "shown" | "dismissed" | null;
  now: number;
};

/**
 * Delay until the next automatic open, or null when it must not open.
 * A missing or expired snooze used to fall back to 10s, which re-armed the popup forever.
 */
export function waitlistAutoOpenDelayMs(snapshot: WaitlistAutoOpenSnapshot): number | null {
  if (snapshot.joined || snapshot.legacyDismissed) return null;
  if (snapshot.sessionMark === "shown" || snapshot.sessionMark === "dismissed") return null;
  if (snapshot.dismissedUntil != null && snapshot.dismissedUntil > snapshot.now) return null;
  if (snapshot.snoozeUntil != null && snapshot.snoozeUntil > snapshot.now) return null;
  return WAITLIST_AUTO_OPEN_DELAY_MS;
}

function parseStoredTime(raw: string | null): number | null {
  if (!raw) return null;
  const value = parseInt(raw, 10);
  return Number.isNaN(value) ? null : value;
}

/** True only after a successful signup in this or a recent build (`arya_popup_joined`). */
export function isWaitlistAlreadyJoinedInBrowser(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_JOINED) === "true";
  } catch {
    return false;
  }
}

/**
 * Stops the delayed auto-popup: user joined, or legacy `arya_popup_dismissed` from older builds
 * (could be X-out without joining — those users should still see the form if they tap Join again).
 */
export function suppressWaitlistAutoPopup(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(STORAGE_JOINED) === "true") return true;
    if (localStorage.getItem(STORAGE_DISMISSED_LEGACY) === "true") return true;
  } catch {
    /* ignore */
  }
  return false;
}

/** Call after a successful Klaviyo waitlist signup (popup or inline form). */
export function markWaitlistJoinedInBrowser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_JOINED, "true");
    localStorage.setItem(STORAGE_DISMISSED_LEGACY, "true");
    localStorage.removeItem(STORAGE_SNOOZE_UNTIL);
  } catch {
    /* ignore */
  }
}

/** Keep the first email used on this device; later signups must use a different address (client-side rule). */
export function recordWaitlistPrimaryEmailIfNeeded(email: string): void {
  const norm = email.trim().toLowerCase();
  if (!norm) return;
  try {
    if (!localStorage.getItem(STORAGE_FIRST_EMAIL)) {
      localStorage.setItem(STORAGE_FIRST_EMAIL, norm);
    }
  } catch {
    /* ignore */
  }
}

export function getWaitlistFirstEmailNormalized(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_FIRST_EMAIL);
  } catch {
    return null;
  }
}

export function isSameAsFirstWaitlistEmail(candidate: string): boolean {
  const first = getWaitlistFirstEmailNormalized();
  if (!first) return false;
  return candidate.trim().toLowerCase() === first;
}

export function readWaitlistAutoOpenSnapshot(now = Date.now()): WaitlistAutoOpenSnapshot {
  if (typeof window === "undefined") {
    return {
      joined: false,
      legacyDismissed: false,
      dismissedUntil: null,
      snoozeUntil: null,
      sessionMark: null,
      now,
    };
  }
  try {
    const sessionRaw = sessionStorage.getItem(SESSION_AUTO_MARK);
    const sessionMark = sessionRaw === "shown" || sessionRaw === "dismissed" ? sessionRaw : null;
    return {
      joined: localStorage.getItem(STORAGE_JOINED) === "true",
      legacyDismissed: localStorage.getItem(STORAGE_DISMISSED_LEGACY) === "true",
      dismissedUntil: parseStoredTime(localStorage.getItem(STORAGE_DISMISSED_UNTIL)),
      snoozeUntil: parseStoredTime(localStorage.getItem(STORAGE_SNOOZE_UNTIL)),
      sessionMark,
      now,
    };
  } catch {
    return {
      joined: false,
      legacyDismissed: false,
      dismissedUntil: null,
      snoozeUntil: null,
      sessionMark: "dismissed",
      now,
    };
  }
}

/** Call when the automatic popup actually opens so a remount cannot schedule another 10s timer. */
export function markWaitlistAutoPopupShown(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SESSION_AUTO_MARK) === "dismissed") return;
    sessionStorage.setItem(SESSION_AUTO_MARK, "shown");
  } catch {
    /* ignore */
  }
}

/** X, backdrop, Escape, or "No, thank you". Does not schedule another open. */
export function dismissWaitlistPopup(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_AUTO_MARK, "dismissed");
    localStorage.setItem(STORAGE_DISMISSED_UNTIL, String(Date.now() + WAITLIST_DISMISS_FOR_MS));
    localStorage.removeItem(STORAGE_SNOOZE_UNTIL);
  } catch {
    /* ignore */
  }
}

export const waitlistLocalStorageKeys = {
  joined: STORAGE_JOINED,
  dismissedLegacy: STORAGE_DISMISSED_LEGACY,
  snoozeUntil: STORAGE_SNOOZE_UNTIL,
  dismissedUntil: STORAGE_DISMISSED_UNTIL,
} as const;

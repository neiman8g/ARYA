/** Shared with WaitlistPopup + homepage form so “already joined” is consistent. */

const STORAGE_JOINED = "arya_popup_joined";
/** Legacy: older builds wrote this on join; still treated as permanent opt-out for the timed popup. */
const STORAGE_DISMISSED_LEGACY = "arya_popup_dismissed";
const STORAGE_SNOOZE_UNTIL = "arya_popup_snooze_until";
/** First successful waitlist email on this device (lowercase); extras must differ. */
const STORAGE_FIRST_EMAIL = "arya_waitlist_first_email";

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

export const waitlistLocalStorageKeys = {
  joined: STORAGE_JOINED,
  dismissedLegacy: STORAGE_DISMISSED_LEGACY,
  snoozeUntil: STORAGE_SNOOZE_UNTIL,
} as const;

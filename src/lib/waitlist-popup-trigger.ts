/**
 * Homepage waitlist hides the inline form at max-width 1024px (`home-page.css`).
 * Popup CTAs must use the same breakpoint so tablets/phones always open the modal.
 */
export const WAITLIST_POPUP_NAV_MEDIA = "(max-width: 1024px)";

export function shouldUseWaitlistPopupNavigation(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(WAITLIST_POPUP_NAV_MEDIA).matches;
}

/**
 * Same-origin links to the home waitlist anchor (`/` + `#waitlist`).
 * Handles full URLs, trailing slashes, and query strings before the hash.
 */
export function anchorTargetsHomeWaitlist(anchor: HTMLAnchorElement): boolean {
  const raw = anchor.getAttribute("href");
  if (!raw) return false;

  const trimmed = raw.trim();
  if (/^#waitlist$/i.test(trimmed)) return true;

  if (typeof window === "undefined") return false;

  try {
    const u = new URL(trimmed, window.location.href);
    if (u.origin !== window.location.origin) return false;

    let path = u.pathname;
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (path === "") path = "/";
    if (path !== "/") return false;

    return u.hash.toLowerCase() === "#waitlist";
  } catch {
    return false;
  }
}

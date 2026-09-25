"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AryaMark } from "@/components/AryaLogo";
import { subscribeToKlaviyoWaitlist } from "@/lib/klaviyo-waitlist";
import {
  dismissWaitlistPopup,
  isSameAsFirstWaitlistEmail,
  isWaitlistAlreadyJoinedInBrowser,
  markWaitlistAutoPopupShown,
  markWaitlistJoinedInBrowser,
  readWaitlistAutoOpenSnapshot,
  recordWaitlistPrimaryEmailIfNeeded,
  waitlistAutoOpenDelayMs,
} from "@/lib/waitlist-local-storage";
import {
  anchorTargetsHomeWaitlist,
  shouldUseWaitlistPopupNavigation,
} from "@/lib/waitlist-popup-trigger";
import "./waitlist-popup.css";

type AryaTrackWindow = Window & {
  aryaTrack?: (eventName: string, params?: Record<string, string | number | boolean>) => void;
};

function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const track = (window as AryaTrackWindow).aryaTrack;
  if (typeof track === "function") track(eventName, params);
}

export function WaitlistPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  /** After joining, user can open the form again to add someone else with a different email. */
  const [addingAnotherEmail, setAddingAnotherEmail] = useState(false);
  const openTimerRef = useRef<number | null>(null);
  const openRef = useRef(open);
  const exitIntentFiredRef = useRef(false);
  /** Set synchronously so a second timer or exit-intent cannot reopen in the same visit. */
  const autoOpenClaimedRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const clearOpenTimer = () => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };

  const claimAutomaticOpen = () => {
    if (autoOpenClaimedRef.current) return false;
    if (waitlistAutoOpenDelayMs(readWaitlistAutoOpenSnapshot()) == null) return false;
    autoOpenClaimedRef.current = true;
    markWaitlistAutoPopupShown();
    clearOpenTimer();
    return true;
  };
  const claimAutomaticOpenRef = useRef(claimAutomaticOpen);
  claimAutomaticOpenRef.current = claimAutomaticOpen;

  const openPopupNow = (trigger = "manual") => {
    clearOpenTimer();
    setError("");
    setEmail("");
    setAddingAnotherEmail(false);
    try {
      if (isWaitlistAlreadyJoinedInBrowser()) {
        setSubmitted(true);
      } else {
        setSubmitted(false);
      }
    } catch {
      setSubmitted(false);
    }
    trackEvent("waitlist_popup_open", { trigger });
    setOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const delay = waitlistAutoOpenDelayMs(readWaitlistAutoOpenSnapshot());
    if (delay == null) {
      autoOpenClaimedRef.current = true;
      return;
    }

    const timerId = window.setTimeout(() => {
      if (openTimerRef.current === timerId) openTimerRef.current = null;
      if (!claimAutomaticOpenRef.current()) return;
      trackEvent("waitlist_popup_auto_open", { trigger: "timer", delay_ms: delay });
      setOpen(true);
    }, delay);
    openTimerRef.current = timerId;

    return () => {
      window.clearTimeout(timerId);
      if (openTimerRef.current === timerId) openTimerRef.current = null;
    };
  }, [mounted]);

  useEffect(() => {
    if (!submitted || !open || addingAnotherEmail) return;
    const t = window.setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => window.clearTimeout(t);
  }, [submitted, open, addingAnotherEmail]);

  // Exit-intent trigger (desktop only): when mouse leaves viewport toward top
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    // Only on desktop (no hover on mobile)
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (exitIntentFiredRef.current || openRef.current) return;
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY > 5) return;
      if (!claimAutomaticOpenRef.current()) return;
      exitIntentFiredRef.current = true;
      trackEvent("waitlist_popup_open", { trigger: "exit_intent" });
      setOpen(true);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const onDocumentClick = (event: MouseEvent) => {
      if (!shouldUseWaitlistPopupNavigation()) return;
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link || !(link instanceof HTMLAnchorElement)) return;
      if (!anchorTargetsHomeWaitlist(link)) return;

      event.preventDefault();
      openPopupNow();
    };

    const onOpenPopupEvent = () => {
      if (!shouldUseWaitlistPopupNavigation()) return;
      openPopupNow();
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("arya:open-waitlist-popup", onOpenPopupEvent);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("arya:open-waitlist-popup", onOpenPopupEvent);
    };
  }, [mounted]);

  const handleSoftDismiss = () => {
    trackEvent("waitlist_popup_dismiss", { method: "soft_dismiss" });
    autoOpenClaimedRef.current = true;
    exitIntentFiredRef.current = true;
    dismissWaitlistPopup();
    clearOpenTimer();
    setOpen(false);
  };
  const dismissRef = useRef(handleSoftDismiss);
  dismissRef.current = handleSoftDismiss;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isWaitlistAlreadyJoinedInBrowser() && !addingAnotherEmail) {
      setSubmitted(true);
      return;
    }
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (isSameAsFirstWaitlistEmail(value)) {
      setError("That is the same address you already used. Please enter a different email.");
      return;
    }

    trackEvent("waitlist_form_submit", { source: "popup", is_additional: addingAnotherEmail });
    setSubmitting(true);
    try {
      const ok = await subscribeToKlaviyoWaitlist(value);
      if (!ok) {
        trackEvent("waitlist_form_error", { source: "popup", error_type: "api_failure" });
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      trackEvent("waitlist_signup_success", { source: "popup", is_additional: addingAnotherEmail });
      recordWaitlistPrimaryEmailIfNeeded(value);
      markWaitlistJoinedInBrowser();
      setAddingAnotherEmail(false);
      setSubmitted(true);
    } catch {
      trackEvent("waitlist_form_error", { source: "popup", error_type: "exception" });
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  const content = (
    <div
      className="waitlist-popup-overlay"
      role="presentation"
      onClick={handleSoftDismiss}
    >
      <div
        className="waitlist-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="waitlist-popup-close"
          onClick={handleSoftDismiss}
          aria-label="Close"
        >
          ×
        </button>

        {!submitted ? (
          <div className="waitlist-popup-inner">
            <div className="waitlist-popup-mark">
              <AryaMark size={48} color="#8B6A3E" />
            </div>
            <h2 id="waitlist-popup-title" className="waitlist-popup-headline">
              Join the waitlist.
            </h2>
            <p className="waitlist-popup-sub">
              {addingAnotherEmail ? (
                <>
                  Add another address for a partner or family member. It must be{' '}
                  <strong>different from the first email</strong> you used on this device.
                </>
              ) : (
                <>
                  Early access to the launch collection. Founder pricing.
                  <br />
                  Launching 2027.
                  <br />
                  We&apos;ll tell you the date when we&apos;re certain of it.
                </>
              )}
            </p>
            <form className="waitlist-popup-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className="waitlist-popup-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-invalid={!!error}
                aria-describedby={error ? "waitlist-popup-err" : undefined}
              />
              {error && (
                <p id="waitlist-popup-err" className="waitlist-popup-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="waitlist-popup-submit" disabled={submitting}>
                {submitting ? "Joining…" : "Join Waitlist"}
              </button>
              <button
                type="button"
                className="waitlist-popup-decline"
                onClick={handleSoftDismiss}
              >
                No, thank you
              </button>
              <p className="waitlist-popup-fine">No spam. No noise. Just Arya.</p>
            </form>
          </div>
        ) : (
          <div className="waitlist-popup-inner waitlist-popup-thanks">
            <div className="waitlist-popup-mark">
              <AryaMark size={48} color="#8B6A3E" />
            </div>
            <h2 id="waitlist-popup-title" className="waitlist-popup-headline">
              You&apos;re in.
            </h2>
            <p className="waitlist-popup-sub">You&apos;ll hear from us before anyone else. Founder pricing and first access are yours.</p>
            <button
              type="button"
              className="waitlist-popup-add-another"
              onClick={() => {
                setError("");
                setEmail("");
                setAddingAnotherEmail(true);
                setSubmitted(false);
              }}
            >
              Add a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

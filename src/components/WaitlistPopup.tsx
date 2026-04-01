"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AryaMark } from "@/components/AryaLogo";
import { subscribeToKlaviyoWaitlist } from "@/lib/klaviyo-waitlist";
import {
  isSameAsFirstWaitlistEmail,
  isWaitlistAlreadyJoinedInBrowser,
  markWaitlistJoinedInBrowser,
  recordWaitlistPrimaryEmailIfNeeded,
  suppressWaitlistAutoPopup,
  waitlistLocalStorageKeys,
} from "@/lib/waitlist-local-storage";
import {
  anchorTargetsHomeWaitlist,
  shouldUseWaitlistPopupNavigation,
} from "@/lib/waitlist-popup-trigger";
import "./waitlist-popup.css";

const DELAY_MS = 20_000;
const SOFT_DISMISS_SNOOZE_MS = 2 * 60 * 1000;

function msUntilPopupFromStorage(): number {
  try {
    const raw = localStorage.getItem(waitlistLocalStorageKeys.snoozeUntil);
    if (!raw) return DELAY_MS;
    const until = parseInt(raw, 10);
    if (Number.isNaN(until)) return DELAY_MS;
    const left = until - Date.now();
    return left > 0 ? left : DELAY_MS;
  } catch {
    return DELAY_MS;
  }
}

function setSnoozeFromNow(ms: number) {
  try {
    localStorage.setItem(waitlistLocalStorageKeys.snoozeUntil, String(Date.now() + ms));
  } catch {
    /* ignore */
  }
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

  const clearOpenTimer = () => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };

  const schedulePopupOpen = (delayMs: number) => {
    clearOpenTimer();
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      try {
        if (suppressWaitlistAutoPopup()) return;
      } catch {
        return;
      }
      setOpen(true);
    }, delayMs);
  };

  const openPopupNow = () => {
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
    setOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    try {
      if (suppressWaitlistAutoPopup()) return;
    } catch {
      return;
    }

    schedulePopupOpen(msUntilPopupFromStorage());

    return () => {
      clearOpenTimer();
    };
  }, [mounted]);

  useEffect(() => {
    if (!submitted || !open || addingAnotherEmail) return;
    const t = window.setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => window.clearTimeout(t);
  }, [submitted, open, addingAnotherEmail]);

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
    setSnoozeFromNow(SOFT_DISMISS_SNOOZE_MS);
    setOpen(false);
    schedulePopupOpen(SOFT_DISMISS_SNOOZE_MS);
  };

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

    setSubmitting(true);
    try {
      const ok = await subscribeToKlaviyoWaitlist(value);
      if (!ok) {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      recordWaitlistPrimaryEmailIfNeeded(value);
      markWaitlistJoinedInBrowser();
      setAddingAnotherEmail(false);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  const content = (
    <div className="waitlist-popup-overlay" role="presentation">
      <div
        className="waitlist-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-popup-title"
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
              Be first. <em>Be noble.</em>
            </h2>
            <p className="waitlist-popup-sub">
              {addingAnotherEmail ? (
                <>
                  Add another address for a partner or family member. It must be{' '}
                  <strong>different from the first email</strong> you used on this device.
                </>
              ) : (
                <>
                  Join the waitlist for early access to the launch collection. First access. Pre-order
                  pricing. Fall 2026.
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
              You are on the list.
            </h2>
            <p className="waitlist-popup-sub">We will be in touch before anyone else.</p>
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

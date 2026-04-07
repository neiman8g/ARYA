"use client";

import { useState, useEffect } from "react";
import { WeavePattern } from "@/components/brand/WeavePattern";
import { subscribeToKlaviyoWaitlist } from "@/lib/klaviyo-waitlist";
import {
  isSameAsFirstWaitlistEmail,
  isWaitlistAlreadyJoinedInBrowser,
  markWaitlistJoinedInBrowser,
  recordWaitlistPrimaryEmailIfNeeded,
} from "@/lib/waitlist-local-storage";
import { shouldUseWaitlistPopupNavigation } from "@/lib/waitlist-popup-trigger";

/** GA4 event helper — fires aryaTrack if available */
function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = typeof window !== "undefined" ? (window as any) : null;
  if (w && typeof w.aryaTrack === "function") w.aryaTrack(eventName, params);
}

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [allowAnotherWaitlist, setAllowAnotherWaitlist] = useState(false);

  // Restored visit / refresh: if they already joined, show thank-you
  useEffect(() => {
    try {
      if (isWaitlistAlreadyJoinedInBrowser()) {
        setSubmitted(true);
        setAllowAnotherWaitlist(false);
      }
    } catch { /* ignore */ }
  }, []);

  const openWaitlistPopupMobile = () => {
    if (typeof window === "undefined") return;
    if (!shouldUseWaitlistPopupNavigation()) return;
    window.dispatchEvent(new Event("arya:open-waitlist-popup"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && shouldUseWaitlistPopupNavigation()) {
      window.dispatchEvent(new Event("arya:open-waitlist-popup"));
      return;
    }
    trackEvent("waitlist_form_submit", { source: "inline" });
    setSubmitting(true);
    setError("");
    setEmailInputError("");

    const emailValue = email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!validEmail) {
      trackEvent("waitlist_form_error", { source: "inline", error_type: "invalid_email" });
      setEmailInputError("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    if (isSameAsFirstWaitlistEmail(emailValue)) {
      trackEvent("waitlist_form_error", { source: "inline", error_type: "duplicate_email" });
      setEmailInputError("That is the same address you already used. Please enter a different email.");
      setSubmitting(false);
      return;
    }

    try {
      const ok = await subscribeToKlaviyoWaitlist(emailValue);
      if (ok) {
        trackEvent("waitlist_signup_success", { source: "inline" });
        recordWaitlistPrimaryEmailIfNeeded(emailValue);
        markWaitlistJoinedInBrowser();
        setAllowAnotherWaitlist(false);
        setSubmitted(true);
        setEmail("");
      } else {
        trackEvent("waitlist_form_error", { source: "inline", error_type: "api_failure" });
        setError("Something went wrong. Please try again.");
      }
    } catch {
      trackEvent("waitlist_form_error", { source: "inline", error_type: "exception" });
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="waitlist fade-section" id="waitlist">
      <WeavePattern id="wl-p" opacity={0.05} color="#8B6A3E" />
      <div className="wl-inner">
        <div className="label" style={{ justifyContent: "center" }}>Early Access</div>
        <h2 className="display" style={{ marginBottom: 16, fontSize: "clamp(42px,5vw,68px)" }}>Be first.<br /><em>Be noble.</em></h2>
        <p className="wl-sub">Join the Arya waitlist for early access to the launch collection, founder pricing, and exclusive updates before anyone else. Men&apos;s and women&apos;s dropping together.<br /><span className="wl-launch">Launching Fall 2026. Founder access is limited.</span></p>
        {submitted && !allowAnotherWaitlist ? (
          <>
            <div className="wl-success"><p>You&apos;re in. Founder pricing and first access are yours. We&apos;ll be in touch before anyone else.</p></div>
            <button
              type="button"
              className="wl-add-another-email"
              onClick={() => { setAllowAnotherWaitlist(true); setSubmitted(false); setEmail(""); setEmailInputError(""); setError(""); }}
            >
              Add a different email
            </button>
          </>
        ) : (
          <>
            {error && <p className="wl-error">{error}</p>}
            <p className="wl-priority">
              {allowAnotherWaitlist
                ? "Use a different address than the first one you used on this device."
                : "Waitlist members get founder pricing and first access before the public."}
            </p>
            <button type="button" className="wl-mobile-popup-btn" onClick={openWaitlistPopupMobile}>Join Waitlist</button>
            <form className="wl-form" onSubmit={handleSubmit}>
              <label htmlFor="waitlist-email" className="sr-only">Your email address</label>
              <input
                id="waitlist-email"
                type="email"
                className="wl-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailInputError) setEmailInputError(""); }}
                required
              />
              {emailInputError && <p className="wl-input-error" role="alert">{emailInputError}</p>}
              <button type="submit" className="wl-submit" disabled={submitting}>
                {submitting ? "Joining…" : "Join Waitlist"}
              </button>
            </form>
          </>
        )}
        <p className="wl-note">No spam. No noise. Just Arya.</p>
      </div>
    </section>
  );
}

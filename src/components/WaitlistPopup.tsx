"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AryaMark } from "@/components/AryaLogo";
import "./waitlist-popup.css";

const STORAGE_KEY = "arya_popup_dismissed";
const DELAY_MS = 20_000;
const KLAVIYO_LIST_ID = "YxmBfA";
const KLAVIYO_COMPANY_ID = "RkkP9u";

function dismissForever() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* ignore quota / private mode */
  }
}

function submitToKlaviyo(email: string) {
  try {
    const w = window as Window & {
      klaviyo?: { push: (args: unknown[]) => unknown };
    };
    w.klaviyo?.push?.([
      "subscribe",
      {
        email,
        list_id: KLAVIYO_LIST_ID,
      },
    ]);
  } catch {
    /* queue may not support subscribe shape; client API still runs */
  }
}

async function subscribeViaClientApi(email: string) {
  const response = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        revision: "2023-12-15",
      },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: { email },
              },
            },
          },
          relationships: {
            list: {
              data: { type: "list", id: KLAVIYO_LIST_ID },
            },
          },
        },
      }),
    }
  );
  return response.ok || response.status === 202;
}

export function WaitlistPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    let cancelled = false;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      return;
    }

    const t = window.setTimeout(() => {
      if (!cancelled) setOpen(true);
    }, DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [mounted]);

  useEffect(() => {
    if (!submitted || !open) return;
    const t = window.setTimeout(() => {
      setOpen(false);
    }, 3000);
    return () => window.clearTimeout(t);
  }, [submitted, open]);

  const handleClose = () => {
    dismissForever();
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      submitToKlaviyo(value);
      const ok = await subscribeViaClientApi(value);
      if (!ok) {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      dismissForever();
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
          onClick={handleClose}
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
              Join the waitlist for early access to the launch collection. First access. Pre-order
              pricing. Fall 2026.
            </p>
            <form className="waitlist-popup-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className="waitlist-popup-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

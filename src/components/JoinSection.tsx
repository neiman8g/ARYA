"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { subscribeToKlaviyoWaitlist } from "@/lib/klaviyo-waitlist";

type Status = "idle" | "sending" | "done" | "invalid" | "error";

declare global {
  interface Window {
    aryaTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function JoinSection({ source = "page" }: { source?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const ok = await subscribeToKlaviyoWaitlist(email);
    setStatus(ok ? "done" : "error");
    if (ok) window.aryaTrack?.("join_waitlist", { source });
  }

  return (
    <section className="join-room" id="join" aria-labelledby={`${id}-h`}>
      <div className="wrap split">
        <div className="stack">
          <Image className="join-tag" src="/brand/arya-tagline-light.png" alt="ARYA, Noble by nature." width={280} height={103} />
          <h2 className="h-1" id={`${id}-h`}>The founding list.</h2>
          <p className="body">
            First access in 2027. We&apos;ll tell you the date when we&apos;re certain of it, and write only when there&apos;s
            something worth saying.
          </p>
        </div>
        <div className="stack" style={{ gap: 16 }}>
          {status === "done" ? (
            <p className="note" role="status">You&apos;re on the list. We&apos;ll be in touch before anyone else.</p>
          ) : (
            <form className="join" onSubmit={onSubmit} noValidate>
              <label className="caps" htmlFor={`${id}-email`}>
                Email
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <button className="btn light" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Joining" : "Join"}
              </button>
            </form>
          )}
          {status === "invalid" && <p className="note" role="alert">Enter a full email address, like you@example.com.</p>}
          {status === "error" && (
            <p className="note" role="alert">That didn&apos;t go through. Try again, or write to hello@arya.clothing.</p>
          )}
        </div>
      </div>
    </section>
  );
}

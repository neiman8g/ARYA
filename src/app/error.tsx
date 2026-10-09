"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    window.aryaTrack?.("page_error", { error_message: error.message, error_digest: error.digest });
  }, [error]);

  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 24 }}>
        <h1 className="h-1"><span className="kicker">Something went wrong</span>This page didn&apos;t load.</h1>
        <p className="body">Try again. If it keeps happening, write to hello@arya.clothing and tell us which page.</p>
        <div className="actions">
          <button className="btn solid" type="button" onClick={reset}>Try again</button>
          <Link className="btn" href="/">Home</Link>
        </div>
      </div>
    </section>
  );
}

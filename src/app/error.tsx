"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to analytics if aryaTrack is available
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any; // aryaTrack is injected by GA4 script in layout
      if (typeof w.aryaTrack === "function") {
        w.aryaTrack("page_error", {
          error_message: error.message,
          error_digest: error.digest,
        });
      }
    } catch {
      // Analytics not available
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[11px] font-medium tracking-[.4em] uppercase text-cognac mb-5 font-sans">
        Something went wrong
      </span>
      <h1 className="font-display text-[clamp(36px,5vw,56px)] font-light leading-[1.1] text-ink mb-4">
        We hit a snag
      </h1>
      <p className="text-ink-80 text-[17px] leading-relaxed max-w-[44ch] mb-8 font-sans">
        Something unexpected happened. Please try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-ink text-sand text-[11px] font-medium tracking-[.26em] uppercase cursor-pointer border-none hover:bg-cognac transition-colors duration-200 font-sans"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-sand-4 text-ink text-[11px] font-medium tracking-[.26em] uppercase no-underline hover:border-cognac transition-colors duration-200 font-sans"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

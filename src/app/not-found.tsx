import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[11px] font-medium tracking-[.4em] uppercase text-cognac mb-5 font-sans">
        404
      </span>
      <h1 className="font-display text-[clamp(36px,5vw,56px)] font-light leading-[1.1] text-ink mb-4">
        Page not found
      </h1>
      <p className="text-ink-80 text-[17px] leading-relaxed max-w-[44ch] mb-8 font-sans">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-ink text-sand text-[11px] font-medium tracking-[.26em] uppercase no-underline hover:bg-cognac transition-colors duration-200 font-sans"
        >
          Back to Home
        </Link>
        <Link
          href="/collection"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-sand-4 text-ink text-[11px] font-medium tracking-[.26em] uppercase no-underline hover:border-cognac transition-colors duration-200 font-sans"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  );
}

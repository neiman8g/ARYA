"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProduct } from "@/lib/products";

const NAV = [
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/arya-standard", label: "The Standard" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function activeSection(pathname: string) {
  if (pathname.startsWith("/products/")) {
    const p = getProduct(pathname.split("/")[2] ?? "");
    return p ? (p.line === "Women" ? "/women" : "/men") : "";
  }
  return NAV.find((n) => pathname.startsWith(n.href))?.href ?? "";
}

export function SiteHeader() {
  const current = activeSection(usePathname() ?? "/");
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="nav-mark" href="/" aria-label="ARYA home">
          <Image src="/brand/arya-wordmark.png" alt="ARYA" width={109} height={22} priority />
        </Link>
        <nav className="nav-links caps" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="link" href="#join">
          Join the list
        </Link>
      </div>
    </header>
  );
}

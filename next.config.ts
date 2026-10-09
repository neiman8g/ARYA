import type { NextConfig } from "next";

const r = (source: string, destination: string) => ({ source, destination, permanent: true });

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Retired and merged pages. Permanent redirects keep old links and search history.
  async redirects() {
    return [
      r("/sustainability", "/arya-standard"),
      r("/skin-conscious", "/arya-standard"),
      r("/collection", "/women"),
      r("/story", "/about"),
      r("/mission", "/about"),
      r("/founder", "/about"),
      r("/fit", "/faq"),
      r("/fit-guide", "/faq"),
      r("/blog/sustainable-activewear-worth-the-investment", "/blog"),
      r("/blog/persian-craft-philosophy", "/about"),
      r("/blog/what-is-nobleflex", "/arya-standard"),
      r("/blog/activewear-for-athletic-bodies", "/blog"),
      r("/blog/why-conventional-athleisure-fails-athletic-bodies", "/blog"),
      r("/products/noble-short", "/products/noble-short-men"),
      r("/products/noble-pant", "/products/noble-jogger"),
      r("/products/noble-long-crop", "/women"),
    ];
  },
};

export default nextConfig;

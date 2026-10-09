import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Retired pages (Decision Log v2.2, 1.5 and 1.7). Permanent redirects keep inbound links and SEO.
  async redirects() {
    return [
      { source: "/sustainability", destination: "/arya-standard", permanent: true },
      { source: "/blog/sustainable-activewear-worth-the-investment", destination: "/blog", permanent: true },
      { source: "/blog/persian-craft-philosophy", destination: "/story", permanent: true },
    ];
  },
};

export default nextConfig;

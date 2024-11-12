import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "preview-cdn.tadle.com",
      },
      {
        protocol: "https",
        hostname: "cdn.tadle.com",
      },
      {
        protocol: "https",
        hostname: "explorer-api.walletconnect.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: '"cdn-tadle.aggregation.top',
      },
    ],
  },
};

export default nextConfig;

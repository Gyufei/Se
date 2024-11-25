import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tadle.com",
      },
    ],
  },
  // webpack: (config: { externals: string[] }) => {
  //   config.externals.push("pino-pretty", "lokijs", "encoding");
  //   return config;
  // },
};

export default nextConfig;

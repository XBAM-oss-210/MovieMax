import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/watch/:path*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "frame-src",
                            "https://fluxora.sbs",
                            "https://cinesrc.st",
                            "https://vidsrc.to",
                            "https://vidzy.org",
                        ].join(" "),
                    },
                ],
            },
        ];
    },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "image.tmdb.org",
            pathname: "/t/p/**",
        },
    ],
    },
};

export default nextConfig;

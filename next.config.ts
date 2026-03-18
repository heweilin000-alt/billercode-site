import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      // Security headers for all routes
      { source: "/(.*)", headers: securityHeaders },
      // Aggressive caching for static assets (fonts, images, CSS, JS)
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache ads.txt for 30 days
      {
        source: "/ads.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;

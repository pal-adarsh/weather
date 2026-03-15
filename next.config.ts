import type { NextConfig } from "next";

/**
 * Security Headers — applied to every response.
 * References: https://nextjs.org/docs/app/api-reference/next-config-js/headers
 *             https://owasp.org/www-project-secure-headers/
 */
const securityHeaders = [
  // ── Prevent clickjacking ──────────────────────────────────────────────────
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // ── Block MIME-type sniffing ──────────────────────────────────────────────
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // ── Referrer policy ───────────────────────────────────────────────────────
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ── Restrict browser APIs (geolocation asked by the app itself) ───────────
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // ── Force HTTPS (1 year, include sub-domains) ─────────────────────────────
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // ── XSS Protection (legacy browsers) ─────────────────────────────────────
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // ── DNS Prefetch Control ──────────────────────────────────────────────────
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // ── Content Security Policy ───────────────────────────────────────────────
  // Allows:
  //   • self for scripts/styles
  //   • Google Fonts (styles + fonts)
  //   • OpenWeatherMap API (connect)
  //   • FontAwesome CDN (no longer used in layout, but kept as fallback)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: Next.js inline scripts need 'unsafe-inline' in dev;
      // in production, Next.js uses nonces — we keep unsafe-eval for
      // framer-motion's dynamic styles
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: Google Fonts CDN + inline styles used by Tailwind/framer-motion
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts static CDN
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + OpenWeatherMap icon CDN + data URIs
      "img-src 'self' https://openweathermap.org https://*.openweathermap.org data: blob:",
      // API calls: OpenWeatherMap REST endpoints
      "connect-src 'self' https://api.openweathermap.org",
      // No frames or objects from external sources
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // Block mixed content
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Apply security headers globally
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Compress responses
  compress: true,

  // Prevent leaking Next.js version
  poweredByHeader: false,

  // Strict mode catches subtle React bugs early
  reactStrictMode: true,

  // Image domains allowed (for openweathermap icons if used as <Image>)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "*.openweathermap.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

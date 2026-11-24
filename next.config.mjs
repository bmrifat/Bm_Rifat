import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@formatjs/intl-localematcher",
    "@formatjs/icu-messageformat-parser",
    "@formatjs/fast-memoize",
    "@formatjs/ecma402-abstract",
    "@formatjs/icu-skeleton-parser",
  ],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/ventures/shasthosathi",
        destination: "/:locale/ventures/sasthosathi",
        permanent: true,
      },
      {
        source: "/ventures/shasthosathi",
        destination: "/ventures/sasthosathi",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [];
  },
};

export default withNextIntl(nextConfig);

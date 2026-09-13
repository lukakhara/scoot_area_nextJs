// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts"); // ← must match your actual path exactly

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/us6agyt1/**", // scope to your cloud name for safety
      },
    ],
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Strapi (dev)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Add https variant for cases where Strapi is behind HTTPS or deployed
      {
        protocol: "https",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // If you later move assets to a CDN or Cloudinary, add it here:
      // { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }
    ],
  },
};

export default nextConfig;

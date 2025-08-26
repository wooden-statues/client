import type { NextConfig } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const { protocol, hostname, port } = new URL(STRAPI_URL);

const remotePattern: { protocol: string; hostname: string; port?: string; pathname: string } = {
  protocol: protocol.replace(":", ""),
  hostname,
  pathname: "/uploads/**",
};
if (port) remotePattern.port = port;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [remotePattern],
  },
};

export default nextConfig;

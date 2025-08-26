import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const { protocol, hostname, port } = new URL(STRAPI_URL);

const remotePattern: RemotePattern = {
  protocol: protocol.replace(":", "") as "http" | "https",
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

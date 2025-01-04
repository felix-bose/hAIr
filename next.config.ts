import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    // unsplash for demos, open ai image server storage
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
    ],
  },
}

export default nextConfig

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    domains: ["images.unsplash.com"],
  },
}

export default nextConfig

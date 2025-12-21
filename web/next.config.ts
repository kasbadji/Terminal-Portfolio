import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional: Add API proxy to avoid CORS issues
  // This allows your frontend to call /api/* which will be proxied to Railway
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Only enable proxy if API URL is set (production/preview)
    if (apiUrl && apiUrl !== "http://localhost:4000") {
      return [
        {
          source: "/api/:path*",
          destination: `${apiUrl}/:path*`,
        },
      ];
    }

    return [];
  },
};

export default nextConfig;

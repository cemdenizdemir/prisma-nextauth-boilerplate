import type { NextConfig } from "next";
import { security } from "@/headers/security";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: security,
      },
    ];
  },
  poweredByHeader: false, // disables X-Powered-By: Next.js
};

export default nextConfig;

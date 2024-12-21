import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/data/:path*',
        destination: 'https://be-storm-data.vercel.app/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;

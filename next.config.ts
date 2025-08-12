import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   serverActions: {
    bodySizeLimit: '10mb', // Increase the limit to 10MB
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
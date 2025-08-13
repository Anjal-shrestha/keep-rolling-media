/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // 🚀 Added to avoid high memory usage during Vercel build
  typescript: { ignoreBuildErrors: true }, // typecheck separately from build
  eslint: { ignoreDuringBuilds: true },    // lint separately from build
  staticPageGenerationTimeout: 120,        // give more time to slower routes
};

export default nextConfig;

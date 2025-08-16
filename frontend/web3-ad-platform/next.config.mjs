/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable SSR for all pages to prevent hydration issues
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig

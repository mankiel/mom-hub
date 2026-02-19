/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Turbopack is enabled by default in Next.js 16
  // Empty config acknowledges we're using default Turbopack settings
  turbopack: {},
}

export default nextConfig

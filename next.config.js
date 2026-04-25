/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This tells Vercel to ignore errors and build anyway
    ignoreBuildErrors: true,
  },
  eslint: {
    // This also tells it to ignore stylistic errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

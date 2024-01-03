/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pclpocidjkyktogpmouc.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig

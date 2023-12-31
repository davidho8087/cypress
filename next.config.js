/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nnejgcanroqijzcjtfme.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig

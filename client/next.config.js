/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        port: '',
        pathname: '/covers/**',
      },
    ],
  },
}

module.exports = nextConfig

const { withPlaiceholder } = require('@plaiceholder/next')
const path = require("path")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src','styles')],
  },
})

module.exports = nextConfig

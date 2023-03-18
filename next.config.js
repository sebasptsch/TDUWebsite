const { withPlaiceholder } = require('@plaiceholder/next')
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src','styles')],
  },
})

module.exports = nextConfig

const { withPlaiceholder } = require('@plaiceholder/next')

/** @type {import('next').NextConfig} */
const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src','styles')],
  },
})

module.exports = nextConfig

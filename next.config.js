const { withKeystone } = require("@keystone-next/keystone/next");
const { withPlaiceholder } = require("@plaiceholder/next");
module.exports = withKeystone(
  withPlaiceholder({
    images: {
      domains: ["i.ytimg.com"],
    },
  })
);

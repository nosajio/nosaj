const { Parcel } = require("@parcel/core");
const pkg = require("../package.json");

const bundler = new Parcel({
  targets: pkg.targets,
  defaultConfig: '@parcel/config-default',
});

module.exports = { bundler };

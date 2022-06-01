const { bundler } = require("./bundle");

bundler.run().then(console.log).catch(console.error);

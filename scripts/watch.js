const { bundler } = require("./bundle");

const watcher = bundler.watch(handler).catch(console.error);

function handler(err, event) {
  if (err) {
    throw err;
  }

  if (event.type === "buildSuccess") {
    let bundles = event.bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
  } else if (event.type === "buildFailure") {
    console.log(event.diagnostics);
  }
}

watcher.unsubscribe().catch(console.error);
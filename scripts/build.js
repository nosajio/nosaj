const esbuild = require("esbuild");
const nativeNodeModulesPlugin = require("./esbuildAddonLoader");

build();

function catchBuildError(err) {
  console.error(err);
  process.exit(1);
}

function build() {
  const outdir = "dist";
  require("./copyPublic")();

  // Build the TS and TSX files
  esbuild
    .build({
      entryPoints: ["src/index.ts"],
      bundle: true,
      platform: "node",
      plugins: [nativeNodeModulesPlugin],
      outdir,
    })
    .catch(catchBuildError);
}

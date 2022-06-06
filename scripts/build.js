const esbuild = require("esbuild");
const nativeNodeModulesPlugin = require("./esbuildAddonLoader");
const { sassPlugin } = require("esbuild-sass-plugin");

const outdir = "dist";

build();

function catchBuildError(err) {
  console.error(err);
  process.exit(1);
}

function build() {
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

  // Build the postcss files
  esbuild
    .build({
      entryPoints: ["src/css/index.scss"],
      bundle: true,
      plugins: [sassPlugin()],
      outdir,
    })
    .catch(catchBuildError);
}

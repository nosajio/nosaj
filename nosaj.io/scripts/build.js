const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const rimraf = require('rimraf');
const copyPublicDir = require('./copyPublic');

const distPath = path.resolve(__dirname, '..', 'dist');
const srcPath = path.resolve(__dirname, '..', 'src');
const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;

rimraf.sync(distPath);

copyPublicDir().then(() => {
  console.log('Copied public files...');
  build();
});

function build() {
  const webpackCb = (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors...');
      info.errors.forEach(e => console.error(e));
      process.exit(1);
    } else {
      console.log('Finished running webpack...');
    }
  };

  webpack(
    {
      entry: path.join(srcPath, 'index.ts'),
      mode: isProduction ? 'production' : 'development',
      target: 'node',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(s?)css$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  esModule: true,
                  modules: {
                    namedExport: true,
                  },
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.([jt]sx?)?$/,
            use: { loader: 'swc-loader' },
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      },
      output: {
        filename: 'index.js',
        path: distPath,
      },
      plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
        new MiniCssExtractPlugin({
          insert: function (linkTag) {
            console.log(linkTag);
          },
        }),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'public/styles',
              type: 'css/mini-extract',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
    },
    webpackCb,
  );
}

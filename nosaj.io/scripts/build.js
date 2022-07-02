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
      // process.exit(1);
      return;
    }
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors...');
      info.errors.forEach(e => console.error(e));
      // process.exit(1);
    } else {
      console.log('Finished running webpack...');
    }
  };

  webpack(
    {
      watch: isDev,
      entry: path.join(srcPath, 'index.ts'),
      mode: isProduction ? 'production' : 'development',
      target: 'node',
      // devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                },
              },
              // { loader: 'resolve-url-loader' },
              {
                loader: 'sass-loader',
                options: { sourceMap: true },
              },
            ],
          },
          {
            test: /\.([jt]s?)?$/,
            use: { loader: 'swc-loader' },
            exclude: /node_modules/,
          },
          // {
          //   test: /\.(woff2?|ttf|otf|eot|svg)$/,
          //   exclude: /node_modules/,
          //   loader: 'file-loader',
          //   options: {
          //     outputPath: 'public',
          //     publicPath: '/',
          //     name: '[hash].[ext]',
          //   },
          // },
        ],
      },
      resolve: {
        extensions: ['.js', '.ts', '.css'],
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

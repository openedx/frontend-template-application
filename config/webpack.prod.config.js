// This is the prod Webpack config. All settings here should prefer smaller,
// optimized bundles at the expense of a longer build time.
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = Merge.smart(commonConfig, {
  devtool: 'source-map',
  output: {
    filename: '[name].min.js', // adds ".min" to filename since we are using UglifyJS
  },
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      // The babel-loader transforms newer ES2015+ syntax to older ES5 for older browsers.
      // Babel is configured with the .babelrc file at the root of the project.
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /(.scss|.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
              minimize: true,
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true,
              includePaths: [
                path.join(__dirname, '../node_modules'),
                path.join(__dirname, '../src'),
              ],
            },
          },
        ],
      },
      // Webpack, by default, includes all CSS in the javascript bundles. Unfortunately, that means:
      // a) The CSS won't be cached by browsers separately (a javascript change will force CSS
      // re-download).  b) Since CSS is applied asyncronously, it causes an ugly
      // flash-of-unstyled-content.
      //
      // To avoid these problems, we extract the CSS from the bundles into separate CSS files that
      // can be included as <link> tags in the HTML <head> manually.
      //
      // We will not do this in development because it prevents hot-reloading from working and it
      // increases build time.

      // I've commented all of this out because ExtractTextPlugin seems to be completely incompatible with Webpack 4
      // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
      // I'm switching over to MiniCssExtractPlugin 🤞

      // {
      //   test: /(.scss|.css)$/,
      //   use: ExtractTextPlugin.extract({
      //     // creates style nodes from JS strings, only used if extracting fails
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader', // translates CSS into CommonJS
      //         options: {
      //           sourceMap: true,
      //           minimize: true,
      //         },
      //       },
      //       {
      //         loader: 'sass-loader', // compiles Sass to CSS
      //         options: {
      //           sourceMap: true,
      //           includePaths: [
      //             path.join(__dirname, '../node_modules'),
      //             path.join(__dirname, '../src'),
      //           ],
      //         },
      //       },
      //     ],
      //   }),
      // },
      // Webpack, by default, uses the url-loader for images and fonts that are required/included by
      // files it processes, which just base64 encodes them and inlines them in the javascript
      // bundles. This makes the javascript bundles ginormous and defeats caching so we will use the
      // file-loader instead to copy the files directly to the output directory.
      {
        test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
    ],
  },
  // Specify additional processing or side-effects done on the Webpack output bundles as a whole.
  plugins: [
    // CommonsChunkPlugin creates separate files with common modules shared between multiple entry
    // points.
    //
    // This extracts all modules from node_modules to a common bundle called "vendor". It can be
    // cached by users' browsers long-term and will only change if we upgrade a package.
    // This should be replaced by splitChunks in Webpack 4
    // Error: webpack.optimize.CommonsChunkPlugin has been removed,
    // please use config.optimization.splitChunks instead.

    // Writes the extracted CSS from each entry to a file in the output directory.
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      allChunks: true,
    }),
    // Defines a global variable that all bundles can access.
    new webpack.DefinePlugin({
      'process.env': {
        // Maps the env var NODE_ENV at compile time to a global var available to bundles at
        // runtime.  Should be set to "production" so that JS code knows it is running in a
        // production environment.
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
});

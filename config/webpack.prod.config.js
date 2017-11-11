const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge.smart(commonConfig, {
  devtool: 'source-map',
  output: {
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/@edx/paragon'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /(.scss|.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                minimize: true,
                localIdentName: '[name]__[local]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                data: '@import "bootstrap/scss/bootstrap-reboot";',
                includePaths: [
                  path.join(__dirname, '../node_modules'),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  ],
});

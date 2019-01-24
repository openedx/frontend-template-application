/* I'm here to allow autoprefixing in webpack.prod.config.js */
module.exports = {
  plugins: [
    require('autoprefixer')({ grid: true, browsers: ['>1%'] }),
  ],
};
  
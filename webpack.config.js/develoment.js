const { merge } = require('webpack-merge');
const pageCommon = require('./pageCommon');

module.exports = merge(pageCommon, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});

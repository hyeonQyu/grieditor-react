const { merge } = require('webpack-merge');
const pageCommon = require('./pageCommon');

module.exports = merge(pageCommon, {
  mode: 'production',
  devtool: 'hidden-source-map',
});

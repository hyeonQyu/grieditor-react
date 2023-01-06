const path = require('path');
const { merge } = require('webpack-merge');
const common = require('../common');

module.exports = merge(common, {
  mode: 'production',
  entry: '/src/lib/index.ts',
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'index.js',
  },
  devtool: 'hidden-source-map',
});

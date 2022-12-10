const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
  entry: '/src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist/page'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});

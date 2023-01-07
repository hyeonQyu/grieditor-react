const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const getSrcPath = (subPath) => {
  return path.resolve(__dirname, `../src/${subPath}`);
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': getSrcPath('lib/components'),
      '@defines': getSrcPath('lib/defines'),
      '@hooks': getSrcPath('lib/hooks'),
      '@utils': getSrcPath('lib/utils'),
      '@icons': getSrcPath('lib/icons'),
      '@pages': getSrcPath('pages'),
      '@styles': getSrcPath('styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new TsconfigPathsPlugin(),
  ],
};

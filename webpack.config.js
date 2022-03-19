const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'app.js',
    libraryTarget: 'this',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new WebpackObfuscator(
      {
        compact: true,
        target: 'node',
      },
      ['views/**'],
    ),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'views'),
          to: path.resolve(__dirname, 'out', 'views'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: [nodeExternals()],
};

const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './app.ts',
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
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: [nodeExternals()],
};

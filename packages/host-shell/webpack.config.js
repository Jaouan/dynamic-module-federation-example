const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const remotesId = ["mfe-1"];

const dynamicResolve = (remoteId) => `promise import(window.resolveRemote('${remoteId}'))`;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './main',
  mode: 'production',
  target: 'web',
  devtool: 'eval-source-map',
  optimization: { minimize: true },
  performance: { hints: false },
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'webpackHost',
      filename: 'remoteEntry.js',
      remotes: Object.fromEntries(remotesId.map(remoteId => [remoteId, dynamicResolve(remoteId)]))
    }),
  ],
};
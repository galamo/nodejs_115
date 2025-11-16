// store/config/webpack.prod.js

const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/store/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'store',
      filename: 'remoteEntry.js',
      exposes: {
        './StoreApp': './src/bootstrap',
      },
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig);

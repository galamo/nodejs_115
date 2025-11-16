// host/config/webpack.prod.js

const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/host/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        cart: `cart@${domain}/cart/latest/remoteEntry.js`,
        store: `store@${domain}/store/latest/remoteEntry.js`,
      },
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig);

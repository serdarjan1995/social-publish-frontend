const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
require('dotenv').config();

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_NAME;
      return args;
    });
  },
};

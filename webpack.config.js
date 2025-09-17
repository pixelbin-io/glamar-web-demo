const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

module.exports = {
  mode: "development",

  // No JS entry points – we’re not bundling any JS
  entry: {},

  output: {
    // just produce a clean dist folder; no JS filename needed
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  // Serve your files over HTTPS with your cert
  devServer: {
    static: { directory: __dirname }, // serve your project root (index.html)
    host: "local.sdk.glamar.io",
    port: 9090,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    server: {
      type: "https",
      options: {
        key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
      },
    },
    open: true,
    historyApiFallback: true,
    hot: false, // no HMR needed since we’re not bundling
  },

  // Emit index.html into dist on build (unchanged, no scripts injected)
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: false, // don't inject any <script> tags (we have none)
      minify: false,
    }),
  ],
};

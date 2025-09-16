// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "public"),
    host: "local.pixelbinz0.de",
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
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};

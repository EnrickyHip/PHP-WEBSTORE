/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./frontend/src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public", "assets", "js"),
  },
  devtool: "source-map",
};

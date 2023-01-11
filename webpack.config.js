/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    header: "./frontend/src/scripts/header",
    buyerRegister: "./frontend/src/scripts/buyerRegister",
    companyRegister: "./frontend/src/scripts/companyRegister",
    personSellerRegister: "./frontend/src/scripts/personSellerRegister",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public", "assets", "js"),
  },
  devtool: "source-map",
};

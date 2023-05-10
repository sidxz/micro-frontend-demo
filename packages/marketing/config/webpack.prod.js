const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    // This is the name of the file that will be generated.
    // The [contenthash] part is a placeholder for a hash that is generated
    // based on the content of the file.
    // This is used to bust the cache when the file changes.
    filename: "[name].[contenthash].js",
    // This is the path to the build folder of the container.
    // path: path.resolve(__dirname, "./build"),
    publicPath: "/marketing/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack")
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
  entry: {
    app: "./public/js/index.js",    
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget",
      description: "An app that allows you to track your budget offline.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("public/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],  
  mode: "development"
};
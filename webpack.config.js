const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: "/3D-portfolio/", // 👈 Ensures all assets load from /3D-portfolio/
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource", // 👈 Uses Webpack 5 built-in asset handling
          generator: {
            filename: "assets/[name][ext]", // 👈 Ensures assets are placed in dist/assets/
            publicPath: "/3D-portfolio/assets/", // 👈 Corrects the path for GitHub Pages
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            chunks: ['main'],
          }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
      open: true,
    },
    devtool: 'source-map',
};

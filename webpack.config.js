const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry point
  entry: './src/main.js',

  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  // Development mode
  mode: 'production', // Set to 'production' for final build, 'development' for local server

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS in production
          'css-loader',
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]', // Output images in the 'images' folder
        },
      },
      {
        test: /\.(mp4|webm)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext][query]', // Output videos in the 'videos' folder
        },
      },
      {
        test: /\.glb$/i,
        type: 'asset/resource',
        generator: {
          filename: 'models/[name][ext][query]', // Output models in the 'models' folder
        },
      },
      // Handle .hdr files
      {
        test: /\.hdr$/i,
        type: 'asset/resource',
        generator: {
          filename: 'textures/[name][ext][query]', // Output HDRI files in the 'textures' folder
        },
      },
    ],
  },

  // Plugins to handle HTML injection and asset copying
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(), // Clean up the dist folder before each build
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS file name
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'public/images' }, // Ensure these paths match what you need in the build
        { from: 'public/models', to: 'public/models' },
        { from: 'public/videos', to: 'public/videos' },
        { from: 'public/textures', to: 'public/textures' }, // Add this for HDRI files
      ],
    }),
  ],

  // Dev server for local development
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve from 'public' during development
    },
    open: true,
    hot: true,
    port: 3000,
  },
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Entry point: Where Webpack will start bundling
  entry: './src/main.js', // Change if your entry point is different

  // Output: Where the bundled files will go
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the dist folder before each build
  },

  // Development mode: For building the app in development
  mode: 'development',

  // Set up the development server for live reloading
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Correct path to serve from 'public' folder
    },
    open: true, // Open browser automatically
    hot: true,  // Enable hot module replacement
    port: 3000, // Default port for the dev server
  },

  // Loaders for different file types
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
        use: ['style-loader', 'css-loader'], // Ensures that the CSS will be injected into the DOM
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Uses Webpack 5's new asset modules instead of file-loader
        generator: {
          filename: 'images/[name][ext][query]', // Output image files in the 'images' folder
        },
      },
      {
        test: /\.(mp4|webm)$/i,
        type: 'asset/resource', // Handles video files similarly
        generator: {
          filename: 'videos/[name][ext][query]', // Output video files in the 'videos' folder
        },
      },
    ],
  },

  // Plugins to modify the build process
  plugins: [
    // Automatically inject the script into index.html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    // Clean the dist folder before each build
    new CleanWebpackPlugin(),
  ],
};

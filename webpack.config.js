const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); // Gzip Compression
const BrotliPlugin = require('brotli-webpack-plugin'); // Brotli Compression
const PurgeCSSPlugin = require('purgecss-webpack-plugin'); // Correct import
const glob = require('glob'); // Ensure glob is imported for path handling
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); // Image optimization

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Added contenthash for better caching
    publicPath: "/3D-portfolio/", // Ensures correct asset path
    chunkFilename: '[name].[contenthash].js', // Added contenthash for dynamic chunks
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
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
              publicPath: '/assets',
            },
          },
          {
            loader: 'image-minimizer-webpack-plugin',
            options: {
              minimizerOptions: {
                plugins: [
                  ['imagemin-mozjpeg', { quality: 65 }],
                  ['imagemin-optipng', { optimizationLevel: 5 }],
                  ['imagemin-pngquant', { quality: [0.65, 0.9], speed: 4 }],
                  ['imagemin-webp', { quality: 75 }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // Split chunks larger than 20KB
      maxSize: 250000, // Ensure chunks are not too large
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // Separate vendor libraries into their own chunk
          name: 'vendors',
          chunks: 'initial',
          priority: 10,
        },
        default: {
          minChunks: 2, // Only split chunks used in at least 2 files
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true, // Enable minimization in production mode
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // Run minification in parallel
      }),
      new CssMinimizerPlugin(), // Minify CSS in production
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Added contenthash for better caching
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' }, // Copy assets to dist/assets
      ],
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|json|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|otf|glb|mp4|webp)$/,
      algorithm: 'gzip', // Using gzip for compression
      threshold: 10240, // Compress assets larger than 10KB
      minRatio: 0.8, // Compress if the compression ratio is greater than 80%
    }),
    new BrotliPlugin({
      asset: '[path].br',
      test: /\.(js|css|html|json|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|otf|glb|mp4|webp)$/,
      compressionOptions: {
        level: 11, // Max compression
      },
      threshold: 10240, // Compress files larger than 10KB
      minRatio: 0.8,
    }),
    new PurgeCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/**/*.{js,jsx}'), { nodir: true }), // Correct usage of glob
        safelist: ['safe-class'], // Optional: add any classes you want to keep
      }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },
  devtool: 'source-map', // Enable source maps for debugging
  mode: 'production', // Ensure production mode for optimizations
};

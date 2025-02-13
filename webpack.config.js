const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: isDevelopment ? '/' : './', 
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|glb)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]', // Store assets in dist/assets/
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' }, // Copies Assets folder to dist/
            ],
        }),
    ],
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    devServer: {
        static: [
            path.resolve(__dirname), // Serve from 3D Portfolio in dev mode
            path.resolve(__dirname, 'public'),
        ],
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
};

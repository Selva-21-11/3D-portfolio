const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; // Detects environment

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: isProd ? "/3D-portfolio/" : "/", // ✅ Dynamically set for GH Pages & local
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource', // ✅ Webpack 5 built-in asset handling
                generator: {
                    filename: 'assets/[name][ext]', // ✅ Ensures assets go to /dist/assets
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
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' }, // ✅ Copies assets for production build
            ],
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'public'), // ✅ Serves public folder correctly
        port: 3000,
        open: true,
        historyApiFallback: true, // ✅ Fixes routing issues in local dev
    },
    devtool: 'source-map',
};

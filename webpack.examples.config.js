const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './examples/src/index.tsx',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'examples', 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur|svg)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'examples/src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        })
    ],
    mode: 'development',
    devServer: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8090,
        historyApiFallback: true,
    },
    watchOptions: {
        ignored: ['src', 'dist']
    }
};

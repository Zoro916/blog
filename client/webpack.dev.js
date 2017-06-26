
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            title: 'My Blog',
            filename: 'index.html',
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextWebpackPlugin('css/style.css')
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        historyApiFallback: true
    }
};






var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
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
    
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/public-resource/components'),
            image: path.resolve(__dirname, 'src/public-resource/image'),
            sass: path.resolve(__dirname, 'src/public-resource/sass')
        }
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
        new ExtractTextWebpackPlugin('css/style.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            mangle: false,
            comments: false
        })
    ] 
};





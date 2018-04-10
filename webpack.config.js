var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode: 'development',
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'xlsx'],
        main: './src/index.js',
    },
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: { presets: ['env', 'react'] }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'carpenta playground',
            template: './src/index.html'
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    devtool: "source-map"
}

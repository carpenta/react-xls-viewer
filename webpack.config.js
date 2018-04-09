var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
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
    devtool: "source-map"
}

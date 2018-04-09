var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports={
    cache: true,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
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
    optimization: {
        minimizer: [new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                compress: false,
                mangle: false
            }
        })],
    }
}

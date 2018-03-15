const path = require('path');
const webpack = require('webpack');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/index')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'BeautifyScrollbar',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                type: 'javascript/auto',
                use: ExtractTextPlugin.extract({
                    fallback: 'css-loader',
                    use: ['postcss-loader', 'less-loader']
                })
            }
        ]
    },
    
    stats: {
        children: false
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            },
            cssProcessor: require('cssnano'),
            assetNameRegExp: /\.less|\.css$/g
        }),

        new UglifyJsPlugin({
            parallel: true,
            cache: '.cache/',
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    warnings: false,
                    /* eslint-disable */
                    drop_debugger: true,
                    drop_console: true
                },
                mangle: true
            }
        }),

        new ProgressBarPlugin()
    ]
}
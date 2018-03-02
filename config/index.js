const path = require('path');

module.exports = {
    dev: {
        env: 'development',
        assetsRoot: path.resolve(__dirname, '../examples/dist'),
        assetsPublicPath: '/beautify-scrollbar/examples/dist/',
        contentBase: path.resolve(__dirname, '../examples/dist'),
        port: 3002
    },
    build: {
        env: 'production',
        assetsRoot: path.resolve(__dirname, '../examples/dist'),
        assetsPublicPath: '/beautify-scrollbar/examples/dist/'
    }
};
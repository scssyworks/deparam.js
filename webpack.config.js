const path = require('path');
const Cleaner = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'deparam': './src/deparam.js',
        'deparam.min': './src/deparam.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js'),
        library: 'deparam',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `typeof self !== "undefined" ? self : this`
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new Uglify({
            include: /\.min\.js$/
        })]
    },
    plugins: [
        new Cleaner(['dist'])
    ]
}
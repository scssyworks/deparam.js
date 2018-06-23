const path = require('path');
const Cleaner = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'deparam': './src/deparam.js',
        'deparam.min': './src/deparam.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
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
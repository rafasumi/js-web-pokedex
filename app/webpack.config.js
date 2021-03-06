const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        publicPath: '/',
        path: __dirname + '/public',
        filename: './app.js',
    },
    devServer: {
        port: 8080,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin('app.css')
    ],
    module: {
        rules: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['transform-object-rest-spread']
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            use: 'file-loader'
        }]
    },
    externals: {
        'Config': JSON.stringify({
            apiUrl: 'http://localhost:3000/pokemon/'
        })
    }
}
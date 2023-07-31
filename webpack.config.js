const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './app/index.jsx', // main root point of our application
    // devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            ["@babel/preset-react"]
                        ],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            // css-loader change url => require, style-loader creates style tag in the header and put css content there
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    resolve: {
        // support for importing jsx files without pointing the extension
        extensions: ['.jsx', '...']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
    ],

    devServer: {
        historyApiFallback: true,
    },

    mode: process.env.NODE_ENV === 'production' 
    ? 'production' 
    : 'development'
};
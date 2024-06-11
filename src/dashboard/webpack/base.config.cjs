const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, '../../../public/dist/dashboard'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        publicPath: '/dist/dashboard/',
    },
    watch: process.env.NODE_ENV !== 'production',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                // exclude: /\/node_modules/,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                    }
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.css|\.scss?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV !== 'production',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif|swf)$/,
                loader: 'file-loader?limit=100000',
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         {
            //             loader: 'style-loader', // creates style nodes from JS strings
            //         },
            //         {
            //             loader: 'css-loader', // translates CSS into CommonJS
            //         },
            //         {
            //             loader: 'less-loader', // compiles Less to CSS
            //         },
            //     ],
            // }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
            api: path.resolve('./src/api'),
            assets: path.resolve('./src/assets'),
            config: path.resolve('./src/config'),
            // components: path.resolve('./src/components'),
            // routes: path.resolve('./src/routes'),
            lib: path.resolve('./src/lib'),
            // layouts: path.resolve('./src/layouts'),
            // views: path.resolve('./src/views'),
            // utils: path.resolve('./src/utils'),
            // variables: path.resolve('./src/variables'),
            // styles: path.resolve('./src/styles'),
            // '@redux': path.resolve('./src/redux'),
            '@': path.resolve('src'),
        }
    },
    plugins: [
        new CleanWebpackPlugin({ verbose: true, }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
        }),
    ]
};

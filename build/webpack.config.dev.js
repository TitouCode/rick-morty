const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const PUBLIC_PATH = path.resolve(__dirname, '../public')

// GET VAR FROM config.json
const ASSETS_PATH_VAR = 'src/assets/'

module.exports = {
    mode: 'development',
    entry: [
        './src/app.js'
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(PUBLIC_PATH, 'js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    // outputPath: '../assets/',
                    // publicPath: 'public/assets/',
                    // PATH FOR ASSETS IN SCSS
                    outputPath: (url) => {
                        const re = new RegExp(ASSETS_PATH_VAR);

                        if (re.test(url)) {
                            return `../assets/${url.replace(re, '')}`;
                        }
            
                        return '../assets/';
                    },
                    publicPath: (url) => {
                        const re = new RegExp(ASSETS_PATH_VAR);

                        if (re.test(url)) {
                            return `public/assets/${url.replace(re, '')}`;
                        }
            
                        return 'public/assets/';
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // Copy Assets to Public Dir
        new CopyWebpackPlugin(
            [{
                from: path.resolve(__dirname, '../src/assets'),
                to: path.resolve(__dirname, '../public/assets')
            }]
        ),
    ],
    resolve: {
        // Aliases to root components and assets
        alias: {
            root: path.resolve(__dirname, '../'),
            config: path.resolve(__dirname, '../config'),
            assets: path.resolve(__dirname, '../src/assets'),
            services: path.resolve(__dirname, '../src/services'),
            store: path.resolve(__dirname, '../src/store'),
            views: path.resolve(__dirname, '../src/views'),
            components: path.resolve(__dirname, '../src/components'),
            styles: path.resolve(__dirname, '../src/styles'),
            filters: path.resolve(__dirname, '../src/filters'),
            directives: path.resolve(__dirname, '../src/directives'),
        }
    } 
}
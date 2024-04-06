const path = require("path"),
    HtmlWebpackPlugin = require("html-webpack-plugin");
const fileSystem = require("fs");
const Dotenv = require('dotenv-webpack');


const pages = fileSystem.readdirSync("./src", {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = path.resolve(__dirname, `src/${page}/index.ts`);
        return config;
    }, {}),
    devtool: "eval-source-map",


    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

        ],
    },
    resolve: {
        extensions: ['.html', '.ts', '.js', '.scss'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `src/${page}/index.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
        ),
        [new Dotenv()]
    ),
};

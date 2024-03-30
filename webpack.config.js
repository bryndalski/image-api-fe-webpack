const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");
const fileSystem = require("fs");


const pages = fileSystem.readdirSync("./src", { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = path.resolve(__dirname, `src/${page}/index.ts`);
    return config;
  }, {}),

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.html', '.ts', '.js'],
  },
  output: {
    filename: '[name].ts',
    path: path.resolve(__dirname, "dist"),
    asyncChunks: true,

  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
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
    )
  ),
};

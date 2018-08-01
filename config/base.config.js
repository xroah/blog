const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
let context = path.resolve(__dirname, "..");
let dist = path.join(context, "dist");

module.exports = {
    entry: {
        vendors: ["vue", "vuex", "vue-router"],
        index: "./src/index.js"
    },
    context,
    output: {
        filename: "js/[name].js",
        path: dist,
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [{
                test: /.vue$/,
                use: "vue-loader"
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /.png$|.jpg$|.jpeg$|.gif$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        outputPath: "images",
                        name: "[name].[ext]"
                    }
                }],

            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: "index.html",
            filename: "index.html",
            inject: "body"
        })
    ]
}
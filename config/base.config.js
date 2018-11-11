const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let context = path.resolve(__dirname, "..");
let dist = path.join(context, "dist");

module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    context,
    output: {
        filename: "js/[name].js",
        path: dist,
        publicPath: "/",
        chunkFilename: "js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ["ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader"
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader"
        },
        {
            test: /\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$/,
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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "reactRouterDOM"
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: "index.html",
            filename: "index.html",
            favicon: "assets/images/favicon.png",
            inject: "body"
        })
    ]
}
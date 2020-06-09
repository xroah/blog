import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";

const conf: webpack.Configuration = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
        chunkFilename: "[name]-[id].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    stats: "minimal",
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            minify: false,
            hash: true
        })
    ],
    module: {
        rules: [{
            test: /\.(?:tsx?)|(?:jsx?)$/,
            use: "babel-loader"
        }, {
            test: /\.(?:png)|(?:jpg)|(?:svg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192
                }
            }]
        }]
    }
};

export default conf;
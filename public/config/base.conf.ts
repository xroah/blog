import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default function getConf(mode: "development" | "production") {
    const conf: webpack.Configuration = {
        mode,
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: "index.js",
            chunkFilename: "[name]-[id].js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, "../index.html"),
                hash: true
            })
        ],
        module: {
            rules: [{
                test: /\.(?:tsx?)|(?:jsx?)$/,
                use: "babel-loader"
            }]
        }
    };

    return conf;
}
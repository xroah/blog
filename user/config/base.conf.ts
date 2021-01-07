import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default function getConf(mode: "development" | "production") {
    process.env.NODE_ENV = mode;
    const conf: webpack.Configuration = {
        mode,
        entry: path.resolve(__dirname, "../src/index.tsx"),
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: "js/index.js",
            chunkFilename: "js/[name]-[hash].js",
            publicPath: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "react-router-dom": "ReactRouterDOM"
        },
        stats: "minimal",
        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(
                    __dirname,
                    "../index.html"
                ),
                minify: false,
                hash: true,
                favicon: path.resolve(__dirname, "../logo.png")
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

    return conf;
}
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const ExtractCssPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackAnalyzer = require("webpack-bundle-analyzer");
const path = require("path");

let env = process.env.NODE_ENV;
let styleLoader = env === "production" ? ExtractCssPlugin.loader : "style-loader";
let cfg = {
    mode: env,
    entry: {
        // polyfill: "@babel/polyfill",
        app: "./src/index.tsx",
        //    vendors: ["react", "react-dom", "react-router-dom", "redux", "redux-saga"]
    },
    context: __dirname,
    output: {
        path: `${__dirname}/dist`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].[chunkhash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            "@images": path.resolve(__dirname, "./assets/images"),
            "@common": path.resolve(__dirname, "./src/components/common"),
            "@containers": path.resolve(__dirname, "./src/containers"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@redux": path.resolve(__dirname, "./src/redux")
        }
    },
    externals: [{
        moment: "moment" //dependency of chart.js
    }],
    watch: true,
    watchOptions: {
        poll: true //ubuntu 18.10, otherwise watch won't work
    },
    module: {
        rules: [{
                test: /\.(j|t)sx?$/,
                use: [
                    "babel-loader",
                    "react-hot-loader/webpack"
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    styleLoader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.png$|\.jpe?g$|\.gif$|\.svg$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        outputPath: "images",
                        name: "[name].[ext]"
                    }
                },

            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: "index.html",
            filename: "index.html",
            hash: true,
            favicon: "./assets/images/favicon.png"
            /* ,
                        chunksSortMode(chunk1, chunk2) {
                            if (chunk1.names[0].includes("polyfill") || chunk2.names.includes("polyfill")) {
                                return -1;
                            }
                            return 0;
                        } */
        })
    ]
};

if (env === "development") {
    cfg.devServer = {
        hot: true,
        historyApiFallback: true,
        port: 8008,
        open: true,
        inline: true,
        contentBase: "dist",
        proxy: {
            "/api": "http://localhost:8000",
            "/uploads": "http://localhost:8000"
        }
    };
} else {
    cfg.plugins.push(
        new CleanPlugin("./dist", {
            root: __dirname
        }),
        new ExtractCssPlugin({
            filename: "css/style.css"
        }),
        new WebpackAnalyzer.BundleAnalyzerPlugin()
    );
    cfg.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssPlugin()
        ],
        splitChunks: {
            chunks: "initial",
            minChunks: 1,
            maxSize: 500 * 1024,
            minSize: 300 * 1024,
            cacheGroups: {
                vendors: {
                    test(module) {
                        return module.type === "javascript/auto" &&
                            module.context.includes("node_modules")
                        /* &&
                                                   !/@babel[\/\\]polyfill/.test(module.context);//polyfill should load first */
                    },
                    name: "vendors"
                }
            }
        }
    };
}

module.exports = cfg;
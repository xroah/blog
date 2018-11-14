const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

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
            loader: "ts-loader",
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                        libraryDirectory: "es",
                        libraryName: "antd",
                        style: true
                    })]
                }),
                compilerOptions: {
                    module: "es2015"
                }
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader"
        },
        {
            test: /\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 8192,
                    outputPath: "images",
                    name: "[name].[ext]"
                }
            },

        },
        {
            test: /\.less$/, //antd use less,
            use: [{
                loader: "style-loader", 
            }, {
                loader: "css-loader", 
            }, {
                loader: "less-loader", 
                options: {
                    modifyVars: { //change andt global style
                        "primary-color": "#1DA57A",
                        "link-color": "#1DA57A"
                    },
                    javascriptEnabled: true,
                },
            }]
        }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM"
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
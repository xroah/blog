let baseConf = require("./base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let rules = baseConf.module.rules.concat({
    test: /.s?css$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: "css-loader",
            options: {
                minimize: true, //压缩css
            }
        },
        "sass-loader"
    ]
});

let plugins = baseConf.plugins.concat(
    new CleanWebpackPlugin(baseConf.output.path, {
        root: baseConf.context
    }),
    new MiniCssExtractPlugin({
        filename: "css/style.[hash].css"
    })
);

module.exports = {
    ...baseConf,
    mode: "production",
    module: {
        rules
    },
    //devtool: "source-map",
    plugins,
    optimization: {
        splitChunks: {
            maxSize: 100000,
            cacheGroups: {
                commons: {
                    reuseExistingChunk: true,
                    chunks: "all",
                    name: "commons",
                    minChunks: 2
                }
            }
        }
    }
}
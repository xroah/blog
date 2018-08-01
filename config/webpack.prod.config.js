let baseConf = require("./base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

baseConf.module.rules.push({
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
    new CleanWebpackPlugin(`${baseConf.context}`, {
        root: baseConf.context
    }),
    new MiniCssExtractPlugin({
        filename: "css/style.[hash].css"
    })
);

module.exports = {
    ...baseConf,
    mode: "production",
    plugins,
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    minChunks: 2,
                    chunks: "all"
                }
            }
        }
    }
}
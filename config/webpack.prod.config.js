let baseConf = require("./base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");

let rules = baseConf.module.rules.concat({
    test: /.s?css$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
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
        minimizer: [
            new UglifyjsPlugin(), //js压缩
            new OptimizeCssAssetsPlugin() //css压缩
        ],
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
let baseConf = require("./base.config");
const webpack = require("webpack");

baseConf.module.rules.push({
    test: /.s?css$/,
    use: [
        "vue-style-loader",
        "css-loader",
        "sass-loader"
    ]
});

baseConf.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {
    ...baseConf,
    mode: "development",
    devServer: {
        contentBase: baseConf.output.path,
        port: 8000,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true
    }
}
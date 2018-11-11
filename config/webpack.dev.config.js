let baseConf = require("./base.config");
const webpack = require("webpack");

let rules = baseConf.module.rules.concat({
    test: /.s?css$/,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader"
    ]
});

let plugins = baseConf.plugins.concat(new webpack.HotModuleReplacementPlugin());

module.exports = {
    ...baseConf,
    module: {
        rules
    },
    plugins,
    mode: "development",
    devServer: {
        contentBase: baseConf.output.path,
        port: 8000,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:8008"
        }
    }
}
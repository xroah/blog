import getConf from "./base.conf";
import webpack from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const baseConf = getConf("development");
const conf: webpack.Configuration = {
    ...baseConf,
    devtool: "source-map",
    entry: [
        "webpack-hot-middleware/client",
        baseConf.entry as string
    ]
};

conf.module!.rules.push({
    test: /\.s?css$/,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader"
    ]
});
conf.plugins!.push(
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
)

export default conf;
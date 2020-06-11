import getConf from "./base.conf";
import webpack from "webpack";

const baseConf = getConf("development");
const conf: webpack.Configuration = {
    ...baseConf,
    devtool: "source-map",
    entry: [
        "react-hot-loader/patch",
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
conf.plugins!.push(new webpack.HotModuleReplacementPlugin())

export default conf;
import baseConf from "./base.conf";
import webpack from "webpack";

const conf = {
    ...baseConf
};

conf.mode = "development";
conf.entry = [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    conf.entry as string
];

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
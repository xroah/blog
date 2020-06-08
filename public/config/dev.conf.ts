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
conf.resolve!.alias = {
    "react-dom": "@hot-loader/react-dom"
}
conf.module!.rules.push({
    test: /\.css$/,
    use: [
        "style-loader",
        "css-loader"
    ]
});
conf.plugins!.push(new webpack.HotModuleReplacementPlugin())

export default conf;
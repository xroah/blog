import getConf from "./base.conf";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";

const baseConf = getConf("production");
const conf: Configuration = {
    ...baseConf,
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM"
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSS()
        ],
        splitChunks: {
            minSize: 200 * 1024,
            maxSize: 256 * 1024,
            minChunks: 1,
            cacheGroups: {
                vendors: {
                    chunks: "initial",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};

conf.module!.rules.push({
    test: /.css$/,
    use: [
        MiniCSSExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
});

conf.plugins!.push(
    new MiniCSSExtractPlugin(),
    new CleanWebpackPlugin(),
    new LoadablePlugin()
);

export default conf;
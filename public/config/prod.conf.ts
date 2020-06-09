import baseConf from "./base.conf";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const conf = {
    ...baseConf
};

conf.mode = "production";
conf.optimization = {
    minimizer: [
        new TerserPlugin(),
        new OptimizeCSS()
    ],
    splitChunks: {
        chunks: "all",
        minSize: 100 * 1024,
        maxSize: 256 * 1024,
        minChunks: 1,
        cacheGroups: {
            vendors: {
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
    new CleanWebpackPlugin()
);

export default conf;
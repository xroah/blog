import baseConf from "./base.conf";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

const conf = {
    ...baseConf
};

conf.mode = "production";
conf.optimization = {
    splitChunks: {
        chunks: "all",
        minSize: 200 * 1024,
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
        "css-loader"
    ]
});

conf.plugins!.push(new MiniCSSExtractPlugin());

export default conf;
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require("webpack");

module.exports = {
    entry: ["./src/js/app.js", "./src/sass/app.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    devServer: {
        hot: true,
        contentBase: "./dist",
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,

                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "app.css",
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

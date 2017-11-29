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
        contentBase: "./dist"
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

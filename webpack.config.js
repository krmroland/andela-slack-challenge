const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require("webpack");
const CLeanWebPackPlugin = require("clean-webpack-plugin");

const HandlebarsPlugin = require("handlebars-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
module.exports = {
    entry: ["./src/js/app.js", "./src/ui/sass/app.scss"],
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
            },
            {
                test: /\.(jpg|jpeg|png)/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[hash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "app.css",
            allChunks: true
        }),
        new WebpackNotifierPlugin({
            title: "Aspiring Andelians",
            alwaysNotify: true,
            contentImage: path.resolve(__dirname, "andela.png")
        }),
        new CLeanWebPackPlugin(["dist"]),
        new webpack.HotModuleReplacementPlugin(),
        new HandlebarsPlugin({
            // path to hbs entry file(s)
            entry: path.join(process.cwd(), "src", "ui", "*.hbs"),
            // output path and filename(s)
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),

            // globbed path to partials, where folder/filename is unique
            partials: [path.join(process.cwd(), "src", "ui", "*", "*.hbs")]
        })
    ]
};

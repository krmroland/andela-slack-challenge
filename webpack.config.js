const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require("webpack");
const CLeanWebPackPlugin = require("clean-webpack-plugin");

const HandlebarsPlugin = require("handlebars-webpack-plugin");

const WebpackNotifierPlugin = require("webpack-notifier");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");

const inProdution = !!(process.env.NODE_ENV === "production");
const inDevelopment = !!(process.env.NODE_ENV === "development");

const config = {
    entry: ["./src/js/app.js", "./src/ui/sass/app.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    devServer: {
        hot: inDevelopment,
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
                test: /\.(jpg|jpeg|png|gif)/,
                loaders: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    },
                    "img-loader"
                ]
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

        new HandlebarsPlugin({
            // path to hbs entry file(s)
            entry: path.join(process.cwd(), "src", "ui", "*.hbs"),
            // output path and filename(s)
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),

            // globbed path to partials, where folder/filename is unique
            partials: [path.join(process.cwd(), "src", "ui", "*", "*.hbs")]
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync([
                "./src/ui/sections/*.hbs",
                "./src/ui/icons/*.hbs",
                "./src/ui/*.hbs"
            ]),
            purifyOptions: {
                minify: inProdution
            }
        })
    ]
};

if (inProdution) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

if (inDevelopment) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;

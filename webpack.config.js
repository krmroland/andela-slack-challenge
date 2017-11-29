const path = require("path");

module.exports = {
    entry: ["./src/js/app.js", "./src/sass/app.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["css-loader", "sass-loader"]
            }
        ]
    }
};

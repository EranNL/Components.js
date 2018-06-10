const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: "./src/javascript/core.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env"]],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties"], ["@babel/plugin-transform-runtime"],
                            ["babel-plugin-root-import"]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        //new MinifyPlugin()
    ],
    mode: "development"

};

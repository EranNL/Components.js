const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { styles } = require( "@ckeditor/ckeditor5-dev-utils" );

module.exports = {
    entry: "./src/javascript/core.js",
    output: {
        path: path.join(__dirname, ""),
        chunkFilename: "build/[name].bundle.js",
        filename: "build/bundle.js",
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
                            ["babel-plugin-root-import"], ["@babel/plugin-syntax-dynamic-import"]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( "@ckeditor/ckeditor5-theme-lark" )
                            },
                            minify: true
                        } )
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: {
                    loader: "svg-inline-loader"
                }
            }
        ],
    },
    plugins: [
        new MinifyPlugin()
    ],
    mode: "production"

};

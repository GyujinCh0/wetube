const path = require("path");
const autoprefixer = require("autoprefixer");
const extractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    devtool: "source-map",
    mode: MODE,
    module: {
      rules: [
        // Rules for ES6 -> JS
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        // Rules for SCSS -> CSS
        {
          test: /\.(scss)$/, // webpack이 scss 파일을 찾도록 한다. scss 파일에 한해 config 적용시킨다
          use: [
            {
              loader: extractCSS.loader,
            },
            {
              loader: "css-loader", 
            },
            {
              loader: "postcss-loader",
              options: {
                plugins() {
                  return [autoprefixer({ overrildeBrowserslist: "cover 99.5%" })];
                },
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    output: {
      path: OUTPUT_DIR,
      filename: "[name].js",
    },
    plugins: [new extractCSS({ filename: "styles.css" })],
  };

module.exports = config;
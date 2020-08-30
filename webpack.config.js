const path = require("path"); //구식 자바스크립트 import랑 같음
const autoprefixer = require("autoprefixer");
const MiniExtractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //__dirname=현재 디렉토리를 가리키는 노드 전역변수
const OUTPUT_DIR = path.join(__dirname, "static");
const config = {
  entry: ["@babel/polyfill",ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
        {
            test:/\.(js)$/,
            use: [
                {
                    loader: "babel-loader"
                }
            ]
        },
        {
            test:/\.(scss)$/,
            use: [
                {
                    loader: MiniExtractCSS.loader,
                    options: {
                        hmr: process.env.WEBPACK_ENV==="development"
                    }
                },
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        plugins(){
                            return [autoprefixer({overrideBrowserslist:"cover 99.5%"})];
                        }
                    }
                },
                "sass-loader"
            ]
        }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new MiniExtractCSS({filename:"styles.css"})],
};

module.exports = config;

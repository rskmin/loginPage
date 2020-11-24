const $utils = require('./tools/build.utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = $utils.isDev ? $utils.DEV : $utils.PROD;

module.exports = {
  mode: MODE,
  entry: {
    index: $utils.resolve('src/index.js'),
  },
  output: {
    path: $utils.resolve('dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/img',
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        include: [$utils.resolve('src/style')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: false,
              resources: [
                $utils.resolve('src/style/_theme.scss'),
                $utils.resolve('src/style/animation.scss')
              ],
            },
          },
        ]
      }
    ],
  },
  resolve: {
    alias: {
      '@': $utils.resolve('src'),
      'src': $utils.resolve('src'),
    },
  },
  devServer: {
    contentBase: $utils.resolve('dist'),
    port: 8081,
    host: '0.0.0.0',
  },
  // externals: {
  //   'jquery': '$',
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: $utils.resolve('public/template.jq.ejs'),
      filename: 'login.html',
      title: '登陆',
      content: $utils.fs.readFileSync(
        $utils.resolve('src/views/login.html')
      )
    }),
    // new FileManagerPlugin({
    //   events: {
    //     onEnd: {
    //       copy: [
    //         { source: $utils.resolve('public/img'), destination: $utils.resolve('dist/static') }
    //       ]
    //     }
    //   }
    // })
    new MiniCssExtractPlugin({
      filename: "static/css/common.css"
    }),
  ]
}
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|eot|ttf|wav)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    // 在热加载时直接返回更新文件名，而不是文件的id。
    new webpack.NamedModulesPlugin(),
    // 热更新相关
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: './react/index.html'
    }),
  ],
  optimization: {
    chunkIds: 'named',
    noEmitOnErrors: true,
    minimize: false,
    runtimeChunk: {
      name: 'runtimeChunk'
    },
    // dev环境简单分离下不然包体积太大
    // splitChunks: {
    //   chunks: 'initial',
    //   minSize: 30000,
    //   minChunks: 2,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   name: true,
    //   automaticNameDelimiter: '~', 
    //   cacheGroups: {
    //     default: {
    //       minChunks: 3,
    //       priority: -20, 
    //       reuseExistingChunk: true,
    //       name: 'default_chunk',
    //       chunks: 'initial'
    //     },
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: 10,
    //       name: 'vendors_chunk',
    //       chunks: 'initial'
    //     },
    //   }
    // }
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 9000,
    open: true,
    index: 'index.html',
    inline: true,
    // proxy: {
    //   '/api': {
    //     // 本地服务器
    //     target: 'http://localhost:3000/',
    //     // 线上服务器
    //     // target: 'http://144.34.177.60/',
    //     // pathRewrite: { '^/api': '' },
    //     changeOrigin: true
    //   }
    }
})

const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfig = webpackMerge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|eot|ttf|wav)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[contenthash:8].[ext]'
            }
          },
        ]
      }
    ]
  },
  plugins: [],
  optimization: {
    namedChunks: true,
    moduleIds: 'hashed',
    chunkIds: 'named',
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          exclude: /\.min\.js$/,
          warnings: false,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        },
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: false
      })
    ],
    runtimeChunk: {
      name: 'runtimeChunk'
    },
  }
})
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig

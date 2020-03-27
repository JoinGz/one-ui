const isProduct = process.env.product
const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { version, name, description } = require("../package.json");

module.exports = {
  entry: ['./react/index.js'],
  //umd 模式打包
  output: {
    library: name,
    libraryTarget: "umd",
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js"
  },
  resolve: {
    // extensions: ['.js'],
    alias: {
      // '~@': path.resolve(config.context, './app/src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ],
        exclude: "/node_modules/",
      },
      {
        test: /\.jsx?$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: "/node_modules/",
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isProduct ? {
            loader: MiniCssExtractPlugin.loader
          } :
          'style-loader',
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: [
                    'last 2 versions',
                    'Android >= 4.4',
                    'ios >= 8'
                  ]
                })
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduct ? '[name]-[contenthash:8].css':'[name].css' ,
      // chunkFilename: isProduct
      //   ? '[name]-[contenthash:8]-chunk.css'
      //   : '[name].css',
    }),
    // 在打包的文件之前 加上版权说明
    //   new webpack.BannerPlugin(` \n ${name} v${version} \n ${description}
    //   \n ${LOGO}\n ${fs.readFileSync(path.join(process.cwd(), "LICENSE"))}
    // `),
    // new BundleAnalyzerPlugin(),
  ]
}
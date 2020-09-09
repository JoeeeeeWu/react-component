const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: [
      path.join(__dirname, '../src'),
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   vendor: { // 抽离第三插件
      //     test: /node_module/,
      //     chunks: 'initial',
      //     name: 'vendor',
      //     minSize: 0, // 超出0字节就生成新的公共的包
      //     minChunks: 2,
      //     priority: 10, // 优先级
      //   },
      //   commons: { // 抽离公共的js
      //     chunks: 'initial',
      //     name: 'commons',
      //     minSize: 0, // 超出0字节就生成新的公共的包
      //     minChunks: 2,
      //   },
      // },
    },
  },
  output: {
    filename: 'static/js/[name].[hash:8].js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
    chunkFilename: 'static/js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
    publicPath: '/', // 静态资源文件引用时的路径（加在引用静态资源前面的）
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/react',
            ],
            plugins: [
              [
                '@babel/proposal-decorators',
                {
                  'legacy': true,
                },
              ],
              [
                '@babel/proposal-class-properties',
                {
                  'loose': true,
                },
              ],
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/assets/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/template.html'),
      minify: {
        html5: true,
      },
      // favicon: path.join(__dirname, '../src/assets/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[id].[chunkhash:8].css',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_ENV': JSON.stringify(process.env.REACT_APP_API_ENV),
    }),
  ],
};

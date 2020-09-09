const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Autoprefixer = require('autoprefixer');
const Cssnano = require('cssnano');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.global\.(less|css)$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: { // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                Autoprefixer(), // eslint-disable-line
                Cssnano(), // 压缩css
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        include: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../src/components/ProLayout'),
        ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: { // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                Autoprefixer(), // eslint-disable-line
                Cssnano(), // 压缩css
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /(?<!\.global)\.(less|css)$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../src/components/ProLayout'),
        ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              importLoaders: 2,
              // localsConvention: '[name]__[local]___[chunkhash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: { // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                Autoprefixer(), // eslint-disable-line
                Cssnano(), // 压缩css
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '127.0.0.1', // 我们可以允许我们用任意方式进行访问（127.0.0.1，localhost, 本机ip）
    port: '7001', // 设置端口
    contentBase: path.join(__dirname, '../dist'),
    open: true, // 设置自动拉起浏览器
    hot: true, // 启动热加载
    overlay: { // 错误提醒弹窗小遮层
      errors: true, // 只显示error
    },
    publicPath: '/', // 访问所有静态路径都要前面加/才能访问生成的静态文件
    historyApiFallback: {
      index: '/index.html', // 所有404的请求全部访问该配置下的url
    },
    disableHostCheck: true,
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:4400',
      },
    },
  },
});

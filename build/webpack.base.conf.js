'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// webpack完以后，最终需要的是一个入口html和一个dist文件夹，所有的css、js、图片、iconfont字体以及所有入口js都会重命名后存在dist里

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 入口起点指示webpack应该使用哪个模块来作为构建其内部依赖图的开始。每个依赖项被处理后输出到称之为bundles的文件中
  entry: {
    app: './src/main.js'
  },
  // 告诉webpack在哪里输出它所创建的bundles，以及如何命名
  output: {
    path: config.build.assetsRoot,   // 想要emit到哪里
    filename: '[name].js',   // bundles名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // resolve.extensions是对模块后缀名的简写，这样require('./components/app.vue') ==> require('./components/app')
  // alias别名
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components')
    }
  },
  module: {
    // 不同的loaders通过正则来对不同模块文件进行处理
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // url-loader:会将小于8kb的图片、iconfont字体都转为base64；超过8kb的才会生成具体文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

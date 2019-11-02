// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {// 配置跨域
      '/api': {
        target: 'https://www.opdgr.cn', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }
      }
    }
  },
  productionSourceMap:false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 压缩图片
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: {
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor:{
    //         chunks:"all",
    //         test: /node_modules/,
    //         name:"vendor",
    //         minChunks: 1,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority:100,
    //       },
    //       common: {
    //         chunks:"all",
    //         test:/[\\/]src[\\/]js[\\/]/,
    //         name: "common",
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority:60
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //       runtimeChunk: {
    //         name: 'manifest'
    //       }
    //     }
    //   }
    // },
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts', // 配置使用CDN
      'axios': 'axios',
      'xlsx': 'XLSX'
    },
    // ,
    // plugins:[
    //   new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: /\.js$|\.json$|\.html$|\.css/,
    //     threshold: 10, // 只有大小大于该值的资源会被处理
    //     minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: true // 删除原文件
    //   })
    // ]
    plugins: [
      new BundleAnalyzer.BundleAnalyzerPlugin()
    ]
  }
}

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.symlinks(true);
    const svgRule = config.module.rule('svg');

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_MODE === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          vue: 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components')
          //'@p': path.resolve(__dirname, './src/views')
        } // 别名配置
      }
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";'
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    host: '0.0.0.0', //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    port: 8080,
    hot: true, //hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    https: false,
    hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    proxy: {
      '/userApi': {
        target: 'http://localhost:3000', //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/userApi': '' //重写接口
        }
      },
      '/devApi': {
        target: 'http://www.web-jshtml.cn/productapi/token', //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/devApi': '' //重写接口
        }
      }
    }, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};

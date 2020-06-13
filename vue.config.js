const path =require('path');
module.exports = {
    //基本路徑
    publicPath : process.env.NODE_ENV --- 'production' ? '' : '/',
    //輸出文件目錄
    outputDir: process.env.NODE_ENV ---'production' ? dist : 'devdist',
    //eslit-loader 是否在保存的時候檢查
    lintOnSave: true,
    chainWebpack: (config) => {
    },
    configureWebpack: (config) => {

    },
    productionSourceMap: false,
    css:{
        extract:true,
        sourceMap:false,
        loaderOptions:{
            sass:{
              prependData: `@import"./src/styles/main.scss";`
            }
        },
        modules:false
    },
    parallel: require('os').cpus().length>1,
    pwa:{},
    devServer:{
        open:false,
        host:'0.0.0.0',
        port:8080,
        https:false,
        hot: true,
        hotOnly:false,
        proxy:null,
        overlay:{
            warning:true,
            errors:true
        },
        before: app=>{

        }
    },
    pluginOptions:{}
}







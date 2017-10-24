const path = require('path')
module.exports = {
    // 入口文件
    entry: './src/entry.js',
    // 出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 模块,例如编译css,js,转换图片，压缩，合并
    module: {},
    // 插件，用于生产模板和各项功能
    plugins: [],
    // 配置webpack开发服务功能
    devServer: {}
}
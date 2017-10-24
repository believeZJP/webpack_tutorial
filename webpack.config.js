const path = require('path')
module.exports = {
    // 入口文件
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    // 出口文件的配置项
    output: {
        // 输出的路径
        path: path.resolve(__dirname, 'dist'),
        // 输出文件的名称
        filename: '[name].js'
    },
    // 模块,例如编译css,js,转换图片，压缩，合并
    module: {},
    // 插件，用于生产模板和各项功能
    plugins: [],
    // 配置webpack开发服务功能
    devServer: {}
}
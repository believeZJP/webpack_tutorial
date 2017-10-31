// 声明entry 变量
const entry = {};
// 声明路径属性
entry.path = {
    entry: './src/entry.js',
    jquery: 'jquery',
    vue: 'vue',
    entry2: './src/entry2.js'
}

//模块化导出
module.exports = entry;
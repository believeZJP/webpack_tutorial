const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const website = {
    publicPath: 'http://localhost:8089/'
}
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
        filename: '[name].js',
        publicPath: website.publicPath
    },
    // 模块,例如编译css,js,转换图片，压缩，合并
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(html|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            }
        ]
    },
    // 插件，用于生产模板和各项功能
    plugins: [
        // new uglify()
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin('css/index.css')
    ],
    // 配置webpack开发服务功能
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        // 服务器的IP地址，可以是IP也可以是localhost
        host: 'localhost',
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口
        port: 8089
    }
}
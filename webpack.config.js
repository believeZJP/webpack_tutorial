const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

const glob = require('glob')
const purifyCSSPlugin = require('purifycss-webpack')

const entry = require('./webpackConfig/entry_webpack.js')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')

if(process.env.type === 'build') {
    var website = {
        publicPath: 'http://oriht.com:8089/'
    }
} else {
    var website = {
        publicPath: 'http://localhost:8089/'
    }
}
// console.log(process.env.type)
module.exports = {
    // 入口文件
    entry: entry.path,
    // 出口文件的配置项
    output: {
        // 输出的路径
        path: path.resolve(__dirname, 'dist'),
        // 输出文件的名称
        filename: '[name].js',
        publicPath: website.publicPath
    },
    devtool: 'source-map',
    // 模块,例如编译css,js,转换图片，压缩，合并
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
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
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                   loader: 'babel-loader'
                },
                exclude: /node_modules/
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
        new extractTextPlugin('css/index.css'),
        // Make sure this is after ExtractTextPlugin! 
        new purifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute! 
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.BannerPlugin('版权所有，仅限学习使用~~'),
        new webpack.optimize.CommonsChunkPlugin({
            // name对应入口文件中的名字，这里是jquery
            name: ['jquery', 'vue'],
            // 把文件打包到哪里，路径地址
            filename: 'assets/js/[name].js',
            // 最小打包的文件模块数，这里直接写2
            minChunks: 2
        }),
        new copyWebpackPlugin([{
            from: __dirname+ '/src/public',
            to: './public'
        }]),
        new webpack.HotModuleReplacementPlugin()

    ],
    watchOptions: {
        // 检测修改的时间，以毫秒为单位
        poll: 100,
        // 防止重复保存而发生编译错误。这里设置的500是半秒内重复保存，不进行打包
        aggregeateTimeout: 500,
        // 不监听的目录
        ignored: /node_modules/
    },
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
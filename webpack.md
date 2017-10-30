# 慢慢来 其实比较快

# 学习尽量做到知其然知其所以然

# 第01节：认识WebPack的作用

# 什么是WebPack？

> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。


## 重点

* 打包：可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。
* 转换：把拓展语言转换成为普通的JavaScript，让浏览器顺利运行。
* 优化：前端变的越来越复杂后，性能也会遇到问题，而WebPack也开始肩负起了优化和提升性能的责任。
 


# 安装
## 前提

必须先安装node(node -v来查看node安装情况和版本)


### 全局安装

webpack官方是不推荐的。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

```
npm install -g webpack
```

### 对项目目录进行安装

1. 先对项目进行初始化
2. 然后在项目目录中进行安装
3. 用webpack -v 查看版本
> --save 保存到package.json文件中
  dev 保存到开发环境中而生产环境中不使用


```
npm init

npm install --save-dev webpack

```
webpack -v

3.8.1

#### 小知识
**开发环境and生产环境：**

* 开发环境：在开发时需要的环境，这里指在开发时需要依赖的包。
* 生产环境：程序开发完成，开始运行后的环境，这里指要使项目运行，所需要的依赖包。
 




# 第二节 ：让你快速上手一个Demo

### 建立基本项目结构

创建一个项目目录，进入后在根目录建立两个文件夹，分别是src文件夹和dist文件夹：

* src文件夹：用来存放我们编写的javascript代码(源代码)
* dist文件夹：用来存放供浏览器读取的文件，这个是webpack打包成的文件。


1. 在dist中新建index.html

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>webpack tutorials</title>
    </head>

    <body>
        <div id="title"></div>
        <script src="./bundle.js"></script>
    </body>
</html>


```

2. 在src中新建entry.js 

src/entery.js

```
document.getElementById('title').innerHTML='Hello Webpack';
```

> 这个文件的代码很简单，就是在\<div id=”title”>\</div>标签里写入Hello Webpack这句话。



### 第一次Webpack打包

在终端中用命令行打包。 语法：
```
webpack {entry file} {destination for bundled file}
```

在这个项目中，执行
```
webpack src/entry.js dist/bundle.js

```
执行成功后，会在dist文件夹中出现bundle.js,用浏览器查看index.html可以查看效果


### 总结：

从这个Demo中你会了解到webpack的基本用法和使用过程，

并学会了命令行打包的方法。

在这节文章的最后，还是要强调，你一定要把本节内容在自己的电脑上敲一遍，这样你才能深入了解。



## 在浏览器中用live-server访问文件
### 用命令行
1. 安装live-server 

```
npm install -g live-server
```
2. 在该项目中用命令行
```
live-server
```
即可在浏览器中访问文件


### 用webpack的scripts命令封装

1. 在package.json的scripts中
```
"scripts": {
   "server": "live-server ./ --port=9090"
 }
```

2. 执行
```
npm run server
```



# 第03节：配置文件：入口和出口
这节课我们就学习配置文件的大体结构和入口出口文件的配置。

## 配置文件webpack.config.js
```
module.exports = {
    // 入口文件
    entry: {},
    // 出口文件的配置项
    output: {},
    // 模块,例如编译css,js,转换图片，压缩，合并
    module: {},
    // 插件，用于生产模板和各项功能
    plugins: [],
    // 配置webpack开发服务功能
    devServer: {}
}
```

* entry：配置入口文件的地址，可以是单一入口，也可以是多入口。
* output：配置出口文件的地址，在webpack2.X版本后，支持多出口配置。
* module：配置模块，主要是解析CSS和图片转换压缩等功能。
* plugins：配置插件，根据你的需要配置不同功能的插件。
* devServer：配置开发服务功能。

## entry选项（入口配置）
配置要压缩的文件。一般是JavaScript，也可以是CSS文件。

```
// 入口文件配置
entry: {
    // 里面的entry可以随便起名字，外面的是固定的
    entry: './src/entry.js'
}
```

## output(出口配置)
配置webpack最后打包文件的地址和名称。

```
// 出口文件配置
output: {
    // 打包的文件位置
    path: path.resolve(__dirname, 'dist'),
    // 打包的文件名称
    filename: 'bundle.js'
}
```
需要在webpack.config.js头部引入path
```
const path = require('path');
```
> path.resolve(__dirname, 'dist') 获取项目的绝对路径
> filename: 打包后的文件名称。

#### webpack单文件入口配置代码
```
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
```

配置完成后，在终端直接输入webpack就会打包

## 多入口、多出口配置

在entry配置多个文件，

在output处配置文件名为动态的

```
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
```
[name]： 根据入口文件的名称，打包成相同的名称，有几个入口文件，就打包成几个文件。

## 总结：
    任何项目的webpack都要执行这些操作。需要牢记。


### 小知识
#### 调试js文件

在js中写console.log()

直接在命令行

node index.js，

即可在终端查看打印内容


# 第4节： 配置文件：服务和热更新
热更新：所见即所得

## 设置webpack-dev-server

1. 先安装webpack-dev-server
```
npm install webpack-dev-server --save-dev
```
2. 配置devServer
webpack.config.js
```
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
```

3. 配置scripts
package.json
```
"scripts": {
    "server": "webpack-dev-server --open"
  },
```
### 在这里直接设置 --open即可自动打开浏览器！！！！！！
4. 在终端里输入npm run server 打开服务器，在浏览器中输入http://localhost:8089即可看到结果。

## 支持热更新

npm run server 启动后，有一种监控机制(watch), 监控修改源码，并立即在浏览器里更新。

**注意**：webpack 3.6版本以后内置热更新功能，不需要额外操作。



# 第5节： 模块：CSS文件打包


webpack在生产环境中的作用之一：减少http请求数，把多个文件打包到一个js文件中，请求数可以减少好多。

学习css文件打包之前，**需要先对webpack.config.js里的Loaders配置项进行了解**。


## Loaders

Loaders是Webpack最重要的功能之一，也是如此盛行的原因。

通过配置不同的Loaders，Webpack可以用脚本和工具对不同的文件格式进行特定的处理。

例子：

* 可以把less, sass转换成css,而不使用其他工具
* 写代码时，可以用ES6, ES7语法，转换成大多数浏览器兼容的代码
* 可以把React中的jsx转换成JavaScript代码

**注意：**
所有Loaders都要在npm中单独安装，并在webpack.config.js中配置，下面对几种配置型简单梳理。
* test: 用于匹配处理文件扩展名的表达式，【必须设置】；
* use: loader名称，【必须配置，否则报错】；
* include/exclude: 手动添加必须处理的文件/文件夹，或屏蔽不需要处理的文件/文件夹,【可选】；
* query: 为loaders提供额外的设置选项，【可选】。
 
## 打包CSS文件

### 建立index.css文件

在src/css 目录下，建一个index.css文件
```
body {
    background-color: red;
    color: white;
}
```
css 文件建立好后，需要引入到入口文件中，才可以打包到dist中。

这里引入到entry.js中

src/entry.js首行加入
```
import css from './css/index.css';
```
### 这里行末一定要加分号，没加就无法编译CSS文件报错!!!!!!!

CSS 引入后，需要使用loader来解析CSS文件，这里用到style-loader,css-loader.

### style-loader [官网](https://www.npmjs.com/package/style-loader)
用来处理css文件中的url()等。

安装
```
npm install style-loader --save-dev
```

### css-loader [官网](https://www.npmjs.com/package/css-loader)
用来将css插入到页面的style标签。
安装
```
npm install css-loader --save-dev
```

两个都安装好后，开始配置loaders

### loaders配置
修改webpack.config.js中的module属性，代码如下：

webpack.config.js
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
},
```

### loader三种写法
1. 直接用use

```
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```
2. 把use换成loader
```
module: {
    rules: [
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
    ]
}
```
3. 用use+loader
这种最常用，因为每个都有不同的配置项！！
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
        }
    ]
}
```
#### 用哪种写法都可以，可以看出webpack的扩展和灵活性非常强。
最重要的是： 看见别人项目的其他写法也不要慌张，自己试试，有可能Get到新知识。

## **总结**
loader的使用决定了webpack水平的高低，一定要重视和练习。






# 第6节： 插件配置： 配置JS压缩
## 压缩JS代码
引入uglifyjs-webpack-plugin(js压缩插件，简称uglify)

注意： 虽然uglifyjs是插件，但webpack版本已默认集成，不需要再次安装。

### 引入
在webpack.config.js中引入插件，
```
const uglify = require('uglifyjs-webpack-plugin')
```
引入后，在plugins配置里new一个uglify对象。代码如下
```
plugins: [
    new uglify()
]
```

这里执行webpack是可以打包成功的

# 但是执行npm run server时，报错,原因~~还待查~~     已找到 ***
```
ERROR in entry.js from UglifyJs
Unexpected token: name (urlParts) [entry.js:317,4]

ERROR in entry2.js from UglifyJs
Unexpected token: name (urlParts) [entry2.js:317,4]
webpack: Failed to compile.
```
首先要先弄清楚什么是开发环境， 什么是生产环境。

开发环境基本不会对js进行压缩，在开发预览时，需要明确的报错行数和错误信息，所以没有必要压缩JavaScript代码。

生产环境才会压缩js代码，用于加快程序的工作效率。

devServer用于开发环境，而压缩js用于生产环境，

在开发环境中做生产环境的事情所以**webpack设置冲突报错**


# 第7节： 插件配置： HTML文件发布
之前的index.html是直接放在dist文件夹中的，这是不对的。应该放在src目录中。

这节就学习如何把HTML文件打包到生产路径下。

## 打包HTML文件

先将dist中的index.html剪切到src目录中，并去掉js引入代码(webpack会自动引入entry入口配置的js)，

因为这才是真实工作的目录结构。

### npm安装html-webpack-plugin [官网](https://www.npmjs.com/package/html-webpack-plugin)
```
npm install --save-dev html-webpack-plugin
```

### 配置webpack.config.js
引入html-webpack-plugin插件
```
const htmlPlugin = require('html-webpack-plugin')
```

### 在plugins里进行插件的配置，代码如下：
```
plugins: [
    new htmlPlugin({
        minify: {
            removeAttributeQuotes: true
        },
        hash: true,
        template: './src/index.html'
    })
],
```

* minify：是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号。
* hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
* template：是要打包的html模版路径和文件名称。
 
## 打包出错
```
ERROR in   Error: Parse Error: <!DOCTYPE>
  <html>
```

原因，html页面的声明，必须是
```
// <!DOCTYPE>
<!DOCTYPE html>
```

## 总结
html文件的打包可以有效的区分开发目录和生产目录，在webpack的配置中也要搞清楚哪些配置用于生产环境，哪些配置用于开发环境，避免两种环境的配置冲突。






# 第8节： 图片迈坑： css中的图片处理

webpack打包时遇到css中的图片处理坑。
* 在开发环境中找得到图片，一打包后就找不到
* 不知道如何正确引入HTML或CSS中的图片

### 3节课彻底走出webpack图片的坑


找张图片，在src目录新建一个images的文件夹。把图片放入images文件夹。

在index.html中增加一个div，

```
<div id="img"></div>
```
css

```
#img{
    background-image: url(../images/img.png);
    width:100px;
    height: 100px;
}
```

webpack 直接编译，报错
```
ERROR in ./src/images/img.png
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
```

## file-loader, url-loader

## 1. 命令行安装
```
 npm install --save-dev file-loader url-loader
```
### file-loader 
解决引用路径的问题，拿background样式用url引用背景图来说，webpack会将各个模块打包成一个文件，因此我们源代码样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在路径。这会导致图片引入失败。

这就是file-loader解决的。

file-loader可以解析项目中的url引入(不局限于css), 根据配置，将图片拷贝到相应的路径，再根据配置，打包后文件引用路径，使之指向正确的文件。

### url-loader
如果图片较多，会发送很多http请求，降低页面性能。

可以用url-loader解决。

url-loader会将引入的图片编码，生成DataURL(把图片转成一串字符),再把这串字符打包到文件中，最终只要引入这个文件就能访问图片。

图片较大，编码会消耗性能。url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURL,大于limit的会使用file-loader进行copy

## 2. 配置url-loader

webpack.config.js
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpg|gif)/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 500000
                    }
                }
            ]
        }
    ]
},
```

* test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
* use：是指定使用的loader和loader的配置参数。
* limit：是把小于500000B的文件打成Base64的格式，写入JS。


现在就可以使用webpack打包了~~~~

用npm run server ，可以在页面查看元素，查看图片的编码

## 为什么配置中只用了url-loader

为什么在配置中只用了url-loader，依然打包成功？

需要了解url-loader和file-loader关系

url-loader封装了file-loader，url-loader不依赖file-loader，即 使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。

url-loader工作分两种情况：
1. 文件大小小于limit，url-loader将文件转为DataURL(Base64格式)
2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader


也就是说，安装一个url-loader即可，但是为了以后操作方便，顺便安装了file-loader。

## 总结

本节学习了将小图打包成Base64格式， 对webpack图片打包有了基本的了解

# 第9节 图片迈坑： CSS分离与图片路径处理

主要学习：
1. 把CSS从JavaScript代码中分离出来，
2. 如何处理分离出来后的CSS中的图片路径不对的问题。


## CSS分离： extract-text-webpack-plugin [官网](https://www.npmjs.com/package/extract-text-webpack-plugin)
之前的css是打包到JavaScript代码中的。

有些页面，JavaScript代码很少，而css很多，要求将css单独提取出来，方便以后更改，遇到这种需求，

解决办法就是extract-text-webpack-plugin

这个插件可以完美解决提取CSS的需求。但webpack官网不建议这样做，他们认为css就应该打包到JavaScript中以减少http请求数。

但现实中的需求我们无法控制，有些需求是我们不能控制的，分离css就是这样一个既合理又不合理的需求。

### 1. npm 安装
```
 npm install --save-dev extract-text-webpack-plugin
```

### 2. 引入
安装完成后，需要先require引入
```
const extractTextPlugin = require('extract-text-webpack-plugin')
```

### 3. 设置Plugins
引入成功后，需要在plugins属性中进行配置。这里只要new一下这个对象。
```
plugins: [
    new htmlPlugin({
        minify: {
            removeAttributeQuotes: true
        },
        hash: true,
        template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css')
],
```

这里的/css/index.css是分离后的路径位置。注意： 这里路径前面不要加/,否则引用css的路径，会多一个/

### 4. 修改原来的stye-loader, css-loader

```
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
                        limit: 500000
                    }
                }
            ]
        }
    ]
},
```
完成4步操作后，可以用webpack打包。

### 打包结果：
- css被单独提取到css/index.css文件
- 图片也被Base64编码到index.css文件
- index.html文件中引入了index.css


## 图片路径问题

利用extract-text-wbpack-plugin 轻松的把css文件分离了出来，但css路径并不正确。

可以在这里先build一下看下效果。图片不会显示

**最好的解决方案，使用publicPath解决**

publicPath: 是在webpack.config.js文件中的output选项中，主要作用就是处理静态文件路径的。

### 1. 处理前，在webpack.config.js上方声明一个对象，叫website
```
// 教程里这里写的是IP地址
const website = {
    publicPath: 'http://localhost:8089/'
}
```

这里的ip和端口是本机的IP或DevServer配置的ip和端口。

#### 后面加/ 不加/，测试了一下不加/，可以查看css或图片路径，是不正确的
```
    // 错误的
    background-image: url(http://localhost:8089images/313455c00642024bfd21003ced8bf0e6.png);
    // 正确的    
    background-image: url(http://localhost:8089/images/313455c00642024bfd21003ced8bf0e6.png);

```


### 2. 在output选项中引用这个对象的publicPath属性
```
output: {
    // 输出的路径
    path: path.resolve(__dirname, 'dist'),
    // 输出文件的名称
    filename: '[name].js',
    publicPath: website.publicPath
},
```
### 3. 用webpack打包。
可以看到，文件中的相对路径被替换成绝对路径。这样来讲速度更快。

## 总结
实现了css分离，并处理了分离后图片路径不对的问题。

处理的方法要充分理解，在工作中经常用到。

### 更改webpack.config.js文件 不会热更新


# 第10节： 图片迈坑： 处理HTML中的图片

在webpack中不推荐使用img来引入图片，但我们通常都用这种写法。为此有人开发了：
**html-withimg-loader** [官网](https://www.npmjs.com/package/html-withimg-loader)

可以很好的处理在HTML中引入图片的问题。

### 1.安装
```
npm install html-withimg-loader --save
```
### 2. 配置loader
webpack.config.js
```
{
    test: /\.(html|html)$/i,
    use: ['html-withimg-loader']
}
```
### 3. 执行打包
可以发现images被很好的打包了。并且路径也完全正确

## 总结：
三节课的时间，讲了webpack图片中的坑，所有问题应该都可以解决了.


## 小知识


### 没有打包npm run build，直接npm run server,无法看到最新结果。
### 只有项目安装了webpack，如何打包

如果全局没有安装webpack的话，直接在命令行执行webpack会报错。
#### 解决办法：
在package.json中配置scripts选项，增加一个build命令，进行打包项目使用。
```
"scripts": {
    "server": "webpack-dev-server --open",
    "build":"webpack"
  },
```
配置完后，在终端输入**npm run build** 即可打包

### 如何把图片放到指定的文件夹下

前面打包的图片并没有放到images文件夹下，要放到images里，需配置url-loader ==outputPath==选项。
```
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
        }
    ]
},
```
这样再执行打包，图片都被打包到images文件里。





# 第11节： CSS 进阶： Less 文件的打包和分离

第5节中已经讲了CSS打包，分离。这节讲Less文件如何打包和分离。

Less是一门CSS预处理语言，扩展了CSS语言，增加了变量，Mixin，函数等特性，使CSS更易维护和扩展。

## 打包Less文件

### 1. 安装 [官网](https://www.npmjs.com/package/less-loader)
安装less服务
```
npm install --save-dev less
```
安装less-loader供打包使用
```
npm install --save-dev less-loader
```
也可以一条命令安装
```
npm install --save-dev less-loader less
```

### 2. loader配置
```
{
    test: /\.less$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings 
    }, {
        loader: "css-loader" // translates CSS into CommonJS 
    }, {
        loader: "less-loader" // compiles Less to CSS 
    }]
}
```

### 3. 编写一个less文件
css/black.less
```
@base: #000;
#gogo{
    width: 300px;
    height: 300px;
    background-color: @base;
}
```

### 4. 引入到entry.js
```
import less from './css/black.less';
```

可以打包看效果
发现打包到了entry.js中，没有提取到css文件中

## 把Less文件分离
之前讲了extract-text-webpack-plugin插件，分离Less也是用这个

### 配置less的loader
```
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
}
```

### 打包
会看到less被打包到index.css文件中

此外，在官网看到了，修改后缀名的配置
```
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
```


## 总结
通过这节课， 就可以很轻松的编写less文件啦


# 第12节： CSS进阶： SASS文件的打包和分离  [官网](https://www.npmjs.com/package/sass-loader)

上节学了less的打包，这节开始学习SASS打包

### 1. 安装两个包**node-sass，sass-loader**

```
npm install sass-loader node-sass webpack --save-dev
```
注意：

npm安装时，这个loader很容易安装失败。多次安装失败，最好把node_modules文件夹删除，再重新安装。

### 2. 编写loader配置

```
{
    test: /\.scss$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings 
    }, {
        loader: "css-loader" // translates CSS into CommonJS 
    }, {
        loader: "sass-loader" // compiles Sass to CSS 
    }]
}
```
注意loader的加载有先后顺序,可以直接从官网拷贝

### 3.SASS 文件的编写
nav.scss,别忘了引入到entry.js中
```
$nav-color: #FFF;
#nav {
    $width:100%;
    width: $width;
    height: 30px;
    backround-color: $nav-color;
}
```
```
import sass from './css/nav.scss';
```

此时，可以npm run server 查看效果。

### 4. 把SASS文件分离
```
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
```

至此，可以愉快的写sass代码了。

## 小知识
-D 等于--save-dev


# 第13节：CSS进阶： 自动处理CSS3属性前缀

css3属性不同浏览器对应的前缀名称不同，太多的话代码冗余工作繁杂。

这节学习如何用postcss-loader给css3属性自动添加前缀。


## 什么是属性前缀
CSS 属性前的-webkit,-ms,-moz这些前缀。为了兼容各个浏览器版本。

### PostCSS 
css的处理平台，可以实现css的很多功能，这里只介绍一个加前缀的功能。


### 1. 安装
需要安装两个包postcss-loader， autoprefixer(自动添加前缀的插件)
```
npm install --save-dev postcss-loader autoprefixer
```

### 2. postcss.config.js
PostCSS推荐在项目根目录(和webpack.config.js同级)，建一个postcss.config.js

```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```
引入了autoprefixer插件，让postCSS拥有添加前缀的能力。

### 3. 编写loader

```
{
      test: /\.css$/,
      use: [
            {
              loader: "style-loader"
            }, {
              loader: "css-loader",
              options: {
                 modules: true
              }
            }, {
              loader: "postcss-loader"
            }
      ]
}
```

#### 这里是提取css的loader配置

webpack.config.js
```
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
```

### 5. 在index.css中添加css样式
```
#img{
    background-image: url(../images/img.png);
    width:100px;
    height: 100px;
    transform: rotate(45deg);
    box-shadow: 1px 1px 0 rgba(0,0,0,.25);
    border-radius: 50%;
    display: flex;
}
```

打包，运行可以看到新加的样式都加上了前缀。




# 第14节： CSS进阶： 消除未使用的CSS
* 引用别的库如BootStrap这样的框架，会带很多CSS，但项目中只用了一部分。
* 随项目进展，CSS越来越多，开发时只考虑新增，造成CSS冗余

这节学习 用webpack消除未使用的CSS。

## PurifyCSS
PurifyCSS可以大大减少CSS冗余，比如我们经常使用的BootStrap(140KB)就可以减少到只有35KB大小。这在实际开发当中是非常有用的。

### 1. 安装PurifyCSS-webpack [官网](https://www.npmjs.com/package/purifycss-webpack)
```
npm i -D purifycss-webpack purify-css
```
-D 是--save-dev的缩写

### 2. 引入glob
node的glob模块可以根据配置的规则，获取对应的文件。

在webpack.config.js引入glob。
```
const glob = require('glob')

```

引入purifycss-webpack

```
const purifyCSSPlugin = require('purifycss-webpack')
```

### 3.配置plugins
在webpack.config.js的plugins里增加配置
```
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
    new purifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
],
```
这里的paths主要是寻找HTML模板，purifycss会根据这个配置遍历文件，查找哪些css被使用了。

**注意**：使用这个插件必须配合extract-text-webpack-plugin插件。

### 4.在index.css中添加一些没用的css
```
/* 多余的css */
.bu{
    backface-visibility: hidden;
    background-color: green;
    color: #FFF; 
}
.hefd{
    width: 200px;
    height: 200px;
    background-color: green;
}
```
执行打包，查看dist中的index.css内容，会发现没有多余的css.

## 总结
工作中一定要用这个插件，决定你的代码质量，非常有用。


# 第15节： 给webpack增加babel配置
虽然webpack3增加了ES6的语法支持，但实际效果并不好。
所以还是要加babel-loader配置。

这节学习如何增加Babel配置。

## babel是什么

Babel 是一个 JavaScript 编译器。用他可以
* 使用下一代的javaScript代码(ES6,ES7….)，即使这些标准目前并未被当前的浏览器完全支持。
* 使用基于JavaScript进行了扩展的语言，比如React的JSX。

### 1. Babel安装 [官网](https://www.npmjs.com/package/babel-loader)

先一次性安装所有依赖包
```
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```
这些包分别是：核心包，webpack使用的，es2015支持,react支持
### 2.在webpack中配置Babel
```
{
    test: /\.(jsx|js)$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                'es2015', 'react'
            ]
        }
    },
    exclude: /node_modules/
}
```
presets: 渲染器

不能转换所有的js，去除掉node_modules，

### 3.在entry.js中修改代码
```
import css from './css/index.css';
import less from './css/black.less';
import sass from './css/nav.scss';
{
    let str = 'Hello Webpack'
    document.getElementById('title').innerHTML = str;
}
```
现在打包可以看到let被转为var,做了兼容处理。
如果不适用babel转换的话，不会处理。


### .babelrc配置
babel的配置通常单独写在.babelrc文件里

在项目根目录新建.babelrc文件，把配置写到文件里。
```
{
    "presets": [
        "react", "es2015"
    ]
}
```

修改webpack.config.js的loader配置
```
{
    test: /\.(jsx|js)$/,
    use: {
       loader: 'babel-loader'
    },
    exclude: /node_modules/
}
```
## ENV [官网](https://www.npmjs.com/package/babel-preset-env)
> babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。
> 
> 目前我们写 javascript 代码时，需要使用 N 个 preset，比如：babel-preset-es2015、babel-preset-es2016。es2015 可以把 ES6 代码编译为 ES5，es2016 可以把 ES2016 代码编译为 ES6。babel-preset-latest 可以编译 stage 4 进度的 ECMAScript 代码。
> 
> 问题是我们几乎每个项目中都使用了非常多的 preset，包括不必要的。例如很多浏览器支持 ES6 的 generator，如果我们使用 babel-preset-es2015 的话，generator 函数就会被编译成 ES5 代码。
> 
> babel-preset-env 的工作方式类似 babel-preset-latest，唯一不同的就是 babel-preset-env 会根据配置的 env 只编译那些还不支持的特性。

### 安装

```
npm install --save-dev babel-preset-env
```

修改.babelrc里的配置文件，只要把es2015换成env就可以了。
```
{
    "presets": [
        "react", "env"
    ]
}
```

## 总结
这里学了怎么配置babel支持，并且动态支持最新配置。





# 第16节： 打包后如何调试

webpack打包后，代码无法调试。怎么解决？

### webpack支持生成sourceMap来方便调试。

使用webpack通过简单的devtool配置，webpack会自动生成source maps文件，map文件是一种对应编译文件和源文件的方法，方便调试。

## 四种选项

在配置devtool时，webpack提供了4种选项

### source-map
在一个单独的文件中生成一个完整且功能完全的文件。这个文件有最好的source map，但是它会减慢打包速度

### cheap-module-source-map
在一个单独的文件中产生一个不带映射列的map，不带映射列提高了打包速度，但也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列(符号)，会对调试造成不便。

### eval-source-map
使用eval打包源文件模块，在同一个文件中生产干净的完整版sourcemap，但对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段可以使用，生产阶段一定不要开启这个选项

### cheap-module-eval-source-map
这是在打包文件时最快生成sourcemap的方法，生成的sourcemap会和打包后的JavaScript同行显示，没有映射列，和eval-source-map有相似的缺点


#### 四种打包模式，由上到下越来越快。快的同时，也意味着对代码调试的困难越大。

建议：
    
如果大型项目可以使用source-map,中小型项目使用eval-source-map就可以完全应对。

强调：source-map只适用于开发阶段，上线一定要修改这些配置。

## 配置webpack.config.js
可以根据不同情况修改对应的值
```
output: {
    // 输出的路径
    path: path.resolve(__dirname, 'dist'),
    // 输出文件的名称
    filename: '[name].js',
    publicPath: website.publicPath
},
devtool: 'source-map',
```
## 总结
这节学习了配置devtool，方便在开发环境调试代码。
[一篇讲的不错的博客](http://www.cnblogs.com/hhhyaaon/p/5657469.html)

[官网地址](http://webpack.github.io/docs/configuration.html#devtool)

# 第17节： 实战技巧： 开发和生产并行配置
这节讲开发和生产不同环境的不同配置

## 依赖不同
开发环境和生产环境的依赖是不同的

* 开发依赖
    只在开发中用来帮助你进行开发，简化代码，或生成兼容设置的依赖包。在package.json中devDependencies中的包是开发使用的。在生产环境用不到。

* 生产依赖
    一些框架的核心代码，比如vue, element-ui, react,
    这些包在dependencies中

## npm安装
假如项目中使用jQuery库，一般有三种安装法。

### 1. 
```
npm install jquery
```
安装完成后，package.json中并没有这个包的依赖。如果别人协同开发，直接npm install，项目无法正常运行，不推荐。

### 2.
```
npm install jquery --save
```
安装完成后，在package.json的dependencies中。是生产环境需要依赖的包。上线时需要依赖。

### 3.
```
npm install jquery --save-dev
```
安装完成后，在package.json的devDevpendencies中,是开发环境依赖的包，上线不需要这些包的依赖。

### 安装全部依赖包
```
npm install
```
会安装package.json中的所有包

### 安装生产环境依赖包
```
npm install --production
```

## 配置生产和开发并行

以前的配置中设置了一个变量website,用于静态资源找到正确路径。如果生产环境和测试环境不一样，需要来回切换，这时候可用下面的方法配置。

### 修改package.json命令
添加dev何止，通过环境变量来区分。
```
"scripts": {
    "liveserver": "live-server ./ --port=9090",
    "dev": "set type=dev&webpack",
    "build": "set type=build&webpack",
    "server": "webpack-dev-server --open"
},
```

### 修改webpack.config.js文件
利用node的语法读取type的值，然后根据type的值进行判断设置不同的变量。
```

if(process.env.type === 'build') {
    const website = {
        publicPath: 'http://localhost:8089/'
    }
} else {
    const website = {
        publicPath: 'http://localhost:8089/'
    }
}
```
如果想看某个值，可以console.log打印出来
```
console.log(process.env.type)
```
打印console.log( encodeURIComponent(process.env.type) );发现报错

mac下的package.json设置
mac电脑需要把set换成export，并且多加一个&,具体代码
```
"scripts": {
    "server": "webpack-dev-server --open",
    "dev":"export type=dev&&webpack",
    "build": "export type=build&&webpack"
},
```

## 总结

通过配置不同的参数来区分不同的环境，从而达到不同环境打包不同代码。

# 第18节： 实战技巧： webpack模块化配置

所有配置文件都放在webpack.config.js中会显得代码冗余，不利于维护。

如何进行模块化？

可以把生产环境的写到一个模块中，开发环境、测试环境都分开放到一个文件中。

这节学习如何将webpack.config.js模块化

## js的模块化实现

先看一下es6中的模块化代码
```
function alertMsg (msg) {
    alert('info: ' + msg);
}
module.exports = alertMsg;
```
声明一个alertMsg方法，并把这个方法用module.exports暴露出去。

然后在其他文件中用import引入，并使用。
```
import alertMsg from './utils.js'
alertMsg();
```

了解了JavaScript的模块化后，来写webpack的模块化


## webpack模块化
这里用webpack.config.js中的entry入口哦文件进行模块化设置，单独做成一个模块

### 1. 在根目录建一个webpackConfig文件夹，新建entry_webpack.js，如下

```
// 声明entry 变量
const entry = {};
// 声明路径属性
entry.path = {
    entry: './src/entry.js',
    entry2: './src/entry2.js'
}

//模块化导出
module.exports = entry;
```


### 2. 


























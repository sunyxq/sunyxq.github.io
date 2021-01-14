# Webpack4基础配置

## webpack基本概念

1. 什么是webpack

   **webpack** 是一个现代 JavaScript 应用程序的*静态模块打包工具*：*webpack*分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并生成一个或多个 *bundle*，将其打包为合适的格式以供浏览器使用。

   

   **webpack构建**：

   `构建就是把源代码转换成发布到线上的可执行JavaScript，HTML，CSS代码，包括如下内容：`

   - 代码转换：TypeScript编译成JavaScript，SCSS或LESS编译成CSS等
   - 文件优化：压缩HTML、CSS、JavaScript代码，压缩合并图片等
   - 代码分割：提取多个公共代码、提取首屏不需要执行的代码让其异步加载
   - 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
   - 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器、nodemon
   - 代码校验：在提交代码前校验代码是否符合规范及单元测试是否通过
   - 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统

   构建其实是工程化、自动化思想在前端开发中的体现。把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。构建给前端开发注入了更大的活力，解放了生产力，更加方便了前端开发。

2. 什么是webpack模块

   - ES6 `import`语句
   - CommonJS `require()`语句
   - AMD `define`和`require`语句
   - CSS/SASS/LESS文件的`@import`语句
   - 样式（`url(…)`）或HTML文件(`<img src=… />`)中的图片链接

3. 搭建webpack环境

   node环境

   ```
   node -v 	// node版本
   npm -v 		// npm版本
   ```

4. 初始化项目

   ```
   mkdir webpack-project
   cd webpack-project
   npm init -y		// 初始化package.json
   ```

5. 安装webpack

   - 全局安装（不推荐）

   ```
   // 全局安装(不推荐)，因为如果有两个项目用了webpack不同版本，就会出现版本不统一运行不起来的情况。只有卸了当前版本安装对应版本非常麻烦。
   npm i webpack webpack-cli -g
   // 查看webpack版本
   webpack -v
   // 卸载webpack
   npm uninstall webpack webpack-cli -g
   ```

   - 本地安装（推荐）

   ```
   // 在项目安装webpack。可以在不同项目中使用不同的webpack版本
   cd webpack-project
   npm i webpack webpack-cli -D
   // 查看webpack版本
   npx webpack -v
   // 查看对应包的详细信息
   npm info webpack
   
   // 安装指定版本包
   npm i webpack@4.16.1 webpack-cli -D
   ```

   `webpack-cli`:在命令行可以正确使用webpack

6. webpack配置文件

   在项目根目录创建`webpack.config.js`文件，这是webpack默认配置文件

   ```
   /* webpack.config.js */
   
   const path = require('path')
   module.exports = {
   	// 默认是production，打包的文件默认被压缩。开发时设置为development，不被压缩
   	mode: 'development',
   	// 打包项目的入口文件
   	entry: './index.js',
   	// 打包项目的输出文件
   	output: {
   		// 自定义打包输出文件名
   		filename: 'bundle.js',
   		// 输出文件的绝对路径
   		path: path.resolve(__dirname, 'bundle')
   	}
   }
   ```

   运行打包命令：`npx webpack `,webpack会读取当前目录下默认配置文件`webpack.config.js`

   运行指定配置文件：`npx webpack --config webpack.config.js`

7. 配置scripts

   ```
   /* package.json */
   
   {
   	"script": {
   		"build": "webpack"
   	}
   }
   ```

8. webpack打包输出内容

   在控制台执行`npm run build`后，控制台输出：

   ```
   Hash:1b245e275a547956bf52 	//本次打包对应唯一一个hash值
   Version:webpack 4.29.6 			//本次打包对应webpack版本
   Time:162ms Built at:2019-4-11 23:13:43 //本次打包耗时，及打包的时间
   Asset Size Chunks Chunk Names //打包后的文件名，大小，id，入口文件名
   bundle.js 1.36 KiB 0 [emitted] main 
   Entrypoint main=bundle.js
   [0]./src/index.js 159 bytes {0}[built]
   [1]./src/header.js 187 bytes {e}[built]
   [2]./src/sidebar.js 193 bytes {e}[built]
   [3]./src/content.js 193 bytes {e} [built]
   
   ```

## webpack核心概念

1. 概念

   - Entry：入口，webpack执行构建的第一步将从Entry开始，可抽象成输入
   - Module：模块，在webpack里一切皆模块，一个模块对应一个文件。Webpack会从配置的Entry开始递归找出所有的依赖模块
   - Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并和分割
   - Loader：模块转换器，用于把模块原内容转换成新内容
   - Plugin：扩展插件，在Webpack构建流程中特定时机注入扩展逻辑来改变构建结果或做其他事情
   - Output：输出结果，在webpack经过一系列处理并得出最终想要的代码后输出结果

2. 配置

   配置webpack.config.js文件

   - entry：配置入口文件地址

   - output：配置出口文件地址

   - module：配置模块，主要用来配置不同文件的加载器

   - plugins：配置插件

   - devServer：配置开发服务器

     ```
     // 基于node的 遵循commonjs规范的
     let path = require('path');//node的模块
     module.exports = {
       entry:'./src/index.js', // 入口
       output:{
         filename:'build.js',
         // 这个路径必须是绝对路径
         path: path.resolve('./dist')
       }, // 出口
       devServer:{
         contentBase:'./dist',
         port:8080,
         compress:true,// 服务器压缩
         open:true,// 自动打开浏览器
         // hot:true//热更新
       },// 开发服务器
       module:{}, // 模块配置
       plugins:[], // 插件的配置
       mode:'development', // 可以更改模式
       resolve:{}, // 配置解析
     }
     // 在webpack中如何配置开发服务器 webpack-dev-server
     
     ```

## webpack基本配置

### Entry

入口文件类型：

1. 单入口 （string）

   ```
   /* webpack.config.js */
   
   entry: './src/index.js'
   ```

2. 多入口（Array）

   ```
   /* webpack.config.js */
   
   entry: ['./src/index.js', './src/main.js']
   ```

3. 多入口（Object）

   ```
   /* webpack.config.js */
   
   entry: {
   		main: './src/index.js',
   		bundle: './src/bundle.js'
   }
   ```

### output

```
/* webpack.config.js */

output: {
	filename: '[name].js',
	path: path.resolve(__dirname, 'dist'),
	publicPath: 'http://cdn.com'	//将注入到HTML中的js前面加上地址
}
```

### SourceMap配置

sourcemap：打包编译后的文件和源文件的映射关系，用于开发者调试用

- source-map：把映射文件生成到单独的文件，最完整但最慢
- cheap-module-source-map：在一个单独的文件中产生一个不带映射的map
- eval-source-map：使用eval打包源文件模块，在同一个文件中生成完整sourcemap
- cheap-module-eval-source-map：和打包后的js同行显示，没有映射了列

development环境推荐使用：

```
devtool: 'cheap-module-eval-source-map'
```



production环境推荐使用：

```
devtool: 'cheap-module-source-map'
```



### devServer

` npm i webpack-dev-server -D`

- contentBase：配置开发服务器运行时的文件根目录

- host：开发服务器监听的主机地址

- compress：开发服务器是否启动gzip等压缩

- prot：开发服务器监听端口

- hot：热更新

- hotOnly：热更新之后，浏览器是否重新刷新

- open：启动服务器时是否自动打开浏览器

  ```
  /* webpack.config.js */
  
  devServer: {
  	contentBase: path.resolve(__dirname, 'dist'),
  	host: 'localhost',
  	compress: true,
  	port: 8080,
  	hot: true,
  	hotOnly: true,
  	open: false
  }
  ```

  ```
  /* package.json */
  
  "scripts": {
  	"server": "webpack-dev-server",
  	"build": "webpack"
  }
  ```

  

### Loader

webpack可以使用loader来预处理文件，就是通过使用不同的loader，webpack可以把不同的静态文件都编译成js文件，如css、sass、less、ES6/7、vue、jsx等。

- test: 匹配处理文件扩展名的正则表达式
- use：loader名称
- include/exclude：手动指定必须处理的文件或不需要处理的文件夹
- query：为loader提供额外的设置选项

配置loader的三种写法

- use

  ```
  /* webpack.config.js */
  
  module: {
  	rules: [
  		{
  			test: /\.css$/,
  			use: ['style-loader', 'css-loader']
  		}
  	]
  }
  ```

  

- loader

  ```
  /* webpack.config.js */
  
  module: {
  	rules: [
  		{
  			test: /\.js$/,
  			exclude: /node_modules/,
  			loader: 'babel-loader'
  		}
  ]}
  ```

  

- use + loader

  ```
  /* webpack.config.js */
  
  module: {
  	rules: [
  		{
  			test: /\.(png|jpg|jpeg|gif)$/,
  			use: [
  				{
  					loader: 'url-loader',
  					options: {
  						name: '[name].[ext]',
  						outputPath: 'images/'
  						limit: 10 * 1024
  					}
  				}
  			]
  		}
  	]
  }
  ```

  #### 加载css文件

  `npm i style-loader css-loader -D`

  ```
  /* webpack.config.js */
  
  module: {
  	rules: [
  		{
  			test: /\.css$/
  			use: ['style-loader', 'css-loader'],	//从右向左，从下到上依次解析，webpack特性
  			include: path.join(__dirname, './src'),
  			exclude: /node_modules/
  		}
  	]
  }
  ```

  #### 编译SASS或LESS

  ```
  npm i sass-loader node-sass -D
  ```

  ```
  module: {
  	rules: [{
  		test: /\.scss$/,
  		use: [
  			'style-loader',	//将JS字符串生成style节点
  			'css-loader',		// 将css转换成CommonJS模块
  			'sass-loader'		// 将Sass编译成css，默认使用node sass
  		]
  	}]
  }
  ```

  #### 添加CSS3属性前缀

  为兼容多种浏览器，有时我们需要加入-webkit、-ms、-o、-moz这些前缀

  - Trident内核：IE浏览器为主要代表，前缀为-ms
  - Gecko内核：Firefox浏览器为主要代表，前缀为-moz
  - Presto内核：Opera浏览器为主要代表，前缀为-o
  - Webkit内核：Chrome和Safari为代表，前缀为-webkit

  `npm i postcss-loader autoprefixer -D`

  项目根目录创建`postcss.config.js`

  ```
  /* postcss.config.js */
  
  module.exports = {
  	plugins: [require('autoprefixer')]
  }
  ```

  ```
  /* webpack.config.js */
  
  module: {
   rules: [{
   		test: /\.scss$/,
   		use: ['style-laoder', 'css-loader', 'postcss-loader', 'scss-loader'],
   		include: path.join(__dirname, './src'),
   		exclude: /node_modules/
   }]
  }
  ```

#### 处理ES6/7，转义为ES5

```
npm i babel-loader @babel/core -D
// 生产依赖，兼容低版本浏览器
npm i @babel/polyfill -S
```

```
/* webpack.config.js */

module: {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,	//不需要对第三方模块进行转换，耗费性能
			loader: 'babel-loader'
		}
	]
}
```

`npm i @babel/preset-env -D`

`npm i babel-plugin-dynamic-import-webpack -D`

`npm i @babel/runtime -D `

`npm i @babel/runtime-corejs2 -D`

在项目根目录新建`.babelrc`

```
/* .babelrc */

{
	"presets": [["@babel/preset-env", {
		targets: {
			chrome: '67'
		},
		corejs: 2,
		useBuildIns: 'usage'	// 按需添加polyfill,把用到的代码转换成低版本浏览器兼容的
	}]],
	"plugins": ["dynamic-import-webpack"]
}
```

#### 处理图片加载

`npm i file-loader url-loader -D`

```
module: {
	rules: [
		{
			test: /\.(png|jpg|jpeg|gif)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/',
					limit: 10 * 1024
				}
			}]
		}
	]
}
```

#### 处理字体图标

将阿里矢量库字体图标下载到本地，解压。将`iconfont.eot`、`iconfont.svg`、`iconfont.ttf`、`iconfont.woff`文件放入项目中的新建目录fonts中，将`iconfont.css`文件拷贝项目中，修改相应引用路径。

`npm i file-loader -D`

```
module: {
	rules:[{
		test: /\.(eot|ttf|svg|woff)$/,
		use: ['file-loader']
	}]
}
```

### Plugin

plugin可以在webpack运行到某个时刻帮你做一些事情，使用plugins让打包更便捷。

#### HtmlWebpackPlugin

HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并将打包生成的js自动引入到这个html文件中

`npm i html-webpack-plugin -D`

```
/* webpack.config.js */

const HtmlWebpackPlugin = reuqire('html-webpack-plugin')

plugins: [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	})
]
```

#### CleanWebpackPlugin

自动清除上一次打包的dist文件

`npm i clean-webpack-plugin -D`

```
/* webpack.config.js*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

plugins: [
	new CleanWebpackPlugin()
]
```

#### 热模块替换（HMR）

```
/* webpack.config.js */

const webpack = require('webpack')
plugins: [{
	new webpack.HotModuleReplacementPlugin()	//使用模块热更新插件
}]
```

### 静态资源拷贝(CopyWebpackPlugin)

`npm i copy-webpack-plugin -D`

> 将`public/js`目录拷贝至`dist/js`目录

```
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	plugins: [
	  new CopyWebpackPlugin([{
	    from: './src/*.js',
	    to: path.resolve(__dirname, 'dist', 'js'),
	    flatten: true  // 默认false,为true时，只拷贝文件，不会拷贝文件夹路径
	  }], {
	    ignore: ['base.js']	// 过滤某个或某些文件
	  })
	]
}
```

### ProvidePlugin

`ProvidePlugin`提供全局变量，不需要`import`或`require`就可以在项目中到处使用。

```
module.exports = {
	plugins: [
		new webpack.ProvidePlugin({
		  React: 'react',
		  Component: ['react', 'Component'],
		  Vue: ['vue/dist/vue.esm.js', 'default'],
      $: 'jquery',
      _map: ['lodash', 'map']
		})
	]
}
```

另外，如果项目启用了`eslint`，需要修改`eslint`配置：

```
{
  "globals": {
    React: true,
    Vue: true
  }
}
```

### 定义环境变量

```
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),  // 字符串
      FLAG: 'true'		// FALG是Boolean类型
    })
  ]
}
```



### Development和Production模式区分打包

`npm i webpack-merge -D`

项目根目录建立build目录并新建`webpack.dev.js`、`webpack.prod.js`和`webpack.common.js`配置文件

```
/* webpack.common.js */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test： /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},{
				test: /\.(png|jpg|jpeg|gif)$/i,
				use: [{
					loader： 'url-loader',
					options： {
						name： '[name].[ext]',
						outputPath: 'images/',
						limit： 10 * 1024
					}
				}, {
					test： /\.(eot|ttf|svg)$/,
					loader: 'file-loader'
          },{
          	test: /\.scss$/,
          	use: ['style-loader', {
          		loader: 'css-loader',
          		options: {
          			importLoaders: 2,
          			modules: true		// css模块
          		}
          	}, 'postcss-loader', 'sass-loader']
          }, {
          	test: /\.css$/,
          	use: ['style-loader', 'css-loader', 'postcss-loader']
          }
          ]
			}
		]
	},
	pliugins: [
		new HtmlWebpackPlugin({
			template： 'src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	output: {
		filename： '[name].js',
		path： path.resolve(__dirname, '../dist'),
	}
}
```

```
/* webpack.dev.js */

const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./common.config.js')

const devConfig = {
	mode： 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
    host: 'localhost',
    port: 8080,
    hot: true,
    hotOnly: true,
    open: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports： true
	}
}

module.exports = merge(commonConfig, devConfig)
```

```
/* webpack.prod.js */

const merge = require('webpack-merge')
const commonConfig = require('.webpack.common.js')

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map'
}
module.exports = merge(commonConfig, prodConfig)
```

```
/* package.json */

"scripts": {
	"server": "webpack-dev-server --config ./build/webpack.dev.js",
	"dev": "webpack --config ./build/webpack.dev.js",
	"build": "webpack --config ./build/webpack.prod.js"
}
```

## webpack进阶

### Tree Shaking

只支持ES module，如`import`和`export`静态结构特性的引入。当引入一个模块时，不引入所有代码，只引入需要的代码。

```
/* webpack.dev.js */

optimization: {
	usedExports: true, 	//在开发环境加，生产环境不加
}
```

```
{
	"sideEffects": ["*.css"], // 对所有的css文件不使用Tree Shaking。如果填false，就都需要用到Tree Shaking
}
```

### CSS文件分割和代码压缩

抽离css文件

`npm i mini-css-extract-plugin -D`

压缩css文件

`npm i optimize-css-assets-webpack-plugin -D`

```
/* webpack.prod.js */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
+				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'postcss-loader',
				'sass-loader',
				
			]
		}, {
			test: /\.css$/,
			use: [
+				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
+	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
+		new MiniCssExtractPlugin({
			filename: '[name].css',//直接引用的css文件
			chunkFilename: '[name].chunk.css'//间接引用的css文件
		})
	]
}

module.exports = merge(commonConfig, prodConfig);

```

```
/* webpack.dev.js */

const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'postcss-loader',
				'sass-loader',
				
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
}

module.exports = merge(commonConfig, devConfig);

```

```
/* webpack.common.js */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	optimization: {
		usedExports: true,//TreeShaking
		splitChunks: {
      chunks: 'all'
    }
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}

```

```
/* package.json */

{
    "sideEffects": ["*.css"] //除了css文件，其余的都TreeShaking
}

```

### 代码分割(Code Splitting)

`npm i lodash -S`

`npm i babel-plugin-dynamic-import-webpack -D`

1. 代码同步分割：只需要在webpack.common.js中做optimization的配置即可

   ```
   /* webpack.common.js */
   
   optimization： {
   	splitChunks: {
   		chunks： 'all'
   	}
   }
   ```

   

2. 代码异步分割：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

   ```
   /* .babelrc */
   
   {
   	presets: [
   		[
   			"@babel/preset-env", {
   				targets: {
   					chrome: "67",
   				},
   				useBuiltIns: 'usage'
   			}
   		],
   		"@babel/preset-react"
   	],
   +	plugins: ["@babeL/plugin-syntax-dynamic-import"]
   }
   ```

3. SplitChunkPlugin配置参数详情

   ```
   /* webpack.config.js */
   
   +    optimization:{
   +       splitChunks:{ //启动代码分割,不写有默认配置项
   +            chunks: 'all',//参数all/initial/async，只对所有/同步/异步进行代码分割
                 minSize: 30000, //大于30kb才会对代码分割
                 maxSize: 0,
                 minChunks: 1,//打包生成的文件，当一个模块至少用多少次时才会进行代码分割
                 maxAsyncRequests: 5,//同时加载的模块数最多是5个
                 maxInitialRequests: 3,//入口文件最多3个模块会做代码分割，否则不会
                 automaticNameDelimiter: '~',//文件自动生成的连接符
                 name: true,
               cacheGroups:{//对同步代码走缓存组
                vendors: {
                     test: /[\\/]node_modules[\\/]/,
                     priority: -10,//谁优先级大就把打包后的文件放到哪个组
       			filename:'vendors.js'
                   },
               default: {
                 minChunks: 2,
                 priority: -20,
                 reuseExistingChunk: true,//模块已经被打包过了，就不用再打包了，复用之前的就可以
                 filename:'common.js' //打包之后的文件名   
               }
           }
   +        }  
   +    }
   ```

4. 代码分析

   `npm i webpack-bundle-analyzer -D`

   ```
   /* webpack.prod.js */
   
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   
   plugins: [
           new BundleAnalyzerPlugin({
               analyzerMode: 'server',
               analyzerHost: '127.0.0.1',
               analyzerPort: 8889,
               reportFilename: 'report.html',
               defaultSizes: 'parsed',
               openAnalyzer: true,
               generateStatsFile: false,
               statsFilename: 'stats.json',
               statsOptions: null,
               logLevel: 'info',
           }),
       ],
   ```

   

   ```
   /* package.json */
   
   "scripts": {
   	  "analyze": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",
   }
   ```

   

5. 预取/预加载模块

   ```
   // 预取(推荐)
   import(/* webpackPrefetch: true */ 'LoginModal');
   // 预加载
   import(/* webpackPreload: true */ 'LoginModal');
   ```

   /* webpackPrefetch: true */：把主加载流程加载完毕，在空闲时在加载其他，等再点击其他时，只需要从缓存中读取即可，性能更好。推荐使用，提高代码利用率。把一些交互后才能用到的代码写到异步组件里，通过懒加载的形式，去把这块的代码逻辑加载进来，性能提升，页面访问速度更快。

   /* webpackPreload: true */: 和主加载流程一起并行加载。

### 浏览器缓存

```
/* webpack.common.js */

optimization: {
	runtimeChunk: {/兼容老版本webpack4，把manifest打包到runtime里，不影响业务代码和第三方模块
		name: 'runtime'
	}
}
output: {
	path: path.resolve(__dirname, '../dist')
}
```

```
/* webpack.dev.js */

output: {
	filename: '[name].js',
	chunkFilename: '[name].chunk.js'
}
```

```
/* webpack.prod.js */

output: {
	filename: '[name].[contenthash].js',
	chunkFilename: '[name].[contenthash].js'
}
```



[参考]

[掘金-从基础到实战webpack4详解](https://juejin.im/post/5cb36a3ef265da03a1581d6d)


# 自定义配置CRA

> 使用`react-app-rewired`和`customize-cra`自定义配置CRA。[github](https://github.com/sunyxq/custome-cra-config.git)

## 初始化项目

```bash
  // 新建项目
  create-react-app custome-cra-config
  // 初始化git
  git init
  // 添加git远程仓库
  git remote add origin https://xxxx.git
  git add .
  git commit -m 'init project'
  git push origin master
  git push --set-upstream origin master
```

## 添加自定义配置文件

1. 安装`react-app-rewired`和`customize-cra`
```bash
  npm install react-app-rewired customize-cra -D
```

2. 项目根目录新建`config-overrides.js`
```bash
  // 新建config-overrides.js
  touch config-overrides.js
```

3. 初始配置`config-overrides.js`
```js
  const { override } = require('customize-cra')
  module.exports = override()
```

4. 修改`package.json`
```json
  "script": {
    "start": "react-app-rewired start",
    "build:dev": "react-app-rewired build",
    "build": "react-app-rewired build"
  }
```

## 配置多环境(`dotenv-cli`)
1. 安装`dotenv-cli`
```bash
  npm install dotenv-cli -D
```
2. 新建`env`文件
```bash
  // 新建.env文件，配置本地开发环境
  touch .env
  // 新建.env.prd.local文件，配置本地正式环境
  touch .env.prd.local
  // 新建.env.dev文件，配置测试环境
  touch .env.dev
  // 新建.env.prd 文件，配置正式环境
  touch .env.prd
```
3. 修改`package.json`

```json
  "script": {
    "start": "dotenv -e .env react-app-rewired start",
    "build:dev": "dotenv -e .env.dev react-app-rewired build",
    "start:prd": "dotenv -e .env.prd.local react-app-rewired start",
    "build": "dotenv -e .env.prd react-app-rewired build"
  }
```
4. 归并`.env`文件(可选)
- 新建`env`文件夹
```bash
  mkdir env 
```
- 移动`.env*`至`env`目录
```bash
  mv .env env/.env
  mv .env.dev env/.env.dev
  mv .env.prd env/.env.prd
  ...
```
- 修改`package.json`
```js
  "start": "dotenv -e env/.env react-app-rewired start",
  "build:dev": "dotenv -e env/.env.dev react-app-rewired build",
  "build": "dotenv -e env/.env.prd react-app-rewired build",
```

## 配置别名(alias)
```js
  const { addWebpackAlias } = require('customize-cra') 
  override(
    addWebpackpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '@util': path.resolve(__dirname, 'src/util'),
    })
  )
```

## 配置外部扩展(externals)
1. 在`HTML`中引入库(包)
```html
  <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
2. 配置外部扩展
```js
  const {addWebpackExternals} = require('customize-cra')
  override(
    addWebpackExternals({
      jquery: 'jQuery',
      vue: 'Vue'
    })
  )
```
3. 在项目中按模块引入
```jsx
  import $ from 'jquery'
  $('#count').css('color', '#f00')
```

## 自动加载模块(ProvidePlugin)
```js
  const {addWebpackPlugin} = require('customize-cra')
  override(
    addWebpackPlugin(new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      Vue: ['vue/dist/vue.esm.js', 'default'],
      _map: ['lodash', 'map']
    }))
  )
```
自动加载模块而不用到处`import`或`require`

## 配置按需加载(`babel-plugin-import`)
```js
  const {fixBabelImports} = require('customize-cra')
  override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    fixBabelImports('lodash', {
      libraryDirectory: '',
      camel2DashComponentName: false
    })
  )
```

## 配置插件(`Plugins`)

### `webpackbar`
```js
  // install
  npm install webpackbar -D
  // config
  const {addWebpackPlugin} = require('customize-cra')
  const WebpackBar = require('webpackbar')
  override(
    addWebpackPlugin(new WebpackBar())
  )
```

### `friendly-errors-webpack-plugin`
```js
  // install
  npm install friendly-errors-webpack-plugin -D
  // config
  const {addWebpackPlugin} = require('customize-cra')
  const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
  override(
    addWebpackPlugin(new FriendlyErrorsWebpackPlugin())
  )
```

### `speed-measure-webpack-plugin`
```js
  // install
  npm install speed-measure-webpack-plugin -D
  // config
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
  const smp = new SpeedMeasurePlugin()
  module.exports = smp.wrap(override(
    ...
  ))
```
`speed-measure-webpack-plugin`插件可以测量各个插件和`loader`所花费的时间，配置之后构建项目，通过对比构建时间信息来确定优化效果

### `HardSourceWebpackPlugin`
```js
  // config
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  override(
    addWebpackPlugin(new HardSourceWebpackPlugin())
  )
```
`hard-source-webpack-plugin`插件为模块提供中间缓存，缓存默认的存放路径是: `node_modules/.cache/hard-source`

### `webpack-bundle-analyzer`

通过`webpack-bundle-analyzer`分析包大小，找到需要优化的打包项。
1. 安装`webpack-bundle-analyzer`
```bash
  npm install webpack-bundle-analyzer -D
```
2. 新建`env`
```bash
  echo 'REACT_APP_ANALYZE = true' > .env.analyze
```
3. 修改`package.json`
```
  "script": {
    ...
    "analyze": "dotenv -e .env.analyze react-app-rewired build"
  }
```
4. 配置`config-overrides.js`
```js
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const setAnalyze = () => config => {
    if(process.env.REACT_APP_ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config
  }

  override(
    setAnalyze()
  )
```
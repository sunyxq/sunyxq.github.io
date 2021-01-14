# Webpack优化

webpack优化分为构建速度优化和构建结果优化

## 构建速度优化
目标：**保证构建结果正确（构建结果和优化前一致或更优）的前提下**，减少构建时间。
> 构建速度优化可以通过插件SMP(`speed-measure-webpack-plugin`)测量各个插件(`plugins`)和`loader`花费的时间，来确定优化效果。

### 主要手段
- 限制范围(include, exclude)
- 减少代码体积(dll, dynamic-import, )
- 多线程打包(`thread-loader`、`happypack`)
- 使用缓存

### 限制范围
- 限制`loader`只处理特定目录
```js
module.exports = {
  module: {
    rules: [{
      test: /.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader'
    }]
  }
}
```
- 加快解析(`resolve`)速度
```js
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'scr'),
      '@utils': path.resolve(__dirname, 'utils'),
    }
  }
}
```

## 多线程打包
使用`thread-loader`,把`thread-loader`放置在其他`loader`之前，那么放置这个`loader`之后的`loader`会在一个单独的`worker`池中运行。
```js
module.exports = {
  module: {
    rules: [{
      test: /.js$/,
      use: ['thread-loader', 'cache-loader', 'babel-loader']
    }]
  }
}
```

## 使用缓存
- webpack和一些loader/plugin都有cahce选项，开启cache可以提升构建性能。
```js
module.exports = {
  module: {
    rules: [{
      test: /.js$/,
      use: ['babel-loader?cacheDirectory'],
      include: path.resolve(__dirname, 'src')
    }]
  }
}
```
使用`cache-loader`
`cache-loader`配置很简单，直接放在其他`loader`之前
```js
module.exports = {
  module: {
    rules: [{
      test: /.js$/,
      include: path.resolve(__dirname, 'src'),
      use: ['cache-loader', 'babel-loader']
    }]
  }
}
```

使用`HardSourceWebpackPlugin`为模块提供中间缓存，缓存默认存放路径为`node_modules/.cache/hard-source`

### DllPlugin
`DllPlugin`和`DLLReferencePlugin`可以实现拆分`bundles`,可以大大提升构建速度
```js
module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}
```

## 构建结果优化
- 包大小优化，缓存优化

> 构建结果优化通过`webpack-bundle-analyzer`查看各个包的大小。

### 包大小优化，缓存优化

## 运行优化
- 静态资源CDN
- 浏览器缓存
- 资源动态加载，组件按需加载

## 参考
1. [webpack构建速度与结果优化](https://huangxsu.com/2018/08/12/webpack-optimization/)
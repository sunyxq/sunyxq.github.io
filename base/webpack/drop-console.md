# 去除正式环境调试日志(console)
开发中我们经常会使用`console.log()`调试检查代码，但这些日志只供开发人员使用，因此在线上环境我们需要删除`console.log()`或对其进行注释，接下来我们介绍几种方法(以下用法续接[自定义配置CRA](./custome-cra-config.md))：

## 1.使用babel-plugin-transform-remove-console
```js
  const { addBabelPlugin } = require('customize-cra')
  const isProduction = process.env.NODE_ENV === 'production'

  override(
    isProduction && addBabelPlugin(["transform-remove-console", {exclude: ["warn", "error"]}])
  )
```

## 2.使用terser-webpack-plugin
```js
const dropConsole = () => config => {
  if(config.optimization.minimizer) {
    config.optimization.minimize.forEach(minimizer => {
      if(minimizer.constructor.name === 'TerserPlugin') {
        minimizer.options.terserOptions.compress.drop_console = true
      }
    })
  }
  return config
}

override(
  dropConsole()
)
```
`CRA`默认配置了`terser-webpack-plugin`,因此我们只需在`terser-webpack-plugin`的配置项中加上`drop_console=true`就行

## 3.重写console.log
```js
if(process.env.NODE_ENV === 'production') {
  console.log = function() {}
}
```
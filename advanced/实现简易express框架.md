# 实现简易express框架

## expressjs基本用法
```js
const express = require('express')
// 获取app对象
const app = express()

// 设置中间件
app.use((req, res, next) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  next()
})

app.use('/name', (req, res, next) => {
  console.log('获取name中间件')
  next()
})

// 设置路由
app.get('/', (req, res) => {
  res.end('Express, 你好')
})
app.get('/name', (req, res) => {
  res.end('这是一个express教程')
})

// 错误捕获中间件
app.use((err, req, res, next)) {
  console.log(err)
}

// 设置监听端口
app.listen(3000, () => {
  console.log('the server is running at:http://localhost:3000')
})
```
以上是`expressjs`基础用法，包含创建对象、监听端口、设置路由、设置中间件和错误处理中间件。

## 实现简易express框架
1. 初始化创建服务对象的工厂函数。
```js
function createApplication() {
  function app(req, res) {
    res.end('hello express')
  }
  return app
}
module.exports = createApplication
```
2. 服务监听函数
```js
  const http = require('http')
  ...
  app.listen = function(port, handler) {
    const server = http.createServer(app)
    server.listen(port, handler)
  }
  ...
```
到这里，就可以启动最简单的服务。
3. 设置路由函数
首先实现一个单一的`get`方法
```js
  ...
  app.get = function (req, res) {
    
  }
  ...
```
4. 设置中间件函数
```js
```
5. 错误处理中间件
```js
```
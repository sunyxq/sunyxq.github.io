const http = require('http')
const url = require('url')

const express = () => {

  function app(req, res) {
    // console.log(req.url, req.method, url.parse(req.url, true));
    const m = req.method.toLowerCase()
    const { pathname } = url.parse(req.url, true)
    let i = 0
    function next(err) {
      // 无法匹配到路由, 说明路径不存在
      if (app.routes.length === i) return res.end(`Cannot ${m} ${pathname}`)
      const { method, url, handle } = app.routes[i++]
      if (err) {  // 判断是否有错误，有错误就执行错误中间件监听函数
        if(handle.length === 4) {   // 错误中间件监听函数有4个参数
          handle(err, req, res, next)
        } else {
          // 如果没匹配到就将err继续传递
          next(err)   // 继续找下一个layer函数
        }
      } else {
        if (method === 'middle') {  // 处理中间件
          if (url === '/' || url === pathname || pathname.startsWith(url + '/')) {
            handle(req, res, next)
          } else {
            next()
          }
        } else {    // 处理路由
          if ((m === method || method === 'all') && (pathname === url || url === '*')) {
            handle(req, res)
          } else {
            next()
          }
        }
      }

    }
    next()

    // for (const route of app.routes) {
    //   const {method, url, handle} = route
    //   if((m === method || method === 'all') && (pathname === url || url === '*')) {
    //     handle(req, res)
    //   }
    // }
    // res.end(`Cannot ${m} ${pathname}`)
  }
  app.routes = []
  app.use = function (url, handle) {
    if (typeof handle !== 'function') {
      handle = url
      url = '/'
    }
    const layer = {
      method: 'middle',
      url,
      handle,
    }
    app.routes.push(layer)
  }

  app.use((req, res, next) => { // express内置中间件
    const {pathname, query} = url.parse(req.url, true)
    let [hostname] = req.headers['host'].split(':')
    req.path = pathname
    req.query = query
    req.hostname = hostname
    next()
  })
  app.all = function (url, handle) {
    const p = {
      method: 'all',
      url,
      handle,
    }
    app.routes.push(p)
  }
  http.METHODS.forEach(method => {
    method = method.toLocaleLowerCase()
    app[method] = function (url, handle) {
      const p = {
        method,
        url,
        handle,
      }
      app.routes.push(p)
    }
  })

  app.listen = function (...args) {
    const server = http.createServer(app)
    server.listen(...args)
  }

  return app
}

module.exports = express
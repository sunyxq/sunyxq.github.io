# 手动实现源码

## 实现new操作符
1. 创建新对象
2. 新对象原型(`__proto__`)指向构造函数原型对象
3. 绑定this到新对象
4. 执行构造函数，如没有返回值就返回新对象，有返回值就返回
```js
function create(fn, ...args) {
  let obj = {}
  Object.setPropertyOf(obj, fn.prototype)
  let res = fn.apply(obj, args)
  return res ? res : obj
}
```

## 实现instanceof操作符
判断对象原型链(`__proto__`)上是否有构造函数
```js
function instance_of(obj, fn) {
  if(obj === null) return false
  let proto = Object.getPrototypeOf(obj)
  while(proto !== null) {
    return true
  }
}
```

## 实现Promise

## 实现Promise.all
```
Promise.myApp = function(args) {
  args.forEach(async arg)
}
```

## 实现Promise.race

## 实现Promise.retry

# ES新特性

## ES2015

## ES2016

## ES2017
- Array.prototype.includes

判断数组是否包含某项
```js
let arr = ['a', 'b', 'c']
// old
arr.indexOf('b') >= 0  // true
arr.indxOf('d') >= 0 // false
// new
arr.includes('b') // true
arr.includes('d') // false
```
- `**`

幂运算符
```js
// old
Math.pow(2, 10)
// new
2 ** 10 // 1024
```

## ES2018

## ES2019

## ES2020

- 可选链操作符(`?.`)

`可选链操作符`能够安全地访问对象的深嵌套属性，而不必检查每个属性是否存在。以前使用`&&`运算符一层一层检查对象属性或使用`lodash`的`get`方法。
```js
const obj = {
  a: {
    name: 'es'
  },
  b: ''
}
// old
console.log(obj && obj.a && obj.a.name) // log: es
console.log(obj && obj.b && obj.b.name) // log: ''
// now
console.log(obj?.a?.name)   // log: es
console.log(obj?.b?.name)   // log: undefined
```
- 空值合并操作符(`??`)

**空值合并操作符**允许您检查`nullish`值而不是`falsey`值。`Nullish`值是指`null`或`undefined`的值。 而`falsey`值是诸如空字符串(`''`)、数字(`0`)、`undefined`、`null`、`false`、`NaN`等值
```js
let a = undefined
let b = null
let c = 0
let d = 'str'
console.log(a ?? 'a')   // log: a
console.log(b ?? 'b')   // log: b
console.log(c ?? 'c')   // log: 0
console.log(d ?? 'd')   // log: str
```

- 私有字段(`#`)
- 静态字段(`static`)
- 顶级Await(`Top Level Await`)
- Promise.allSettled
- 动态引入(`Dynamic import`)
- 全局对象(`globalThis`)

## 参考
1. [ECMAScript 2020 新特性](https://juejin.im/post/5ec34ed96fb9a0437b76f638#heading-5)
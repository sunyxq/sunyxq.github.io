# 柯里化

## 什么是柯里化
`Currying`(柯里化)是这么一种机制，它将一个接收多个参数的函数，拆分成多个接收单个参数的函数。
参考一下代码：
```js
function add(x, y) {
  return x + y
}

add(2, 3)  // 5
```
`add`接收两个参数`x`，`y`，并返回它们的和`x + y`。
经过`curry`处理，函数形成如下形式：
```js
function add(x){
  return function (y) {
    return x + y
  }
}

add(2)(3) // 5
let add2 = add(2)
add2(3)  // 5
```
`add`接收一个参数`x`，返回另一个接收一个参数`y`的函数.

## 偏函数
区别于`Currying`，如果在拆分入参的过程中，这些拆分出来的函数不是一次只应用其中的一个，而是任意多个，则这些函数就是部分应用(`Partial application`)了原函数中的入参，称作偏函数。
参考如下函数：
```js
function sum(x, y, z) {
  return x + y + z
}
```
如下的函数就都是偏函数，它们都部分应用了`sum`的入参：
```js
function partial1(x) {
  return function(y, z) {
    return x + y + z
  }
}
function partial2(x, y) {
  return function(z) {
    return x + y + z
  }
}
```
偏函数中入参的拆分和部分应用，并不仅限于一层的拆分，可以是任意多次的
```js
function partial3(x) { // curry函数
  return function(y){
    return function(z) {
      return x + y + z
    }
  }
}
```

## 函数组合(`compose`)
```js
const compose = fn1 => fn2 => args => fn1(fn2(args)) 
```
`compose`还不够一般化，只能接收两个函数并对其进行结合
```js
const pipe = (...fns) => args => fns.reduce((res, fn) => fn(res), args)
```

## 参考
1. [Currying 及应用](https://github.com/wayou/wayou.github.io/issues/144)
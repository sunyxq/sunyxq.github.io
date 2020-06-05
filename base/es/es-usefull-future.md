# ES6+实用特性

# 展开运算符
数组和对象都可以使用展开运算符
```js
// 数组
let arr1 = [1, 2, 3]
let arr2 = [4, 5, ...arr1]

// 对象
let obj1 = {
  a: 1,
  b: 2
}
let obj2 = {
  c: 3,
  ...obj1
}
```
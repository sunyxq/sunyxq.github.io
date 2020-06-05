# JS技巧

一些`js`基础技巧

## 生成`1-20`的数组，不用`for`循环
- `keys`+`slice`
```js
[...Array(21).keys()].slice(1)
```
- `Array.from`
```js
Array.from({length: 20}, (v, k) => k + 1)
```

## 数据去重

- `Set`去重
```js
  const arr = [1, 9, 3, 9, 1, 1, 4, 3]
  [...new Set(arr)]   // [1, 9, 3, 4]
```
- `filter`+`indexOf`
```js
  const arr = [1, 9, 3, 9, 1, 1, 4, 3]
  arr.filter((e, i, _arr) => _arr.indexOf(e) === i)   // [1, 9, 3, 4]
```
- `reduce`+`includes`
```js
  const arr = [1, 9, 3, 9, 1, 1, 4, 3]
  arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])  // [1, 9, 3 ,4]
```

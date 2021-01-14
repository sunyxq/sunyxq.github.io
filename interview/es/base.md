# ES基础题

1. [1, 2, 3].map(parseInt)输出什么，如果是[10, 10, 10].map(parseInt)呢？
```js
[1, 2, 3] => [1, NaN, NaN]

[10, 10, 10] => [10, NaN, 2]
```
:::details 详细信息
`Array.prototype.map`回调函数有三个参数`(item, index, arr) => {}`；`parseInt(num, radix)`有两个参数，分别为需要格式的数据和进制(最小为二进制，默认为十进制，为0时使用默认值)。
:::

2. 以下输出什么

```js 详细信息
const arr1 = ['a', 'b', 'c']
const arr2 = ['b', 'c', 'a']
console.log(arr1.sort() === arr1)     // true
console.log(arr2.sort() === arr2)     // true
console.log(arr1.sort() === arr2.sort())  // true
```
:::details
`Array.prototype.sort`对原始数组进行排序并返回该数组的引用。因此`arr1.sort()`和`arr1`指向内存中同一块地址，`arr2`同理。`arr1`和`arr2`指向不同内存地址，因此`arr1.sort() === arr2.sort()`为`false`
:::
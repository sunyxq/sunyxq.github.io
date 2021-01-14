# TypeScript入门

## 声明空间

### 类型声明空间
**类型声明空间**包含用来当做**类型注解**的内容，如下示例：
```js
class Foo {}
interface Bar {}
type Bas = {}
```
使用类型注解,定义的一些类型声明，不能作为变量使用，因为其没在变量声明空间中定义
```js
let foo: Foo;
let bar: Bar
let bas: Bas

const far = Bar; // Error: cannot find name 'Bar'
```

### 变量声明空间
**变量声明空间**包含可做变量的内容，`class`即可提供类型声明空间又可提供变量声明空间
```js
class Foo {}
const someVar = Foo
const otherVar = 123
```
一些声明的变量，只能在变量声明空间使用，不能用作类型注解。
```js
const foo = 123;
let bar: foo  // Error: cannot find name 'foo'
```

## 模块

### 全局模块

### 文件模块
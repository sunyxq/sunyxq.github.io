# CSS隐藏滚动条

当内容高度大于容器高度或视窗时，就会出现滚动条；宽度同理。

## 定义滚动条样式(`-webkit-scrollbar`)
在`webkit`内核的浏览器里定义滚动条样式,【兼容】
```css
// 作用全局滚动条
::-webkit-scrollbar{
  display:none;
}
// 单独作用某个元素
.scroll::-webkit-scrollbar{
  display:none;
}
```

## 计算宽度(宽度不固定)
设置子容器宽度为`100%+18px`
```html
  // js: list = Array.from({length: 50}, (v, k) => k + 1)
  <div class="container">
    <ul class="scroll">
      <li v-for="e in list" :key="e">{{e}}</li>
    </ul>
  </div>
```
```scss
.container {
  width: 200px;
  height: 400px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
  .scroll {
    list-style: none;
    padding: 0;
    margin: 0;
    width: calc(100% + 18px);
    height: 100%;
    overflow-y: auto;
  }
}
```

## 利用宽度覆盖滚动条(固定宽度)

**实现思路:** 滚动元素外嵌套一层`div`,并把这个`div`设置`overflow: hidden`,滚动元素设置`overflow-y: scroll;overflow-x: hidden;`,最后设置*外层`div`宽度小于滚动元素宽度*。

```html
  // js: list = [...Array(51).keys()].slice(1)
  <div class="container">
    <ul class="scroll">
      <li v-for="e in list" :key="e">{{e}}</li>
    </ul>
  </div>
```

```scss
.container {
  width: 200px;
  height: 400px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
  .scroll {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 220px;
    height: 100%;
    overflow-y: auto;
  }
}
```

## 外边距隐藏撑开的滚动条
把滚动条撑开，然后通过负值的外边距抵消撑开的部分，使得外容器宽度不受影响，让滚动条溢出隐藏.
```html
  // js: list = [...Array(51).keys()].slice(1)
  <div class="container">
    <ul class="scroll">
      <li v-for="e in list" :key="e">{{e}}</li>
    </ul>
  </div>
```
```scss
.container {
  width: 200px;
  height: 400px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
  .scroll {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-right: -10px;
    padding-right: 10px;
    height: 100%;
    overflow-y: auto;
  }
}
```

## 参考链接
- [H5 页面横向滚动条隐藏](https://github.com/o2team/h5skills/issues/72)
- [怎样隐藏滚动条还能滚动页面](https://www.zhihu.com/question/33710936)
- [纯css，div隐藏滚动条，保留鼠标滚动效果](https://blog.csdn.net/liusaint1992/article/details/51277751)
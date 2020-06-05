# HTML技巧

- IE兼容性模式`X-UA-Compatible`

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
```
`IE=Edge`告诉`IE`浏览器，`IE8/9`及以后的版本都会以最高版本`IE`来渲染页面,`chrome=1`表示可以激活`Chrome Frame`
```html
// 告诉IE浏览器，IE8/9都会以IE8引擎来渲染页面
<meta http-equiv="X-UA-Compatible" content="IE=8">
// 告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

## 参考

- [IE兼容性模式X-UA-Compatible](https://www.jianshu.com/p/11adc0ef158e)
- [一定要 http-equiv="X-UA-Compatible" content="ie=edge"](https://segmentfault.com/a/1190000017107753)
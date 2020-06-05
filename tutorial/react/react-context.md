# Context
> `Context`提供了一个无需为每层组件手动添加`props`，就能在组件树间进行数据传递的方法.类似`Vue`中的`provider/inject`。

## 使用Context
1. 使用`createContext`创建一个`context`，该方法返回一个包含`Provider`和`Consumer`两个组件的对象，并可以通过`displayName`属性定义一个在`DevTools`中显示的`context`内容。
```js
  const ThemeContext = React.createContext('dark'/*defaultValue*/)
  ThemeContext.displayName = 'MyThemeContext'
```
只有当组件所处的树中没有匹配到`Provider`时，其`defaultValue`参数才会生效

2. 使用`Provider`组件，指定`context`需要作用的组件树范围
```js {1}
  <ThemeContext.Provider value={thmene}>
    <Toolbar />
  </ThemeContext.Provider>
```
3. 后代组件消费`Provider`提供的`context`

- CC Consumer
```js {2}
<ThemeContext.Consumer>
  { theme => <span>{theme}</span> }
</ThemeContext.Consumer>
```
需要函数作为子元素。这个函数接收当前的`context`值，返回一个`React`节点。传递给函数的`value`值等同于往上组件树离这个`context`最近的`Provider`提供的`value`值。如果没有对应的`Provider`，`value` 参数等同于传递给`createContext()`的`defaultValue`。

- CC static props
```js {10}
class ThemeButton extends Component {
  componentDidMount() {
    console.log(this.context);
  }
  render() {
    const theme = this.context
    return <h3>{theme}</h3>
  }
}
ThemeButton.contextType = ThemeContext
```
或者使用`static`属性初始化`contextType`
```js {2}
class ThemeButton extends Component {
  static contextType = ThemeContext
  componentDidMount() {
    console.log(this.context);
  }
  render() {
    const theme = this.context
    return <h3>{theme}</h3>
  }
}
```
该`API`只能订阅单一`context`

- FC Consumer
```js
function ThemeButton() {
  return <ThemeContext.Consumer>
    { theme => <span>{theme}</span>}
  </ThemeContext.Consumer>
}
```

- FC useContext
```js {2}
function ThemeButton() {
  const theme = useContext(ThemeContext)
  return <div>
    current theme is: {theme}
  </div>
}
```
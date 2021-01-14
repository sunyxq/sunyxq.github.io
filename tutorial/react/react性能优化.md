# React项目性能分析及优化

## 性能分析
1. Performance
2. React Profiler
`React.Profiler`记录的是`commit`阶段的数据。`React`执行分为两个阶段
1. render阶段：该阶段会确定例如 DOM 之类的数据需要做哪些变化。在这个阶段，React 将会执行 render 及 render 之前的生命周期。
2. commit阶段：该阶段 React 会提交更新，同时在这个阶段，React 会执行像 componentDidMount 和 componentDidUpdate 之类的生命周期函数
所以`React.Profiler` 的分析范围是有限的。


## 性能优化
1. shouldComponentUpdate/PureComponent
`shouldComponentUpdate`生命周期勾子通过判断`props`和`state`是否变化手动控制是否需要执行`render`。使用`PureComponent`的组件对自动处理`shouldComponentUpdate`

使用`PureComponent`/`ShouldComponentUpdate`时，需要注意几点：
- `PureComponent`会对`props`与`state`做浅比较，所以一定要保证`props`与`state`中的数据是 `immutable`的
- 如果你的数据不是`immutable`的，或许你可以自己手动通过`shouldComponentUpdate`来进行深比较。当然深比较的性能一般都不好，不到万不得已，最好不要这样搞

2. React.memo
`React.memo`与`shouldComponentUpdate`一样，但它只能用于函数组件。`React.memo`会对`props`进行浅比较，如果一直则不重新渲染
```js
const Count = React.memo((props) => {
  return <div>{props.count}</div>
})
```
React.memo 对 props 的变化做了优化，避免了无用的 render。React 函数组件的 useState，其 setState 会自动做浅比较。如果数据没有变化，函数组件会忽略这次更新，且不会执行 render。
3. 善用`React.useMemo`,
`React.useMemo`是`React`内置`hooks`,主要为了解决组件在频繁`render`时,无差别频繁触发无用的昂贵计算，一般会作为性能优化手段
```js
const App = (props)=>{
  const [boolean, setBoolean] = useState(false);
  const [start, setStart] = useState(0);

  // 这是一个非常耗时的计算
  // const result = computeExpensiveFunc(start);
  // 只有在start改变时，才会触发computeExpensiveFunc重新计算
  const result = useMemo(() => computeExpensiveFunc(start), [start])
}
```
4. 合理使用`React.useCallback`

5. 谨慎使用Context
`Context`是跨组件传值的一种方案，但无法阻止`Context`触发`render`。
不像`props`和`state`，`React`提供了`API`进行浅比较，避免无用的`render`，`Context`完全没有任何方案可以避免无用的渲染。
关于`Context`的建议
- Context 只放置必要的，关键的，被大多数组件所共享的状态
- 对非常昂贵的组件，建议在父级获取 Context 数据，通过 props 传递进来

6. 小心使用Redux
`Redux`中一些细节，稍不注意就会触发无用的`render`
**精细化依赖度**
```js
const App = (props) => {
  return <div>{props.project.id}</div>
}

export default connect(store => ({
  project: store.project,
  // user: store.user
}))(App)
```
`App`组件显示声明依赖了`redux`的`project`和`user`数据，在这三个数据变化时，都会触发`App` 重新 `render`。但是`App`只需要监听`project.id`的变化，所以精细化依赖可以避免无效的`render`，是一种有效的优化手段。

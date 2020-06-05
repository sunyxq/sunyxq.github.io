# 微前端

## 微前端作用

- 技术栈无关：主框架不限制接入应用的技术栈，子应用具备完全自主权
- 独立开发、独立部署：子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 独立运行时 每个子应用之间状态隔离，运行时状态不共享
::: tip
解决使用React、Vue、Angular、jQuery等构建的多技术栈应用的，可单独更新维护；
相同技术栈时，解决不同版本(React、antd的版本差异，breaking change)之间的差异问题，[传统方式全量升级或锁死版本]
解决巨无霸应用(巨石应用)维护
:::

## 参考
1. [qiankun官网](https://qiankun.umijs.org/zh)
2. [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
3. [微前端到底是什么](https://zhuanlan.zhihu.com/p/96464401)
4. [如何使用 qiankun 做微前端](https://zhuanlan.zhihu.com/p/93198281)
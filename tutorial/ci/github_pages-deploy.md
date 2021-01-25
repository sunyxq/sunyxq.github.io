# 使用Github Pages + Vuepress + Travis实现自动化部署

## 构建Vuepress
参考[vuepress官网](https://vuepress.vuejs.org/zh/)构建一个本地项目
```js
// 新建项目目录
mkdir my-blog && cd my-blog
// 初始化
npm init -y
// 安装依赖
npm i vuepress -D
// 更新scripts
{
  "dev": "vuepress dev .",
  "build": "vuepress build ."
}
// 新建 markdown 首页文件
echo '# Hello Vuepress' > README.md
// 启动本地服务
npm run dev
```
通过`npm run dev`和`npm run build`在本地运行和构建。具体如何配置`vuepress`，请自行查阅[官方文档](https://vuepress.vuejs.org/zh/)。

## 配置github token
要使用`travis`自动化部署，`travis`就需要读取你的`github`的`repo`。`github`提供了`token`机制供外部访问你的仓库。

进入[github token](https://github.com/settings/tokens)，生成一个供`travis`用的token，token的权限暂时全选，token注意保密且需要安全保存

## 配置Travis
使用github账号登陆[travis](https://travis-ci.org/),点击左侧`+`配置需要同步的仓库。
在仓库选择列表打开需要同步的仓库的开关，并点击设置按钮进行配置。在环境变量(`Environment Variables`)中添加一栏我们刚才获取的`token`,`name`为键名(*过会有用*),`value`为`token`.

## 编写Travis配置文件
在`vuepress`项目根目录新建`.travis.yml`自动化构建的配置文件
```
cd my-blog
touch .travis.yml
```
`.travis.yml`配置如下：
```yml
language: node_js
node_js:
  - lts/*
install:
  - yarn install 
script:
  - yarn build 
deploy:
  provider: pages
  target_branch: master   # 发布的分支
  skip_cleanup: true
  local_dir: .vuepress/dist
  github_token: $blog # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置的键名，设置为 secure variable
  keep_history: true
  on:
    branch: blog    # 推送的分支
```
我们再`github pages`的同一个仓库下面，使用`blog`分支提交我们的源文件，使用`master`发布我们的博客。

## 结束
以后每次更新完博客，直接`push`到`blog`分支，`travis`会读取`blog`分支源码下的`.travis.yml`文件，自动帮我们生成并部署网站


## 参考
1. [Travis Doc](https://docs.travis-ci.com/user/deployment/pages/)
2. [Travis自动化部署VuePress到Github Pages](https://kuifafa.com/2019/07/02/deploy/)
3. [使用 Travis CI 实现 Github Pages + Hexo 博客的自动部署](https://nettee.github.io/posts/2018/Travis-Hexo-blog-automatic-deploy/)
4. [VuePress - 部署](https://vuepress.vuejs.org/zh/guide/deploy.html)
5. [持续集成在Hexo自动化部署上的实践](https://qinyuanpei.github.io/posts/3521618732/)
6. [Automatically Update Github Pages with Travis](https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example)
7. [一点都不高大上，手把手教你使用Travis CI实现持续部署](https://zhuanlan.zhihu.com/p/25066056)
# 前端使用 docker 部署

## 作用

统一环境，对同一个项目部署环境一致

## 创建 docker 镜像

1. 创建`express`服务

```bash
mkdir express-app && cd express-app
touch index.js
```

在`index.js`中初始化如下服务：

```js
const express = require('express')
cosnt app = express()

app.get('/', function (req, res) {
 res.send('Hello World!')
})

// 让服务器监听 8081 端口
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})
```

使用`yarn init -y`初始化`package.json`,并修改成如下：

```
 {

    "name": "express-app",
    "version": "1.0.0",
    "description": "Dockerized node.js app",
    "main": "index.js",
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.16.4"
    }
 }
```

2. 创建`Dockerfile`配置文件
   在项目根目录创建`Dockerfile`配置文件，并按如下代码初始化：

```bash
# Dockerfile
# 运行环境
FROM node:10
# 工作目录
WORKDIR /app
# 复制文件到工作目录
COPY package.json /app
# 安装yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
# 查看yarn是否安装成功，可删掉
RUN yarn -v
# 安装依赖
RUN yarn install
# 复制源码到工作目录
COPY . /app
# 导出端口和服务启动端口一致
EXPOSE 8081
# 启动命令，可使用CMD ['node', 'index.js']
CMD node index.js
```

3. 构建 docker 镜像
   在项目根目录执行：

```shell
#  Build a image： docker build -t <image-name> <relative-path-to-your-dockerfile>
docker build -t express-app .
```

这条命令在宿主机创建一个名为`express-app`的镜像，`-t`用来指定镜像名称。

4. 运行 docker 容器

```
# Run docker: docker container run <image-name>
docker container run -p 4000:8081 express-app
```

这条命令用来创建和运行一个`docker`容器，`-p 4000:8081`是一个发布（`publish`）标识，它将本机的`4000` 端口映射到了容器中的`8081`端口。现在所有对本机`4000`端口的访问，都会被容器中的`8081`端口监听。`express`就是刚创建的镜像名称。

## 上传镜像到阿里云

1. 开通阿里云镜像仓库并设置仓库密码
2. 创建镜像仓库[resp]和命名空间[namespace]
3. `docker`登录

```shell
sudo docker login -u [username] -p [password] registry.cn-shenzhen.aliyuncs.com
```

_输入密码为系统操作密码_

4. 上传镜像到镜像仓库

```shell
# 参看镜像
docker images
# 重命名镜像
sudo docker tag [imageId] registry.cn-shenzhen.aliyuncs.com/[namespace]/[resp]:[TAG]
# 推送镜像至Registry
sudo docker push registry.cn-shenzhen.aliyuncs.com/sunyxq/fly:[TAG]
```

`imageId`为镜像`id`，`TAG`为**镜像版本号**，参数可以通过`docker images`查看。`namespace`为阿里云镜像仓库的命名空间；[resp]为阿里云镜像仓库名称。前面的准备工作都可以获取到相关信息。

5. 拉取镜像

```
sudo docker pull registry.cn-shenzhen.aliyuncs.com/sunyxq/fly:[TAG]
```

## 参考

1. [当 Node.js 遇见 Docker](https://blog.fundebug.com/2017/03/27/nodejs-docker/)
2. [写给前端工程师的 Docker 入门](https://segmentfault.com/a/1190000019898011)
3. [docker 系列之入门篇](https://www.jianshu.com/p/a5ea2ff60594)
4. [Docker 在前端开发环境中的应用](https://zhuanlan.zhihu.com/p/33365859)
5. [使用 Docker 打造超溜的前端环境](https://github.com/axetroy/blog/issues/178)
6. [从零开始 Docker 化你的 Node.js 应用](https://juejin.im/post/5b2cb6986fb9a00e3a5aa279)

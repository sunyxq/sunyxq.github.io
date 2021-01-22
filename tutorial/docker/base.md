# Docker 入门

`Docker`是一个开源的应用容器引擎，可让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
容器是完全使用沙箱机制，相互之间不会有任何接口，更重要的是容器性能开销极低。

`Docker`主要有两种使用方法: GUI(`Docker Desktop`）和 CLI。

## Docker 安装

1. 安装 Docker

[官网](https://www.docker.com/get-started)直接下载`Docker Desktop`安装`docker`

2. 查看 Docker 信息

```sh
docker version
# 或
docker info
```

运行以上命令可验证 Docker 是否安装成功

3. 启动 Docker
   Docker 是服务器----客户端架构。命令行运行`docker`命令的时候，需要本机有 Docker 服务。如果这项服务没有启动，可以用下面的命令启动。

```sh
# service 命令的用法
$ sudo service docker start

# systemctl 命令的用法
$ sudo systemctl start docker
```

或直接启动`Docker Desktop`

## Docker 常用命令

- 列出本机所有 image(镜像)

```sh
docker image ls
# 等同于
docker images
```

各选项说明：

- REPOSITORY：表示镜像的仓库源
- TAG：镜像的标签
- IMAGE ID：镜像 ID
- CREATED：镜像创建时间
- SIZE：镜像大小
  同一仓库源可以有多个 TAG，代表这个仓库源的不同版本，使用 REPOSITORY:TAG 来定义不同的镜像。如果不指定一个镜像的版本标签，例如只使用 ubuntu，docker， 将默认使用 ubuntu:latest 镜像

更多`image`操作方法详见`docker image --help`

- 查找镜像

```sh
docker search [image name]
```

- 拉取镜像

```sh
docker pull ubuntu:15.10
# 等同于
docker image pull ubuntu:15.10
```

- 运行容器

```sh
docker run ubuntu:15.10 /bin/echo "Hello Docker"
```

参数解析说明：

- ubuntu:15.10：指定运行的镜像。Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像。
- /bin/echo "Hello Docker"：在启动的容器里执行命令
  以上命令功能：Docker 以 ubuntu15.10 镜像创建一个新容器，然后在容器里执行 bin/echo "Hello world"，然后输出结果。

```
docker run -i -t -d ubuntu:15.10 /bin/bash
```

参数解析说明：

- -t: 在新容器内指定一个(伪)终端
- -i: 允许对容器内的标准输入 (`STDIN`) 进行交互
- -d: 让容器在后台运行
- -P: 将容器内部使用的网络端口映射到当前主机上
- -p: 设置不一样端口

- 容器当前运行命令

```sh
# 查看当前运行的容器
docker ps
# 查看所有容器，包括停止的
docker ps -a
# 查看最新创建的容器，只列出最后创建的
docker ps -l
# 查看网络端口
docker port [container ID | container name]
# 查看容器内部的标准输出
docker logs [container ID | container name]
# 查看容器内部运行的进程
docker top [container ID | container name]
# 查看 Docker 的底层信息。它会返回一个 JSON 文件记录着 Docker 容器的配置和状态信息
docker inspect [container ID | container name]
```

- 停止容器运行

```sh
docker stop [container ID | container name]
```

- 启动/重启容器

```sh
# 启动已停止的容器
docker start [container ID | container name]
# 重启正在运行的容器
docker restart [container ID | container name]
```

- 删除容器

```sh
# 删除容器，删除容器时，容器必须是停止状态
docker rm [container ID | container name]
# 删除所有容器
docker rm $(docker ps -aq)
```

## 参考链接

1. [Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
2. [Docker 安装及使用](https://segmentfault.com/a/1190000017151019)

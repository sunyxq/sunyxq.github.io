# Docker 镜像安装

## 启动 Docker

启动`Docker Desktop`或命令行(`cli`)启动

## Docker 安装 MySql

1. 下载`mysql`镜像,其`tag`为`5.7.32`

```sh
docker pull mysql:5.7.32
```

2. 启动`mysql`服务

```sh
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

其中`some-mysql`为容器名称，`my-secret-pw`为用户名为`root`的密码，`tag`为`mysql`版本号*（见上）*

3. 使用`sh`操作数据库

用`docker exec`操作`Docker`容器命令

```sh
docker exec -it some-mysql bash
// or
docker exec -it CONTAINER-ID bash
```

## Docker 安装 Jenkins

1. 下载 Jenkins 镜像

```
docker pull jenkins
```

2. 创建并启动 Jenkins 容器

```
docker run -d --name myjenkins -p 8200:8080 jenkins
```

基于 Jenkins 镜像创建名为`myjenkins`容器并启动，容器端口`8200`(自定义任何未被使用端口)；`-d`表示容器会在后台运行，如果不加-d，则容器运行会占用此终端，如果终端关闭，则容器也相应关闭。
在浏览器输入`localhost:8200`就可以初始化设置 Jekins 服务了

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

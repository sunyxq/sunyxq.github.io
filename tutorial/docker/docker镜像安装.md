#

## 启动 Docker(daemon)

```
docker run -dp 80:80 docker/getting-started
```

## MySql

1. 下载`mysql`镜像,其`tag`为`5.7.32`

```bash
docker pull mysql:5.7.32
```

2. 启动`mysql`服务

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

其中`some-mysql`为容器名称，`my-secret-pw`为用户名为`root`的密码，`tag`为`mysql`版本号*（见上）*

3. 使用`bash shell`操作数据库
   `docker exec`可以操作`Docker`容器里面的命令

```
docker exec -it some-mysql bash
// or
docker exec -it CONTAINER-ID bash
```

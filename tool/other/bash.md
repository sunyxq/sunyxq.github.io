# Bash基础命令

1. ls
`ls`命令用来显示目标列表
- 显示当前目录下非影藏文件与目录
```
ls
```
- 显示当前目录下包括影藏文件在内的所有文件列表
```
ls -a
```
- 输出长格式列表
```
ls -l
```
- 水平输出文件列表
```
ls -m
```

2. curl
`curl命令`是利用URL规则在命令行下工作的文件传输工具。它是综合传输工具，支持文件的上传和下载，但习惯称`curl`为下载工具。`curl`支持包括`http`,`https`,`ftp`等众多协议，还支持POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。
- 使用`-silent`选项不显示进度信息
```bash
curl URL -silent
```
- 使用选项`-O`将下载的数据写入到文件，必须使用文件的绝对地址
```bash
curl URL -O
```

- `-o`选项将下载数据写入到指定名称的文件中，使用`--progress`显示进度条
```bash
curl URL -o file.name --progress
```

- `-X`执行某种`http`请求
```bash
curl -X GET URL
```

- 通过`-I`或者`-head`可以只打印出HTTP头部信息
```bash
curl URL -I
```

3. wget
`wget命令`从指定的`URL`下载文件。wget非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性，如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。
- 使用`wget`下载单个文件
```
wget URL
```
- `-O`选项重命名下载的文件
```
wget URL -O file.name
```
- `--spider`选项测试下载链接
```
wget --spider URL
```

4. tar
`tar命令`为文件和目录创建档案。
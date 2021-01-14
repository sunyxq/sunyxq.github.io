# git基础

## 新建本地仓库并添加到远程仓库
```bash
  // 新建custome-cra-config项目
  create-react-app custome-cra-config
  // 初始化git
  git init
  // 添加git远程仓库
  git remote add origin git@xxx.git
```

## 分支(branch)
- 查看本地所有分支
```bash
git branch
```
- 查看远程所有分支
```bash
git branch -r
```
- 查看所有分支(包括本地分支和远程分支)
```bash
git branch -a
```
- 新建分支
```bash
git branch branchName
```
- 新建分支并切换到新分支
```bash
git checkout -b branchName
```
相当于
```bash
git branch newBranch
git checkout newBranch
```
- 切换本地工作分支
```bash
git checkout branchName
```
- 切换远程分支
```bash
git checkout -b newBranch origin/newBranch
// or
git branch newBranch origin/newBranch
```
- 删除本地分支
```bash
git branch -d branchName
```
- 重命名分支
```bash
git branch -m oldBranch newBranch
```

## 日志(log)
- 查看提交记录
```bash
git log
```
- 查看文件提交记录
```bash
git log `filename`
```
- 查看包含关键字的提交记录
```bash
git log --grep `keyword`
```

## 展示(show)
- 查看指定`commit-id`变更的文件
```
git show [`commit-id`] [--stat]
```
没有`commit-id`时，显示最近一次修改的文件；没有`--stat`时，显示修改文件的修改内容，有`--stat`时，只显示修改的文件
- 查看指定`commit-id`下某个文件修改内容
```bash
git show `commit-id` `filename` 
```
- 

## 比较(diff)
`git diff`用于比较两次修改的差异
- 比较工作区与暂存区
```bash
// git diff 不加参数即默认比较工作区与暂存区
git diff  
```
- 比较暂存区与最新本地版本库(本地库中最近一次commit的内容)
```bash
git diff --cached  [<path>...] 
```
- 比较工作区与最新本地版本库
```bash
// 如果HEAD指向的是master分支，那么HEAD还可以换成master
git diff HEAD [<path>...]  
```
- 比较工作区与指定`commit-id`的差异
```bash
git diff commit-id [<path>...] 
```
- 比较暂存区与指定`commit-id`的差异
```bash
git diff --cache commit-id [<path>...] 
```
- 比较两个`commit-id`之间的差异
```bash
git diff [<commit-id>] [<commit-id>]
```

## 远程(remote)
- 添加远程仓库
```bash
git remote add origin https://domain.xxxx.git
```
- 查看远程仓库地址
```bash
git remote show origin
// or
git remote -v
```
- 切换远程仓库  
老地址：`https://old.xxxx.git`  
新地址：`https://new.xxxx.git`  
远程仓库名称：`origin`  
直接通过命令行修改远程仓库
```
git remote set-url origin https://new.xxxx.git
```
先删除再添加新远程仓库
```
git remote rm origin
git remote add origin https://new.xxxx.git
```
- 添加多个远程仓库
```bash
git remote set-url --add origin https://new.xxx.git
git remote -v
```
`origin`远程仓库有两个`push`地址，调用`git push origin master`时会同时`push`到两个地址。
```bash
git remote add gitee https://new.xxx.git
git remote -v
```
`push`代码时，两个仓库分别`push`

## 配置(config)
`config`是`git`配置指令。`config`配置有`system`级别、 `global`用户级别和`local`当前仓库三种，底层配置会覆盖顶层配置。
- 查看配置
```
git config --list
git config --local --list
git config --global --list
git config --system --list
git config --global user.name
```
- 新增配置
```bash
# 语法
git config --global --add user.name configValue
# 用法
git config --global --add user.name walker
```
- 修改配置
```bash
# 语法
git config --global user.name configValue
# 用法
git config --global user.name walker
```
- 删除配置
```bash
# 语法
git config --global --unset user.name
# 用法
git config --global --unset user.name
```

## Git选项(`options`)注释
- `-d, --delete`: 删除
- `-D, --delete --force`: 强制删除
- `-f, --force`: 强制
- `-m, --move`: 移动或重命名
- `-M, --move --force`:强制重命名
- `-r: --remote`: 远程
- `-a, --all`: 全部

## 参考

- [checkout 用法总结](https://www.jianshu.com/p/cad4d2ec4da5)
- [git branch用法总结](https://blog.csdn.net/afei__/article/details/51567155)
- [Git远程仓库地址变更本地如何修改](https://blog.csdn.net/asdfsfsdgdfgh/article/details/54981823)
- [Git diff 常见用法](https://www.cnblogs.com/qianqiannian/p/6010219.html)
- [本地仓库关联多个远程仓库](https://juejin.im/entry/5c3443b86fb9a04a102f74df)
- [60+Git常用命令行](https://juejin.im/post/5eb2d6bce51d454d9d3ed14f)
- [Git Log](https://blog.csdn.net/qq_20330063/article/details/82386317)
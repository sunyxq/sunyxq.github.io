#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd .vuepress/dist

git init
git config user.name "sunyxq"
git config user.email "253832631@qq.com"
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io，去掉下面这一行的注释 blog
git push -f https://${blog}@github.com/sunyxq/sunyxq.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>，去掉下面这一行的注释
# git push -f https://${token}@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
该仓库只做发布之用。

## 安装

```shell
bower install --save-dev brix-loader brix-base brix-components
gulp
```

## 打包

```shell
gulp build
```

## 发布

> 发布问题 @空逸 @AliCDN内部用户群

```shell
git add . -A
git commit -m "save tag log 0.0.1"
git push origin master
git checkout -b daily/0.0.1
git push origin daily/0.0.1
git tag publish/0.0.1
git push origin publish/0.0.1
git remote prune origin
git checkout master
git branch -d daily/0.0.1
```
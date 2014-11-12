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
bower install
bower update
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

> [自动发布](http://thx.tbsite.net/vegas/services/aone-server-side-build/) @逸才

## 开发

```shell
rm -fr bower_components/brix-components
bower link brix-components
rm -fr bower_components/brix-base
bower link brix-base
rm -fr bower_components/brix-loader
bower link brix-loader
```

<http://localhost:4242/config-remote.js>
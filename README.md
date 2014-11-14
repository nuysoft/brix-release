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
gulp
git add . -A
git commit -m "save tag log 0.0.5"
git push gitlab master
git checkout -b daily/0.0.5
git push gitlab daily/0.0.5
git tag publish/0.0.5
git push gitlab publish/0.0.5
git remote prune gitlab
git checkout master
git pull
git branch -d daily/0.0.5

git push origin master
git push origin publish/0.0.5
git remote prune origin
```

> [自动发布](http://thx.tbsite.net/vegas/services/aone-server-side-build/) @逸才
> http://www.atatech.org/articles/22037

**更改提交者**

```shell
git filter-branch --env-filter '
 
if [ "$GIT_AUTHOR_EMAIL" = "nuysoft@gmail.com" ]
then
  export GIT_AUTHOR_EMAIL="mozhi.gyy@alibaba-inc.com"
  export GIT_AUTHOR_NAME="墨智"
fi
if [ "$GIT_COMMITTER_EMAIL" = "nuysoft@gmail.com" ]
then
  export GIT_COMMITTER_EMAIL="mozhi.gyy@alibaba-inc.com"
  export GIT_COMMITTER_NAME="墨智"
fi
'
```

## 开发

```shell
rm -fr bower_components/brix-components
bower link brix-components
rm -fr bower_components/brix-base
bower link brix-base
rm -fr bower_components/brix-loader
bower link brix-loader
```

**准备发布**

```shell
rm -fr bower_components/brix-components
rm -fr bower_components/brix-base
rm -fr bower_components/brix-loader
bower install
```

<http://localhost:4242/config-remote.js>
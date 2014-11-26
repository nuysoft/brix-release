该仓库只做发布之用。

## 安装

```shell
bower install --save-dev brix-loader brix-base brix-components brix-spa
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
git commit -m "save tag log 0.0.10"
git push gitlab gh-pages
git checkout master
git merge gh-pages
git push gitlab master
git checkout -b daily/0.0.10
git push gitlab daily/0.0.10
git tag publish/0.0.10
git push gitlab publish/0.0.10
git remote prune gitlab
git checkout master
git pull
git branch -d daily/0.0.10
git checkout gh-pages
git pull

git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master
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
rm -fr bower_components/brix-components; bower link brix-components
rm -fr bower_components/brix-base;       bower link brix-base
rm -fr bower_components/brix-event;      bower link brix-event
rm -fr bower_components/brix-loader;     bower link brix-loader
rm -fr bower_components/brix-spa;        bower link brix-spa
rm -fr bower_components/brix-bisheng;    bower link brix-bisheng
```

**准备发布**

```shell
rm -fr bower_components/brix-loader
rm -fr bower_components/brix-base
rm -fr bower_components/brix-event
rm -fr bower_components/brix-components
rm -fr bower_components/brix-bisheng
rm -fr bower_components/brix-spa
bower install
bower update
```

<http://localhost:4242/config-remote.js>

## 关于模块路径

### 场景和分析

模块 `hello/hello.js` 的定义代码如下：

```js
define( ['text!./hello.tpl'], function(){ 
    // ...
})
```

然后，配置模块 `hello/hello.js'：

```js
'components': baseUrl,
'components/hello': baseUrl + 'hello/hello'
```

如此一来，跨域访问 `text!./hello.tpl` 时，路径变得异常诡异：

`./hello.tpl` ==> `components/hello.tpl` ==> `baseUrl/hello.tpl`

而正确的应该是 `baseUrl/hello/hello.tpl`。

为了找到正确的 `./hello.tpl`，不得不增加一条配置：

```js
'components/hello.tpl': baseUrl + 'hello/hello.tpl'
```

### 根源

罪恶的根源似乎是从 `components/hello` 开始的。这么设置是为了在使用时符合直觉：`components/hello` 直观地表示了要使用组件库 `components` 中的 `hello` 组件。

所以，在使用时必须是 `components/hello`。除非你对使用方式有更好的建议。

### 解决方案

有一种粗暴方案可以解决上面的问题（在 Brix 的历史上曾被采用过）：强制约定组件的入口文件为 `index.js`，写法依然是 `components/hello`，在加载模块之前，自动追加上入口文件，变为 `components/hello/index.js`。这么做严重降低了开发体验，无论是对于组件开发者还是组件用户：

1. 因为所有的组件入口文件都是同名的 `index.js`，在超找和调试时非常的不方便。
2. 强制约定会让人困惑和不舒服。
    * 配置项 `bx-name` 指定了模块名，模块名和模块文件通过配置关联起来，这是通用的规则，现在又增加了默认的模块文件 `index.js`，默认即意味着没有明确指明，这种不确定让我非常困惑。因为这种行为不属于任何一种模块化规范。
    * 对于强制约定入口文件，实在是不人道。

虽然这是一个令人头疼和需要机智的问题，但是在用户的直觉中：这 TMD 有什么难的，不就是模块配置吗，为什么要多加一层处理！所以，我宁愿让配置更复杂些，即把一切复杂度都隐藏在配置中。


## 关于 CDN

http://gitlab.alibaba-inc.com/thx/brix-release

该仓库只做发布之用。

源码仓库 [brix-loader]、[brix-base] 和 [brix-components] 只能通过 `bower install` 的方式被使用。
发布仓库 [brix-release] 安装以上 3 个源码仓库以及相关的依赖，并提供包配置文件 `config-remote.js`。

[brix-loader]: https://github.com/thx/brix-loader
[brix-base]: https://github.com/nuysoft/brix-base
[brix-components]: https://github.com/nuysoft/brix-components
[brix-release]: http://gitlab.alibaba-inc.com/thx/brix-release

## 关于文档

    *todo*
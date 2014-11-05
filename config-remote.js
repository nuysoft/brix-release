/* global require, document */
/*
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
 */
(function() {
    var baseUrl = function() {
        var scripts = document.getElementsByTagName('script')
        var current = scripts[scripts.length - 1]
        var src = current.getAttribute('src')
        return /(.+\/)(.+)/.exec(src)[1]
    }()
    require.config({
        map: {
            // 插件
            '*': {
                css: baseUrl + 'bower_components/require-css/css.js',
                less: baseUrl + 'bower_components/require-less/less.js',
                text: baseUrl + 'bower_components/requirejs-text/text.js'
            }
        },
        paths: {
            // brix
            'loader': baseUrl + 'bower_components/brix-loader/dist/loader',
            'base': baseUrl + 'bower_components/brix-base/src/',

            // 组件
            'components': baseUrl,
            'components/hello': baseUrl + 'bower_components/brix-components/hello/hello',
            'components/hello.tpl': baseUrl + 'bower_components/brix-components/hello/hello.tpl',
            'components/hello-extra': baseUrl + 'bower_components/brix-components/hello-extra/hello-extra',
            'components/hello-extra.tpl': baseUrl + 'bower_components/brix-components/hello-extra/hello-extra.tpl',
            'components/dropdown': baseUrl + 'bower_components/brix-components/dropdown/dropdown',
            'components/dropdown.tpl': baseUrl + 'bower_components/brix-components/dropdown/dropdown.tpl',
            'components/pagination': baseUrl + 'bower_components/brix-components/pagination/pagination',
            'components/pagination.tpl': baseUrl + 'bower_components/brix-components/pagination/pagination.tpl',
            'components/pure-pagination': baseUrl + 'bower_components/brix-components/pagination/pure-pagination',
            'components/pure.tpl-pagination': baseUrl + 'bower_components/brix-components/pagination/pure-pagination.tpl',
            'components/colorpicker': baseUrl + 'bower_components/brix-components/colorpicker/colorpicker',
            'components/colorpicker.tpl': baseUrl + 'bower_components/brix-components/colorpicker/colorpicker.tpl',
            'components/modal': baseUrl + 'bower_components/brix-components/modal/modal',
            'components/modal.tpl': baseUrl + 'bower_components/brix-components/modal/modal.tpl',
            'components/table': baseUrl + 'bower_components/brix-components/table/table',
            'components/table.tpl': baseUrl + 'bower_components/brix-components/table/table.tpl',
            'components/datepicker': baseUrl + 'bower_components/brix-components/datepicker/datepicker',
            'components/datepicker.tpl': baseUrl + 'bower_components/brix-components/datepicker/datepicker.tpl',
            'components/popover': baseUrl + 'bower_components/brix-components/popover/popover',
            'components/popover.tpl': baseUrl + 'bower_components/brix-components/popover/popover.tpl',
            'components/uploader': baseUrl + 'bower_components/brix-components/uploader/uploader',
            'components/uploader.tpl': baseUrl + 'bower_components/brix-components/uploader/uploader.tpl',
            'components/editor': baseUrl + 'bower_components/brix-components/editor/editor',
            'components/editor.tpl': baseUrl + 'bower_components/brix-components/editor/editor.tpl',
            'components/editable': baseUrl + 'bower_components/brix-components/editable/editable',
            'components/editable.tpl': baseUrl + 'bower_components/brix-components/editable/editable.tpl',
            'components/spin': baseUrl + 'bower_components/brix-components/spin/spin',
            'components/spin.tpl': baseUrl + 'bower_components/brix-components/spin/spin.tpl',
            'components/countdown': baseUrl + 'bower_components/brix-components/countdown/countdown',
            'components/countdown.tpl': baseUrl + 'bower_components/brix-components/countdown/countdown.tpl',
            'components/sidebar': baseUrl + 'bower_components/brix-components/sidebar/sidebar',
            'components/sidebar.tpl': baseUrl + 'bower_components/brix-components/sidebar/sidebar.tpl',
            'components/chart': baseUrl + 'bower_components/brix-components/chart/chart',
            'components/chart.tpl': baseUrl + 'bower_components/brix-components/chart/chart.tpl',
            'components/imager': baseUrl + 'bower_components/brix-components/imager/imager',
            'components/imager.tpl': baseUrl + 'bower_components/brix-components/imager/imager.tpl',
            'components/nprogress': baseUrl + 'bower_components/brix-components/nprogress/nprogress',
            'components/nprogress.tpl': baseUrl + 'bower_components/brix-components/nprogress/nprogress.tpl',
            'components/validation': baseUrl + 'bower_components/brix-components/validation/validation',
            'components/validation/i18n': baseUrl + 'bower_components/brix-components/bower_components/parsleyjs/src/i18n',

            'components/tree': baseUrl + 'bower_components/brix-components/tree/tree',
            'components/tree.tpl': baseUrl + 'bower_components/brix-components/tree/tree.tpl',
            'components/header': baseUrl + 'bower_components/brix-components/header/header',
            'components/header.tpl': baseUrl + 'bower_components/brix-components/header/header.tpl',
            'components/footer': baseUrl + 'bower_components/brix-components/footer/footer',
            'components/footer.tpl': baseUrl + 'bower_components/brix-components/footer/footer.tpl',
            'components/sticky': baseUrl + 'bower_components/brix-components/sticky/sticky',
            'components/sticky.tpl': baseUrl + 'bower_components/brix-components/sticky/sticky.tpl',
            'components/nav': baseUrl + 'bower_components/brix-components/nav/nav',
            'components/nav.tpl': baseUrl + 'bower_components/brix-components/nav/nav.tpl',
            'components/readme': baseUrl + 'bower_components/brix-components/readme/readme',
            'components/readme.tpl': baseUrl + 'bower_components/brix-components/readme/readme.tpl',
            'marked-extra': baseUrl + 'bower_components/brix-components/marked-extra/marked-extra',
            'marked-extra.tpl': baseUrl + 'bower_components/brix-components/marked-extra/marked-extra.tpl',
            'components/css-layout-debugger': baseUrl + 'bower_components/brix-components/css-layout-debugger/css-layout-debugger',
            'components/boilerplate': baseUrl + 'bower_components/brix-components/boilerplate/boilerplate',
            'components/boilerplate.tpl': baseUrl + 'bower_components/brix-components/boilerplate/boilerplate.tpl',

            // 运行依赖库
            jquery: baseUrl + 'bower_components/jquery/dist/jquery',
            underscore: baseUrl + 'bower_components/underscore/underscore',
            moment: baseUrl + 'bower_components/moment/moment',
            mousetrap: baseUrl + 'bower_components/mousetrap/mousetrap',
            mock: baseUrl + 'bower_components/mockjs/dist/mock',
            marked: baseUrl + 'bower_components/marked/lib/marked',
            d3: baseUrl + 'bower_components/d3/d3',
            Chart: baseUrl + 'bower_components/chartjs/Chart',
            director: baseUrl + 'bower_components/director/build/director',
            highlightjs: baseUrl + 'bower_components/highlightjs/highlight.pack',
            nprogress: baseUrl + 'bower_components/nprogress/nprogress',
            parsley: baseUrl + 'bower_components/parsleyjs/dist/parsley'
        },
        shim: {
            Chart: {
                exports: 'Chart'
            },
            director: {
                exports: 'Router'
            },
            highlightjs: {
                exports: 'hljs'
            },
            parsley: {
                exports: 'Parsley'
            }
        }
    })
})()
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
        var baseUrl = /(.+\/)(.+)/.exec(src)[1]
        // baseUrl += 'bower_components/'
        return baseUrl
    }()
    require.config({
        map: {
            '*': {
                // RequireJS 插件
                css: baseUrl + 'require-css/css.js',
                less: baseUrl + 'require-less/less.js',
                text: baseUrl + 'requirejs-text/text.js',

                // Brix 组件
                'components/hello': baseUrl + 'brix-components/hello/hello.js',
                'components/hello-extra': baseUrl + 'brix-components/hello-extra/hello-extra.js',
                'components/dropdown': baseUrl + 'brix-components/dropdown/dropdown.js',
                'components/pagination': baseUrl + 'brix-components/pagination/pagination.js',
                'components/pure-pagination': baseUrl + 'brix-components/pagination/pure-pagination.js',
                'components/pure.tpl-pagination': baseUrl + 'brix-components/pagination/pure-pagination.tpl.js',
                'components/colorpicker': baseUrl + 'brix-components/colorpicker/colorpicker.js',
                'components/modal': baseUrl + 'brix-components/modal/modal.js',
                'components/dialog': baseUrl + 'brix-components/dialog/dialog.js',
                'components/table': baseUrl + 'brix-components/table/table.js',
                'components/datepicker': baseUrl + 'brix-components/datepicker/datepicker.js',
                'components/datepickerwrapper': baseUrl + 'brix-components/datepickerwrapper/datepickerwrapper.js',
                'components/popover': baseUrl + 'brix-components/popover/popover.js',
                'components/uploader': baseUrl + 'brix-components/uploader/uploader.js',
                'components/editor': baseUrl + 'brix-components/editor/editor.js',
                'components/editable': baseUrl + 'brix-components/editable/editable.js',
                'components/spin': baseUrl + 'brix-components/spin/spin.js',
                'components/countdown': baseUrl + 'brix-components/countdown/countdown.js',
                'components/sidebar': baseUrl + 'brix-components/sidebar/sidebar.js',
                'components/chart': baseUrl + 'brix-components/chart/chart.js',
                'components/imager': baseUrl + 'brix-components/imager/imager.js',
                'components/nprogress': baseUrl + 'brix-components/nprogress/nprogress.js',
                'components/validation': baseUrl + 'brix-components/validation/validation.js',
                'components/validation/i18n': baseUrl + 'parsleyjs/src/i18n',

                'components/tree': baseUrl + 'brix-components/tree/tree.js',
                'components/header': baseUrl + 'brix-components/header/header.js',
                'components/footer': baseUrl + 'brix-components/footer/footer.js',
                'components/sticky': baseUrl + 'brix-components/sticky/sticky.js',
                'components/nav': baseUrl + 'brix-components/nav/nav.js',
                'components/readme': baseUrl + 'brix-components/readme/readme.js',
                'marked-extra': baseUrl + 'brix-components/marked-extra/marked-extra.js',
                'components/css-layout-debugger': baseUrl + 'brix-components/css-layout-debugger/css-layout-debugger.js',
                'components/boilerplate': baseUrl + 'brix-components/boilerplate/boilerplate.js'
            }
        },
        paths: {
            // Brix
            'brix/loader': baseUrl + 'brix-loader/dist/loader',
            'brix/base': baseUrl + 'brix-base/dist/base',
            'brix/event': baseUrl + 'brix-event/dist/event',
            'brix/bisheng': baseUrl + 'brix-bisheng/dist/bisheng',
            'brix/spa': baseUrl + 'brix-spa/dist/spa',

            // 运行依赖库
            dependencies: baseUrl + '',
            jquery: baseUrl + 'jquery/dist/jquery',
            underscore: baseUrl + 'underscore/underscore',
            moment: baseUrl + 'moment/moment',
            handlebars: baseUrl + 'handlebars/handlebars',
            mousetrap: baseUrl + 'mousetrap/mousetrap',
            mock: baseUrl + 'mockjs/dist/mock',
            marked: baseUrl + 'marked/lib/marked',
            d3: baseUrl + 'd3/d3',
            Chart: baseUrl + 'chartjs/Chart',
            director: baseUrl + 'director/build/director',
            URIjs: baseUrl + 'uri.js/src/',
            page: baseUrl + 'page/page',
            highlightjs: baseUrl + 'highlightjs/highlight.pack',
            nprogress: baseUrl + 'nprogress/nprogress',
            parsley: baseUrl + 'parsleyjs/dist/parsley',
            log: baseUrl + 'log/log',
            'css-tool': baseUrl + 'brix-components/css-tool/',
            colors: baseUrl + 'colors/',
            printf: baseUrl + 'brix-components/printf/printf'
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
    require(['css!colors/css/colors.css'])
    require(['css!css-tool/tool.css'])
})()
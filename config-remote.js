/* global require, document, location */
(function() {
    var local = ~location.search.indexOf('local')
    var debug = ~location.search.indexOf('debug')
        // local = true // local test
    var script = function() {
        var scripts = document.getElementsByTagName('script')
        return scripts[scripts.length - 1]
    }()
    var baseUrl = function() {
        var src = script.getAttribute('src')
        var baseUrl = /(.+\/)(.+)/.exec(src)[1]
        if (local) baseUrl += 'bower_components/'
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
                'components/dropdown': baseUrl + 'brix-components/dropdown/dropdown.js',
                'components/pagination': baseUrl + 'brix-components/pagination/pagination.js',
                'components/pure-pagination': baseUrl + 'brix-components/pagination/pure-pagination.js',
                'components/dialog': baseUrl + 'brix-components/dialog/dialog.js',
                'components/dialogview': baseUrl + 'brix-components/dialogview/dialogview.js',
                'components/table': baseUrl + 'brix-components/table/table.js',
                'components/datepicker': baseUrl + 'brix-components/datepicker/datepicker.js',
                'components/datepickerwrapper': baseUrl + 'brix-components/datepickerwrapper/datepickerwrapper.js',
                'components/popover': baseUrl + 'brix-components/popover/popover.js',
                'components/uploader': baseUrl + 'brix-components/uploader/uploader.js',
                'components/nprogress': baseUrl + 'brix-components/nprogress/nprogress.js',

                'components/hourpicker': baseUrl + 'brix-components/hourpicker/hourpicker.js',

                'components/hello': baseUrl + 'brix-components/hello/hello.js',
                'components/hello-extra': baseUrl + 'brix-components/hello-extra/hello-extra.js',
                'components/colorpicker': baseUrl + 'brix-components/colorpicker/colorpicker.js',
                'components/modal': baseUrl + 'brix-components/modal/modal.js',
                'components/editor': baseUrl + 'brix-components/editor/editor.js',
                'components/editable': baseUrl + 'brix-components/editable/editable.js',
                'components/spin': baseUrl + 'brix-components/spin/spin.js',
                'components/countdown': baseUrl + 'brix-components/countdown/countdown.js',
                'components/sidebar': baseUrl + 'brix-components/sidebar/sidebar.js',
                'components/chart': baseUrl + 'brix-components/chart/chart.js',
                'components/imager': baseUrl + 'brix-components/imager/imager.js',
                'components/validation': baseUrl + 'brix-components/validation/validation.js',
                'components/validation/i18n': baseUrl + 'parsleyjs/src/i18n',
                'components/ellipsis': baseUrl + 'brix-components/ellipsis/ellipsis.js',

                'components/tree': baseUrl + 'brix-components/tree/tree.js',
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
            'magix': 'http://g.tbcdn.cn/thx/magix/2.0/requirejs-magix',

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
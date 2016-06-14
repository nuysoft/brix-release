/* global require, document, location */
(function() {
    var local = ~location.search.indexOf('local') || ~location.host.indexOf('localhost') || ~location.host.indexOf('.local')
    var debug = ~location.search.indexOf('debug')
        // local = true // local test
    var script = function() {
        var scripts = document.getElementsByTagName('script')
        return scripts[scripts.length - 1]
    }()
    var daily, cdn
    var baseUrl = function() {
        var src = script.getAttribute('src')
        var baseUrl = /(.+\/)(.+)/.exec(src)[1]
        if (/-debug\.js$/.test(src)) debug = true
        daily = ~baseUrl.indexOf('g-assets.daily.taobao.net')
        cdn = ~baseUrl.indexOf('g.tbcdn.cn') || ~baseUrl.indexOf('g.alicdn.com')
        if (daily || cdn) local = false
        if (local) baseUrl += 'bower_components/'
        return baseUrl
    }()
    var brixComponentsBaseUrl = function() {
        var baseUrl = 'brix-components/'
        if (local) debug = true
        if (daily) debug = true
        if (!debug) baseUrl += 'dist/'
        return baseUrl
    }()

    // http://requirejs.org/docs/api.html
    require.config({
        waitSeconds: 0, // http://requirejs.org/docs/api.html#config-waitSeconds
        // urlArgs: "bust=" + (new Date()).getTime() // http://requirejs.org/docs/api.html#config-urlArgs
        map: { // http://requirejs.org/docs/api.html#config-map
            '*': {
                // RequireJS 插件
                css: baseUrl + 'require-css/css.js',
                less: baseUrl + 'require-less/less.js',
                text: baseUrl + 'requirejs-text/text.js',

                // Brix 组件
                'components/base': baseUrl + brixComponentsBaseUrl + 'base/base.js',
                'components/dropdown': baseUrl + brixComponentsBaseUrl + 'dropdown/dropdown.js',
                'components/switch': baseUrl + brixComponentsBaseUrl + 'switch/switch.js',
                'components/pagination': baseUrl + brixComponentsBaseUrl + 'pagination/pagination.js',
                'components/pagination/state': baseUrl + brixComponentsBaseUrl + 'pagination/state.js',
                'components/dialog': baseUrl + brixComponentsBaseUrl + 'dialog/dialog.js',
                'components/dialog/position': baseUrl + brixComponentsBaseUrl + 'dialog/position.js',
                'components/dialogview': baseUrl + brixComponentsBaseUrl + 'dialogview/dialogview.js',
                'components/table': baseUrl + brixComponentsBaseUrl + 'table/table.js',
                'components/table/linkage': baseUrl + brixComponentsBaseUrl + 'table/linkage.js',
                'components/datepicker': baseUrl + brixComponentsBaseUrl + 'datepicker/datepicker.js',
                'components/datepickerwrapper': baseUrl + brixComponentsBaseUrl + 'datepickerwrapper/datepickerwrapper.js',
                'components/datepicker/ancient': baseUrl + brixComponentsBaseUrl + 'datepicker/ancient/datepicker.js',
                'components/popover': baseUrl + brixComponentsBaseUrl + 'popover/popover.js',
                'components/uploader': baseUrl + brixComponentsBaseUrl + 'uploader/uploader.js',
                'components/nprogress': baseUrl + brixComponentsBaseUrl + 'nprogress/nprogress.js',

                'components/hourpicker': baseUrl + brixComponentsBaseUrl + 'hourpicker/hourpicker.js',
                'components/areapicker': baseUrl + brixComponentsBaseUrl + 'areapicker/areapicker.js',
                'components/tree': baseUrl + brixComponentsBaseUrl + 'tree/tree.js',
                'components/tree/tree.node.json.tpl': baseUrl + brixComponentsBaseUrl + 'tree/tree.node.json.tpl.js',
                'components/taginput': baseUrl + brixComponentsBaseUrl + 'taginput/taginput.js',
                'components/suggest': baseUrl + brixComponentsBaseUrl + 'suggest/suggest.js',
                'components/chartxwrapper': baseUrl + brixComponentsBaseUrl + 'chartxwrapper/chartxwrapper.js',

                'components/hello': baseUrl + brixComponentsBaseUrl + 'hello/hello.js',
                'components/hello-extra': baseUrl + brixComponentsBaseUrl + 'hello-extra/hello-extra.js',
                'components/colorpicker': baseUrl + brixComponentsBaseUrl + 'colorpicker/colorpicker.js',
                'components/modal': baseUrl + brixComponentsBaseUrl + 'modal/modal.js',
                'components/editor': baseUrl + brixComponentsBaseUrl + 'editor/editor.js',
                'components/editable': baseUrl + brixComponentsBaseUrl + 'editable/editable.js',
                'components/spin': baseUrl + brixComponentsBaseUrl + 'spin/spin.js',
                'components/countdown': baseUrl + brixComponentsBaseUrl + 'countdown/countdown.js',
                'components/sidebar': baseUrl + brixComponentsBaseUrl + 'sidebar/sidebar.js',
                'components/chart': baseUrl + brixComponentsBaseUrl + 'chart/chart.js',
                'components/imager': baseUrl + brixComponentsBaseUrl + 'imager/imager.js',
                'components/validation': baseUrl + brixComponentsBaseUrl + 'validation/validation.js',
                'components/validation/i18n': baseUrl + 'parsleyjs/src/i18n',
                'components/ellipsis': baseUrl + brixComponentsBaseUrl + 'ellipsis/ellipsis.js',
                'components/progressbarwrapper': baseUrl + brixComponentsBaseUrl + 'progressbarwrapper/progressbarwrapper.js',
                'components/errortips': baseUrl + brixComponentsBaseUrl + 'errortips/errortips.js',
                'components/sidenav': baseUrl + brixComponentsBaseUrl + 'sidenav/sidenav.js',
                'components/footer': baseUrl + brixComponentsBaseUrl + 'footer/footer.js',
                'components/wizard': baseUrl + brixComponentsBaseUrl + 'wizard/wizard.js',
                'components/tab': baseUrl + brixComponentsBaseUrl + 'tab/tab.js',

                'components/ctree': baseUrl + brixComponentsBaseUrl + 'ctree/ctree.js',
                'components/sticky': baseUrl + brixComponentsBaseUrl + 'sticky/sticky.js',
                'components/nav': baseUrl + brixComponentsBaseUrl + 'nav/nav.js',
                'components/readme': baseUrl + brixComponentsBaseUrl + 'readme/readme.js',
                'components/css-layout-debugger': baseUrl + brixComponentsBaseUrl + 'css-layout-debugger/css-layout-debugger.js',
                'components/boilerplate': baseUrl + brixComponentsBaseUrl + 'boilerplate/boilerplate.js'
            }
        },
        paths: { // http://requirejs.org/docs/api.html#config-paths
            // Brix
            'brix/loader': baseUrl + 'brix-loader/dist/loader' + (debug ? '-debug' : ''),
            'brix/base': baseUrl + 'brix-base/dist/base' + (debug ? '-debug' : ''),
            'brix/event': baseUrl + 'brix-event/dist/event' + (debug ? '-debug' : ''),
            'brix/bisheng': baseUrl + 'brix-bisheng/dist/bisheng' + (debug ? '-debug' : ''),
            'brix/animation': baseUrl + 'brix-animation/dist/animation' + (debug ? '-debug' : ''),
            'brix/spa': baseUrl + 'brix-spa/dist/spa',
            'magix': '//g.alicdn.com/thx/magix/2.0/requirejs-magix-min',
            'chartx': '//g.alicdn.com/thx/charts/1.6.1/chartx/',

            // 运行依赖库
            dependencies: baseUrl + '',
            jquery: baseUrl + 'jquery/dist/jquery' + (debug ? '' : '.min'),
            underscore: baseUrl + 'underscore/underscore' + (debug ? '' : '-min'),
            moment: baseUrl + (debug ? 'moment/moment' : 'moment/min/moment.min'),
            handlebars: baseUrl + 'handlebars/handlebars' + (debug ? '' : '.min'),
            mousetrap: baseUrl + 'mousetrap/mousetrap' + (debug ? '' : '.min'),
            mock: baseUrl + 'mockjs/dist/mock' + (debug ? '' : '-min'),
            marked: baseUrl + 'marked/lib/marked',
            Chart: baseUrl + 'chartjs/Chart',
            director: baseUrl + 'director/build/director',
            URIjs: baseUrl + 'uri.js/src/',
            page: baseUrl + 'page/page',
            highlightjs: baseUrl + 'highlightjs/highlight.pack',
            nprogress: baseUrl + 'nprogress/nprogress',
            parsley: baseUrl + 'parsleyjs/dist/parsley' + (debug ? '' : '.min'),
            log: baseUrl + 'log/log',
            accounting: baseUrl + 'accountingjs/accounting' + (debug ? '' : '.min'),
            progressbar: baseUrl + 'progressbar.js/dist/progressbar',
            Sortable: baseUrl + 'Sortable/Sortable',
            fontawesome: baseUrl + 'fontawesome/',
            vue: baseUrl + 'vue/dist/vue' + (debug ? '' : '.min'),

            'css-tool': baseUrl + 'brix-components/css-tool/',
            colors: baseUrl + 'colors/',
            printf: baseUrl + 'brix-components/printf/printf'
        },
        shim: { // http://requirejs.org/docs/api.html#config-shim
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
})();

(function() {
    // 统计使用情况
    (new Image()).src = 'http://c.simba.taobao.com/click.2?m=p&pid=mm_test&path=' + location.host + '&_=' + new Date().getTime()
})();
(function() {
    // 收集运行时异常
    require(['brix/loader'], function(Loader) {
        var Tracker = {
            now: +(new Date()),
            parse: function(error) {
                return {
                    host: location.host,
                    screen: screen.width + 'x' + screen.height,
                    scrollTop: document.documentElement.scrollTop || document.body.scrollTop || 0,
                    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    message: error.message,
                    file: error.fileName != undefined ? error.fileName : undefined,
                    line: error.lineNumber != undefined ? error.lineNumber : undefined,
                    column: error.columnNumber != undefined ? error.columnNumber : undefined,
                    stack: error.stack != undefined ? error.stack.substr(0, 900) : undefined,
                    ecode: error.number != undefined ? error.number & 0xFFFF : undefined,
                    params: error.params != undefined ? error.params : undefined
                }
            },
            send: function(description) {
                var url = 'http://fb.alimama.com/jsonp/feedback/create?_callback=' + 'Brix_' + (Tracker.now++) +
                    '&site=66&form=51&card=92' +
                    '&customer=' + encodeURIComponent(location.host) +
                    '&url=' + encodeURIComponent(location.href) +
                    '&description=' + encodeURIComponent(
                        function(mapped) {
                            var result = []
                            for (var name in mapped) {
                                if (mapped[name] === undefined) continue
                                result.push(
                                    Tracker.fixWidth(name, 10) + ' : ' + mapped[name]
                                )
                            }
                            return result.join('\r\n')
                        }(description)
                    )
                var script = document.createElement('script')
                script.async = true
                script.src = url
                script.onload = function() {
                    script.onload = script.onreadystatechange = null;
                    if (script.parentNode) script.parentNode.removeChild(script)
                    script = null
                }
                script.onerror = function(error) {}
                document.head.appendChild(script)
            },
            fixWidth: function(str, width) {
                for (var i = str.length; i < width; i++) str += ' '
                return str
            }
        }

        Loader.onerror = function(error) {
            if (Math.random() < 0.8) return // 20% 的上报率
            try {
                Tracker.send(
                    Tracker.parse(error)
                )
            } catch (error) {
                console.log(error.stack || error)
            }
        }
    })
})();
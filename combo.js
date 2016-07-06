(function() {
    // [Add support for making combo requests for loading modules](https://github.com/requirejs/requirejs/issues/1201)
    // [RequireJS Request Aggregator](https://gist.github.com/prajwalit/0570797630293fd873fb)
    var __load = require.load
    var INCLUDE = [
        'brix/loader', 'brix/base', 'brix/event', 'brix/animation', 'brix/spa',
        'magix', 'chartx', 'jquery', 'underscore', 'moment', 'handlebars', 'mousetrap', 'mock', 'marked', 'Chart', 'director',
        'components/base', 'components/dropdown', 'components/pagination', 'components/pagination/state', 'components/dialog', 'components/dialog/position', 'components/dialogview', 'components/table', 'components/table/linkage', 'components/datepicker', 'components/datepickerwrapper', 'components/datepicker/ancient', 'components/popover', 'components/uploader', 'components/nprogress', 'components/hourpicker', 'components/areapicker', 'components/tree', 'components/tree/tree.node.json.tpl', 'components/taginput', 'components/suggest', 'components/chartxwrapper', 'components/hello', 'components/hello-extra', 'components/colorpicker', 'components/modal', 'components/editor', 'components/editable', 'components/spin', 'components/countdown', 'components/sidebar', 'components/chart', 'components/imager', 'components/validation', 'components/ellipsis', 'components/progressbarwrapper', 'components/errortips', 'components/sidenav', 'components/sitenav', 'components/footer', 'components/wizard', 'components/tab', 'components/ctree', 'components/sticky', 'components/nav', 'components/readme', 'components/css-layout-debugger', 'components/boilerplate'
    ]
    var EXCLUDE = ['marked']

    var local = ~location.search.indexOf('local') || ~location.host.indexOf('localhost') || ~location.host.indexOf('.local')
    var debug = ~location.search.indexOf('debug')
    var script = function() {
        var scripts = document.getElementsByTagName('script')
        return scripts[scripts.length - 1]
    }()
    var COMBO_BASE = function(script) {
        var src = script.getAttribute('src')
        var baseUrl = /(.+\/)(.+)/.exec(src)[1]
        if (/-debug\.js$/.test(src)) debug = true
        daily = ~baseUrl.indexOf('g-assets.daily.taobao.net')
        cdn = ~baseUrl.indexOf('g.tbcdn.cn') || ~baseUrl.indexOf('g.alicdn.com')
        if (daily || cdn) local = false
        if (local) baseUrl += 'bower_components/'
        return baseUrl
    }(script)
    var needComboModules = []
    var fetching = false

    function doit(modules) {
        var node = document.createElement('script')
        node.type = 'text/javascript'
        node.charset = 'utf-8'
        node.async = true

        var segments = []
        for (var i = 0; i < modules.length; i++) {
            segments.push(modules[i].url.replace(COMBO_BASE, ''))
        }
        node.src = COMBO_BASE + (segments.length > 1 ? '??' : '') + segments.join(',')

        node.addEventListener('load', function(event) {
            for (var i = 0; i < modules.length; i++) {
                modules[i].context.onScriptLoad.call(modules[i].context, event)
            }
        }, false)
        node.addEventListener('error', function(event) {
            for (var i = 0; i < modules.length; i++) {
                modules[i].context.onScriptError.call(modules[i].context, event)
            }
        }, false)

        return node
    }

    require.load = function(context, moduleName, url) {
        console.log(moduleName)
        if (
            EXCLUDE.indexOf(moduleName) !== -1 ||
            INCLUDE.indexOf(moduleName) === -1 ||
            url.indexOf(COMBO_BASE) !== 0
        ) return __load.call(require, context, moduleName, url)

        needComboModules.push({
            context: context,
            moduleName: moduleName,
            url: url
        })
        if (!fetching) {
            fetching = true
            window.setTimeout(function() {
                fetching = false
                document.head.appendChild(doit(needComboModules))
                needComboModules = []
            }, 4)
        }
    }
})();
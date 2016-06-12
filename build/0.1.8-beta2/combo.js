(function() {
    // [Add support for making combo requests for loading modules](https://github.com/requirejs/requirejs/issues/1201)
    // [RequireJS Request Aggregator](https://gist.github.com/prajwalit/0570797630293fd873fb)
    var __load = require.load
    var COMBO_BASE = function() {
        var src = script.getAttribute('src')
        var baseUrl = /(.+\/)(.+)/.exec(src)[1]
        if (/-debug\.js$/.test(src)) debug = true
        daily = ~baseUrl.indexOf('g-assets.daily.taobao.net')
        cdn = ~baseUrl.indexOf('g.tbcdn.cn') || ~baseUrl.indexOf('g.alicdn.com')
        if (daily || cdn) local = false
        if (local) baseUrl += 'bower_components/'
        return baseUrl
    }()
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
        node.src = COMBO_BASE + '??' + segments.join(',')

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
        if (url.indexOf(COMBO_BASE) !== 0) return __load.call(require, context, moduleName, url)

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
/* global require, document, location */
(function() {
    var local = !!~location.search.indexOf('local') || !!~location.host.indexOf('localhost') || !!~location.host.indexOf('.local')
    var debug = !!~location.search.indexOf('debug')
    var daily, cdn
    var base = function() {
        var scripts = document.getElementsByTagName('script')
        var portal = scripts[scripts.length - 1]
        var path = portal.getAttribute('src')
        var base = /(.+\/)(.+)/.exec(path)[1]

        if (/-debug\.js$/.test(path)) debug = true
        daily = !!~base.indexOf('g-assets.daily.taobao.net')
        cdn = !!~base.indexOf('g.tbcdn.cn') || !!~base.indexOf('g.alicdn.com')
        if (daily || cdn) local = false
        if (local || daily) debug = true

        if (local) base += 'bower_components/'

        return base
    }()

    require.config({ // http://requirejs.org/docs/api.html
        waitSeconds: 0, // http://requirejs.org/docs/api.html#config-waitSeconds
        // urlArgs: "bust=" + (new Date()).getTime() // http://requirejs.org/docs/api.html#config-urlArgs
        map: { // http://requirejs.org/docs/api.html#config-map
            '*': {
                // RequireJS Loader 插件
                css: base + 'require-css/css.js',
                less: base + 'require-less/less.js',
                text: base + 'requirejs-text/text.js',
            }
        }
    })

    function gogogo(original, minified) {
        return debug ? original : minified
    }

    var brix = {
        'brix/loader':       base + 'brix-loader/dist/' + gogogo('loader-debug', 'loader'),
        'brix/base':         base + 'brix-base/dist/' + gogogo('base-debug', 'base'),
        'brix/event':        base + 'brix-event/dist/' + gogogo('event-debug', 'event'),
        'brix/animation':    base + 'brix-animation/dist/' + gogogo('animation-debug', 'animation'),
        'brix/components':   base + 'brix-components/dist/components',
        'brix/styles':       base + 'brix-components/dist/styles',
        'brix/dependencies': base,
        'brix/deps':         base
    }
    brix.components = brix['brix/components']
    brix.styles = brix['brix/styles']
    brix.dependencies = brix['brix/dependencies']
    brix.deps = brix.dependencies
    require.config({
        paths: brix
    })

    var deps = {
        jquery:      base + 'jquery/dist/' + gogogo('jquery', 'jquery.min'),
        underscore:  base + 'underscore/' + gogogo('underscore', 'underscore-min'),
        moment:      base + gogogo('moment/moment', 'moment/min/moment.min'),
        handlebars:  base + 'handlebars/' + gogogo('handlebars', 'handlebars.min'),
        mousetrap:   base + 'mousetrap/' + gogogo('mousetrap', 'mousetrap.min'),
        mock:        base + 'mockjs/dist/' + gogogo('mock', 'mock-min'),
        marked:      base + 'marked/lib/marked',
        Chart:       base + 'chartjs/Chart',
        director:    base + 'director/build/director',
        URIjs:       base + 'uri.js/src/',
        page:        base + 'page/page',
        highlightjs: base + 'highlightjs/highlight.pack',
        nprogress:   base + 'nprogress/nprogress',
        parsley:     base + 'parsleyjs/dist/' + gogogo('parsley', 'parsley.min'),
        log:         base + 'log/log',
        accounting:  base + 'accountingjs/' + gogogo('accounting', 'accounting.min'),
        progressbar: base + 'progressbar.js/dist/progressbar',
        Sortable:    base + 'Sortable/Sortable',
        fontawesome: base + 'fontawesome/',
        vue:         base + 'vue/dist/' + gogogo('vue', 'vue.min'),
        colors:      base + 'colors/',
        printf:      base + 'brix-components/printf/printf'
    }
    require.config({
        paths: deps,
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
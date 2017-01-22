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
                    host:       location.host,
                    screen:     screen.width + 'x' + screen.height,
                    scrollTop:  document.documentElement.scrollTop || document.body.scrollTop || 0,
                    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    message:    error.message,
                    moduleId:   error.moduleId != undefined ? error.moduleId : undefined,
                    moduleUrl:  error.moduleId != undefined ? require.toUrl(error.moduleId) : undefined,
                    file:       error.fileName != undefined ? error.fileName : undefined,
                    line:       error.lineNumber != undefined ? error.lineNumber : undefined,
                    column:     error.columnNumber != undefined ? error.columnNumber : undefined,
                    stack:      error.stack != undefined ? error.stack.substr(0, 900) : undefined,
                    ecode:      error.number != undefined ? error.number & 0xFFFF : undefined,
                    params:     error.params != undefined ? error.params : undefined
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
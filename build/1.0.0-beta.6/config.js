!function(){function e(e,s){return n?e:s}var s=!!~location.search.indexOf("local")||!!~location.host.indexOf("localhost")||!!~location.host.indexOf(".local"),n=!!~location.search.indexOf("debug"),r=function(){var e=document.getElementsByTagName("script"),r=e[e.length-1],i=r.getAttribute("src"),t=/(.+\/)(.+)/.exec(i)[1];/-debug\.js$/.test(i)&&(n=!0);var o=!!~t.indexOf("g-assets.daily.taobao.net"),a=!!~t.indexOf("g.tbcdn.cn")||!!~t.indexOf("g.alicdn.com");return(o||a)&&(s=!1,/brix-release\/$/.test(t)&&(t+="1.0.0-beta.6/")),(s||o)&&(n=!0),s&&(t+="bower_components/"),t}();require.config({waitSeconds:0,map:{"*":{css:r+"require-css/css.js"}}});var i={"brix/loader":r+"brix-loader/dist/"+e("loader-debug","loader"),"brix/base":r+"brix-base/dist/"+e("base-debug","base"),"brix/event":r+"brix-event/dist/"+e("event-debug","event"),"brix/animation":r+"brix-animation/dist/"+e("animation-debug","animation"),"brix/components":r+"brix-components/dist/components","brix/styles":r+"brix-components/dist/styles","brix/dependencies":r,"brix/deps":r};i.components=i["brix/components"],i.styles=i["brix/styles"],i.dependencies=i["brix/dependencies"],i.deps=i["brix/dependencies"],require.config({paths:i});var t={jquery:r+"jquery/dist/"+e("jquery","jquery.min"),underscore:r+"underscore/"+e("underscore","underscore-min"),moment:r+"moment/"+e("moment","min/moment.min"),handlebars:r+"handlebars/"+e("handlebars","handlebars.min"),mock:r+"mockjs/dist/"+e("mock","mock-min"),marked:r+"marked/lib/marked",highlightjs:r+"highlightjs/highlight.pack",nprogress:r+"nprogress/nprogress",parsley:r+"parsleyjs/dist/"+e("parsley","parsley.min"),accounting:r+"accountingjs/"+e("accounting","accounting.min"),progressbar:r+"progressbar.js/dist/progressbar",Sortable:r+"Sortable/Sortable",vue:r+"vue/dist/"+e("vue","vue.min")};require.config({paths:t,shim:{highlightjs:{exports:"hljs"},parsley:{exports:"Parsley"}}})}();
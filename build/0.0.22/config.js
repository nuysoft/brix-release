!function(){var e,o,s=~location.search.indexOf("local")||~location.host.indexOf("localhost")||~location.host.indexOf(".local"),r=~location.search.indexOf("debug"),t=function(){var e=document.getElementsByTagName("script");return e[e.length-1]}(),n=function(){var r=t.getAttribute("src"),n=/(.+\/)(.+)/.exec(r)[1];return e=~n.indexOf("g-assets.daily.taobao.net"),o=~n.indexOf("g.tbcdn.cn"),(e||o)&&(s=!1),s&&(n+="bower_components/"),n}(),a=function(){var o="brix-components/";return s&&(r=!0),e&&(r=!0),r||(o+="dist/"),o}();require.config({waitSeconds:15,map:{"*":{css:n+"require-css/css.js",less:n+"require-less/less.js",text:n+"requirejs-text/text.js","components/base":n+a+"base/base.js","components/dropdown":n+a+"dropdown/dropdown.js","components/pagination":n+a+"pagination/pagination.js","components/pagination/state":n+a+"pagination/state.js","components/dialog":n+a+"dialog/dialog.js","components/dialog/position":n+a+"dialog/position.js","components/dialogview":n+a+"dialogview/dialogview.js","components/table":n+a+"table/table.js","components/table/linkage":n+a+"table/linkage.js","components/table/priority":n+a+"table/priority.js","components/datepicker":n+a+"datepicker/datepicker.js","components/datepickerwrapper":n+a+"datepickerwrapper/datepickerwrapper.js","components/popover":n+a+"popover/popover.js","components/uploader":n+a+"uploader/uploader.js","components/nprogress":n+a+"nprogress/nprogress.js","components/hourpicker":n+a+"hourpicker/hourpicker.js","components/areapicker":n+a+"areapicker/areapicker.js","components/tree":n+a+"tree/tree.js","components/tree/tree.node.json.tpl":n+a+"tree/tree.node.json.tpl.js","components/taginput":n+a+"taginput/taginput.js","components/suggest":n+a+"suggest/suggest.js","components/chartxwrapper":n+a+"chartxwrapper/chartxwrapper.js","components/hello":n+a+"hello/hello.js","components/hello-extra":n+a+"hello-extra/hello-extra.js","components/colorpicker":n+a+"colorpicker/colorpicker.js","components/modal":n+a+"modal/modal.js","components/editor":n+a+"editor/editor.js","components/editable":n+a+"editable/editable.js","components/spin":n+a+"spin/spin.js","components/countdown":n+a+"countdown/countdown.js","components/sidebar":n+a+"sidebar/sidebar.js","components/chart":n+a+"chart/chart.js","components/imager":n+a+"imager/imager.js","components/validation":n+a+"validation/validation.js","components/validation/i18n":n+"parsleyjs/src/i18n","components/ellipsis":n+a+"ellipsis/ellipsis.js","components/progressbarwrapper":n+a+"progressbarwrapper/progressbarwrapper.js","components/errortips":n+a+"errortips/errortips.js","components/sidenav":n+a+"sidenav/sidenav.js","components/ctree":n+a+"ctree/ctree.js","components/sticky":n+a+"sticky/sticky.js","components/nav":n+a+"nav/nav.js","components/readme":n+a+"readme/readme.js","components/css-layout-debugger":n+a+"css-layout-debugger/css-layout-debugger.js","components/boilerplate":n+a+"boilerplate/boilerplate.js"}},paths:{"brix/loader":n+"brix-loader/dist/loader","brix/base":n+"brix-base/dist/base","brix/event":n+"brix-event/dist/event","brix/bisheng":n+"brix-bisheng/dist/bisheng","brix/spa":n+"brix-spa/dist/spa",magix:"http://g.tbcdn.cn/thx/magix/2.0/requirejs-magix-min",chartx:"http://g.tbcdn.cn/thx/charts/1.6.1/chartx/",dependencies:n+"",jquery:n+"jquery/dist/jquery",underscore:n+"underscore/underscore",moment:n+"moment/moment",handlebars:n+"handlebars/handlebars",mousetrap:n+"mousetrap/mousetrap",mock:n+"mockjs/dist/mock",marked:n+"marked/lib/marked",d3:n+"d3/d3",Chart:n+"chartjs/Chart",director:n+"director/build/director",URIjs:n+"uri.js/src/",page:n+"page/page",highlightjs:n+"highlightjs/highlight.pack",nprogress:n+"nprogress/nprogress",parsley:n+"parsleyjs/dist/parsley",log:n+"log/log",accounting:n+"accountingjs/accounting",progressbar:n+"progressbar.js/dist/progressbar",Sortable:n+"Sortable/Sortable","css-tool":n+"brix-components/css-tool/",colors:n+"colors/",printf:n+"brix-components/printf/printf"},shim:{Chart:{exports:"Chart"},director:{exports:"Router"},highlightjs:{exports:"hljs"},parsley:{exports:"Parsley"}}}),require(["css!colors/css/colors.css"]),require(["css!css-tool/tool.css"])}(),function(){var e="http://c.simba.taobao.com/click.2?m=p&pid=mm_test&path="+location.host+"&_="+(new Date).getTime(),o=new Image;o.src=e}();
define(["jquery","underscore","handlebars","brix/base"],function(t,e,n,o){function a(){}return e.extend(a.prototype,o.prototype,{options:{mode:"normal"},render:function(){var e=this,o="simple"===this.options.mode?!0:!1;t.ajax({url:"http://mo.m.taobao.com/union/jsonp/sitenav",dataType:"jsonp",success:function(a){var i=t(e.element);i.html(n.compile(a.html)({simple:o})),i=i.find(".alimama-site-nav");var r=i.attr("data-cdn");e._insertScript(r)}})},_insertScript:function(t){var e=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.src=t,e.appendChild(n)},destroy:function(){window.MMSiteNav&&window.MMSiteNav.destroy()}}),a});
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("jquery"),require("underscore"),require("marked"),require("highlightjs"),require("brix/loader"),require("brix/base")):"function"==typeof define&&define.amd?define(["jquery","underscore","marked","highlightjs","brix/loader","brix/base"],r):"object"==typeof exports?exports["components/readme"]=r(require("jquery"),require("underscore"),require("marked"),require("highlightjs"),require("brix/loader"),require("brix/base")):e["components/readme"]=r(e.jquery,e.underscore,e.marked,e.highlightjs,e["brix/loader"],e["brix/base"])}(this,function(e,r,t,n,i,o){return function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){var n,i;n=[t(2),t(3),t(4),t(5),t(6),t(7),t(8),t(9)],i=function(e,r,t,n,i,o,a,s){function c(){}return r.extend(c.prototype,a.prototype,{options:{url:""},render:function(){var a=this;e(this.element).append(s);var c=e.Deferred();this.loadDoc(function(s){o.boot(a.element,function(){var d=o.query("components/spin",a.element);o.destroy(d,function(){e(a.element).find("div.readme").html(t(s,{renderer:n,gfm:!0})),a.trimHTML(a.element),a.trimPredefined(a.element);var d=e(a.element).find("table");r.each(d,function(r){r=e(r),r.hasClass("table")||r.addClass("table table-bordered")}),e(a.element).find("pre code").each(function(e,r){i.highlightBlock(r)}),o.boot(a.element,function(){c.resolve()})})})})},loadDoc:function(r){return e.ajax(this.options.url).done(function(e,t,n){r(e,t,n)})},trimHTML:function(t){var n=e("[bx-name]",t);r.each(n,function(r){var t=o.Util.trimHTML(r),n=e(r).closest(".bs-example");e("<pre>").append(e('<code class="html">').text(t)).appendTo(n)})},trimPredefined:function(t){var n=e("pre",t);r.each(n,function(r){r=e(r);var t,n=r.find(">code");n.length?(t=o.Util.trimPredefined(n[0]),n.text(t)):(t=o.Util.trimPredefined(r[0]),r.text(t))})}}),c}.apply(r,n),!(void 0!==i&&(e.exports=i))},function(r,t){r.exports=e},function(e,t){e.exports=r},function(e,r){e.exports=t},function(e,r,t){var n,i;n=[t(4)],i=function(e){var r=/\{\s*([#.].*)\s*\}$/,t=new e.Renderer;return t.paragraph=function(e){var t,n=r.exec(e),i="",o="<p";if(n){t=n[1].split(" ");for(var a=0;a<t.length;a++)switch(t[a][0]){case"#":o+=' id="'+t[a].slice(1)+'" ';break;case".":i+=" "+t[a].slice(1)}i&&(o+=' class="'+i+'" '),e=e.replace(r,"")}return o+">"+e+"</p>\n"},t}.apply(r,n),!(void 0!==i&&(e.exports=i))},function(e,r){e.exports=n},function(e,r){e.exports=i},function(e,r){e.exports=o},function(e,r,t){var n;n=function(){return'<div class="readme">\n    <div bx-name="components/spin" data-type="three-bounce" class="spin"></div>\n</div>'}.call(r,t,r,e),!(void 0!==n&&(e.exports=n))}])});
//# sourceMappingURL=readme.js.map
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("components/base")):"function"==typeof define&&define.amd?define(["jquery","underscore","components/base"],e):"object"==typeof exports?exports["components/suggest"]=e(require("jquery"),require("underscore"),require("components/base")):t["components/suggest"]=e(t.jquery,t.underscore,t["components/base"])}(this,function(t,e,i){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){var n,o;n=[i(2),i(3),i(4),i(5),i(6),i(7)],o=function(t,e,i,n,o,r){function s(){}var a=".suggest",l=".input",u=".done",c=".internal";return e.extend(s.prototype,i.prototype,{options:{template:"",data:[]},init:function(){var e=t.Deferred(),i=[],n=this.options.template,o=this.options.css;if(n&&i.push(n),o&&(0!==o.indexOf("css!")&&(o="css!"+o),i.push(o)),window.require(i,function(){n&&(r=arguments[0]),e.resolve()}),i.length)return e.promise()},render:function(){this.$element=t(this.element);var i=e.template(o)(this.options);this.$relatedElement=t(i).insertAfter(this.$element),this.$menu=this.$relatedElement.find(".dropdown-menu"),this._fill(this.options.data)._beautify(),this._bindEvent()},data:function(t){return t?(this.options.data=t,void this._fill(t)._beautify()):this.options.data},val:function(t){return void 0===t?this.$element.val():(this.$element.val(t),this)},open:function(){return this.$relatedElement.show(),this},close:function(){return this.$relatedElement.hide(),this},focus:function(){return this.$element.focus(),this},blur:function(){return this.$element.blur(),this},_bindEvent:function(){var e=this;this.$element.off("keyup"+a+c).on("keyup"+a+c,function(t){return e._handlerHooks[t.which]?void e._handler(t):void e._sos(t.target.value)}).off("click"+a+c).on("click"+a+c,function(t){e._sos(t.target.value)}),this.$relatedElement.off("click"+a+c).on("click"+a+c,".dropdown-menu > li",function(i){e._moveTo(t(i.currentTarget).index()),e._select()});var i="click"+a+"_"+this.clientId;t(document.body).off(i).on(i,function(t){e.element!==t.target&&(e.$relatedElement.has(t.target).length||e.close())})},_sos:function(t){this.trigger("change"+a+l,t)},_handler:function(t){var e=this._items();this._handlerHooks[t.which].call(this,t,e.all,e.active,e.index)},_items:function(){var t=this.$menu.find("> li"),e=t.filter(".active"),i=t.index(e);return{all:t,active:e,index:i}},_handlerHooks:{38:function(t,e,i,n){this._moveTo(e,i,--n)},40:function(t,e,i,n){return this.$menu.is(":visible")?void this._moveTo(e,i,++n):void this._fill(this.options.data)._beautify()},13:function(t,e,i,n){this.$menu.is(":visible")&&this._select(e,i,n)},27:function(t,e,i,n){this.close()}},_select:function(e,i,n){if(!e){var o=this._items();e=o.items,i=o.active,n=o.index}var r=t.trim(i.text());this.$element.val(r);var s="change"+a+u,l=t.Event(s,{target:this.element});return this.trigger(l,r),this.close().focus(),this},_moveTo:function(t,e,i){if(!e&&!i){i=t;var n=this._items();t=n.all,e=n.active}return i=(i+t.length)%t.length,e.removeClass("active"),t.eq(i).addClass("active"),this},_beautify:function(){this.$relatedElement[this.options.data&&this.options.data.length?"show":"hide"]();var t=n(this.$element,this.$relatedElement,"bottom","left");return this.$relatedElement.offset(t),this},_fill:function(t){var i,n=this,o=this.val(),s=e.template(r),a=e.map(t,function(t,e){return i=s({data:n._highlight(t,o)}),"<li>"+i+"</li>"}).join("");return this.$menu.empty().html(a).find("> li:first-child").addClass("active"),this},_highlight:function(t,e){if(!e)return t;var i=new RegExp(e,"ig");return(""+t).replace(i,function(t){return'<span class="highlight">'+t+"</span>"})},destroy:function(){this.$relatedElement.remove();var e="click"+a+"_"+this.clientId;t(document.body).off(e)}}),s}.apply(e,n),!(void 0!==o&&(t.exports=o))},function(e,i){e.exports=t},function(t,i){t.exports=e},function(t,e){t.exports=i},function(t,e,i){var n,o;n=[i(2)],o=function(t){function e(e,n,o,a){var l=t(e);if(!l.length)return i(n);var u=l.offset(),c=u.left,h=u.top,f=l.outerWidth(),d=l.outerHeight(),p=t(n),v="none"!==p.css("display");p.show();var m=p.outerWidth(),g=p.outerHeight();v||p.hide();var b,_,y=f/2-m/2,x=d/2-g/2;switch(o){case"top":b=c+y,_=h-g;break;case"bottom":b=c+y,_=h+d;break;case"left":b=c-m,_=h+x;break;case"right":b=c+f,_=h+x}if(r.test(o)!==r.test(a)&&s.test(o)!==s.test(a))switch(a){case"top":_=h;break;case"bottom":_=h+d-g;break;case"left":b=c;break;case"right":b=c+f-m}return{left:b,top:_}}function i(e,i){var n,o;if(i)n=parseFloat(e,12),o=parseFloat(i,12);else{var r=t(e),s="none"!==r.css("display");r.show(),n=r.outerWidth(),o=r.outerHeight(),s||r.hide()}var a=t(window),l=a.width(),u=a.height(),c=a.scrollLeft(),h=a.scrollTop();return{left:l/2-n/2+c,top:u/2-o/2+h}}function n(e,i,n){var o=t(e),r="none"!==o.css("display");o.show();var s=o.outerWidth(),a=o.outerHeight();r||o.hide();var l={opacity:0,left:i.left,top:i.top};switch(n){case"top":l.top=l.top-.5*a;break;case"bottom":l.top=l.top+.5*a;break;case"left":l.left=l.left-.5*s;break;case"right":default:l.left=l.left+.5*s}return l}function o(t,e){return{opacity:1,left:e.left,top:e.top}}var r=/top|bottom/,s=/left|right/;return e.center=i,e.start=n,e.end=o,e}.apply(e,n),!(void 0!==o&&(t.exports=o))},function(t,e,i){var n;n=function(){return'<div class="suggest dropdown">\n    <ul class="dropdown-menu"></ul>\n</div>'}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(){return'<a href="javascript:;"><%= data %></a>'}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))}])});
//# sourceMappingURL=suggest.js.map
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("components/base"),require("brix/event")):"function"==typeof define&&define.amd?define(["jquery","underscore","components/base","brix/event"],e):"object"==typeof exports?exports["components/dialog"]=e(require("jquery"),require("underscore"),require("components/base"),require("brix/event")):t["components/dialog"]=e(t.jquery,t.underscore,t["components/base"],t["brix/event"])}(this,function(t,e,o,n){return function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){var n,i;n=[o(2),o(3),o(4),o(5),o(6),o(7)],i=function(t,e,o,n,i,s){function l(){arguments.length&&(this.options=e.extend({},this.options,arguments[0]),this.init(),this.render()),c.push(this)}var r=150,a="swing",d=".dialog",h=[],c=[],p={PENDING:"pending",OPENED:"opened",CLOSED:"closed"};return e.extend(l.prototype,o.prototype,{options:{placement:"right",align:"top",left:void 0,top:void 0,width:"auto",height:"auto",offset:{left:0,top:0},className:"",content:"",closable:!0,movable:!1,modal:!1,singleton:!0},state:p.PENDING,init:function(){this.$element=t(this.element||this.options.element),this.$manager=new n("bx-"),this.options.css&&e.isString(this.options.css)&&window.require(["css!"+this.options.css]),this.options["class"]&&(this.options.className=this.options["class"]),(""+this.options.content).indexOf("<")===-1&&(this.options.content='<div class="dialog-body">'+this.options.content+"<div>")},render:function(){this.fill(),this.$manager.delegate(this.$element,this)},destroy:function(){this.close(),c=e.without(c,this);var o="keyup.dialog_autohide_"+this.clientId;h.length||t(document.body).off(o),this.$manager.undelegate(this.$element),this.$manager.undelegate(this.$relatedElement),this.$relatedElement.remove(),this.$relatedElement=null,this.$backdropElement=null},fill:function(){var o=e.template(s)(this.options);return this.$relatedElement||(this.$relatedElement=t(o).appendTo(document.body).hide()),this.options.singleton||this.$relatedElement.removeClass("dialog-singleton"),this.$relatedElement.find(".dialog-content").html(this.options.content),this.$relatedElement.css({width:this.options.width,height:this.options.height}),this.$backdropElement=t(".dialog-backdrop"),this.$backdropElement.length||(this.$backdropElement=t('<div class="dialog-backdrop"></div>').hide().appendTo(document.body)),this.options.modal,this.options.className&&this.$relatedElement.addClass(this.options.className),this.options.css&&e.isObject(this.options.css)&&this.$relatedElement.css(this.options.css),this.$manager.delegate(this.$relatedElement,this),this},open:function(){!this.element&&this.options.element&&this.options.element!==this.$element[0]&&(this.$element=t(this.options.element)),this.options.singleton&&e.each(h,function(t){t.options.singleton&&t.close()}),this.fill(),this._zIndex("open"),this._topmost(),this._move(),this.options.modal&&(t(document.body).addClass("modal-open"),this.$backdropElement.show().css("z-index",+this.$relatedElement.css("z-index")-1));var o=this._offset();return this.$relatedElement.show().stop().css(i.start(this.$relatedElement,o)).animate(i.end(this.$relatedElement,o),r,a),this._autoHide(),h.push(this),this.trigger("open"+d),this.state=p.OPENED,this},close:function(){if(!this.$relatedElement||!this.$relatedElement.length)return this;if(this.state===p.CLOSED)return this;var o=t.Event("close"+d);if(this.trigger(o),!o.isDefaultPrevented()){var n=this,s=this._offset();if(this.$relatedElement.stop().animate(i.start(this.$relatedElement,s),r,a,function(){n.$relatedElement&&n.$relatedElement.hide()}),h=e.without(h,this),this.options.modal){var l=e.filter(h,function(t){if(t.options.modal)return t}).length;l||(t(document.body).removeClass("modal-open"),this.$backdropElement.hide())}return this._zIndex("close"),this.state=p.CLOSED,this}},_offset:function(){var t=void 0!==this.options.left&&void 0!==this.options.top?{left:this.options.left,top:this.options.top}:i(this.$element,this.$relatedElement,this.options.placement,this.options.align);return t={left:t.left+(this.options.offset.left||0),top:t.top+(this.options.offset.top||0)}},_autoHide:function(){var e="keyup.dialog_autohide_"+this.clientId;return t(document.body).off(e).on(e,function(t){if(27===t.keyCode){var e=h[h.length-1];e&&e.options.closable&&e.close()}}),this},_zIndex:function(t){if(h.length){var o,n=e.max(h,function(t){return+t.$relatedElement.css("z-index")}),i=+n.$relatedElement.css("z-index");switch(t){case"open":if(o=this,o===n)return;break;case"close":o=h[h.length-1]}return o.$backdropElement&&o.$backdropElement.css("z-index",i+1),o.$relatedElement.css("z-index",i+2),this}},_topmost:function(){var t=this,e="mousedown.dialog_topmost_"+this.clientId;return this.$relatedElement.off(e).on(e,function(){t._zIndex("open"),h.push(t)}),this},_move:function(){if(!this.options.movable)return this;var e=this,o="mousedown.dialog_move_"+this.clientId,n="mousemove.dialog_move_"+this.clientId,i="mouseup.dialog_move_"+this.clientId,s=t(document.body),l=this.$relatedElement.find(".dialog-header");return l.addClass("cursor-move"),l.off(o).on(o,function(t){var o=l.offset(),r={left:t.pageX-o.left,top:t.pageY-o.top};s.on(n,function(t){return e.$relatedElement.offset({left:t.pageX-r.left,top:t.pageY-r.top}),!1}),s.on(i,function(){return s.off(n),s.off(i),!1})}),this}}),l.open=function(t){return new l(t).open()},l.close=function(){var t=h.pop();t&&t.close()},l.closeAll=function(){return e.each(h,function(t){t.close()}),this},l.destroy=function(){return e.each(c,function(t){t.destroy()}),this},l}.apply(e,n),!(void 0!==i&&(t.exports=i))},function(e,o){e.exports=t},function(t,o){t.exports=e},function(t,e){t.exports=o},function(t,e){t.exports=n},function(t,e,o){var n,i;n=[o(2)],i=function(t){function e(e,n,i,r){var a=t(e);if(!a.length)return o(n);var d=a.offset(),h=d.left,c=d.top,p=a.outerWidth(),u=a.outerHeight(),f=t(n),m="none"!==f.css("display");f.show();var g=f.outerWidth(),v=f.outerHeight();m||f.hide();var b,$,E=p/2-g/2,x=u/2-v/2;switch(i){case"top":b=h+E,$=c-v;break;case"bottom":b=h+E,$=c+u;break;case"left":b=h-g,$=c+x;break;case"right":b=h+p,$=c+x}if(s.test(i)!==s.test(r)&&l.test(i)!==l.test(r))switch(r){case"top":$=c;break;case"bottom":$=c+u-v;break;case"left":b=h;break;case"right":b=h+p-g}return{left:b,top:$}}function o(e,o){var n,i;if(o)n=parseFloat(e,12),i=parseFloat(o,12);else{var s=t(e),l="none"!==s.css("display");s.show(),n=s.outerWidth(),i=s.outerHeight(),l||s.hide()}var r=t(window),a=r.width(),d=r.height(),h=r.scrollLeft(),c=r.scrollTop();return{left:a/2-n/2+h,top:d/2-i/2+c}}function n(e,o,n){var i=t(e),s="none"!==i.css("display");i.show();var l=i.outerWidth(),r=i.outerHeight();s||i.hide();var a={opacity:0,left:o.left,top:o.top};switch(n){case"top":a.top=a.top-.5*r;break;case"bottom":a.top=a.top+.5*r;break;case"left":a.left=a.left-.5*l;break;case"right":default:a.left=a.left+.5*l}return a}function i(t,e){return{opacity:1,left:e.left,top:e.top}}var s=/top|bottom/,l=/left|right/;return e.center=o,e.start=n,e.end=i,e}.apply(e,n),!(void 0!==i&&(t.exports=i))},function(t,e,o){var n;n=function(){return'<div class="dialog dialog-singleton dialog-<%= placement %>">\n    <button bx-click="close" type="button" class="dialog-close <%= closable ? \'\' : \'hide\' %>"><span class="brixfont">&#xe62d;</span><!-- &times; --></button>\n    <div class="dialog-content">\n        <%= content %>\n        <!-- \n        <div class="dialog-header">\n            <h4 class="dialog-title">Title</h4>\n        </div>\n        <div class="dialog-body">Body</div>\n        <div class="dialog-footer">\n            <button bx-click="close" type="button" class="btn btn-default">Close</button>\n            <button bx-click="close" type="button" class="btn btn-primary">Save</button>\n        </div>\n         -->\n    </div>\n</div>'}.call(e,o,e,t),!(void 0!==n&&(t.exports=n))}])});
//# sourceMappingURL=dialog.js.map
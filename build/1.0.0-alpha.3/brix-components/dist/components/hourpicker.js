!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery"),require("underscore"),require("moment"),require("brix/base"),require("brix/event")):"function"==typeof define&&define.amd?define(["jquery","underscore","moment","brix/base","brix/event"],e):"object"==typeof exports?exports["components/hourpicker"]=e(require("jquery"),require("underscore"),require("moment"),require("brix/base"),require("brix/event")):t["components/hourpicker"]=e(t.jquery,t.underscore,t.moment,t["brix/base"],t["brix/event"])}(this,function(t,e,i,n,r){return function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){var n,r;n=[i(2),i(3),i(4),i(5),i(6),i(7),i(8)],r=function(t,e,i,n,r,a,s){function o(){}var c=".hourpicker",l={DEFAULT:[[1,"周一"],[2,"周二"],[3,"周三"],[4,"周四"],[5,"周五"],[6,"周六"],[0,"周日"]],GROUPED:[["12345","工作日"],["60","休息日"]]},u=e.range(0,24);return e.extend(o.prototype,n.prototype,{options:{simplify:!1,value:"",utcOffset:function(){var t=i().utcOffset()/60,e=Math.abs(t),n=e<10?"0"+e:e;return n=t<0?"-"+n:"+"+n,n+=":00"}()},init:function(){},render:function(){var i=this;this.$element=t(this.element),this.$manager=new r("bx-");var n=e.template(s)({utcOffset:this.options.utcOffset,simplify:this.options.simplify,DICT:this.options.simplify?l.GROUPED:l.DEFAULT,HOURS:u});if(this.$element.append(n),this.options.value){var a,o={};switch(t.type(this.options.value)){case"string":a=this.options.value.split(this.options.value.indexOf(",")!=-1?",":""),e.each(a,function(e){o[t.trim(e)]=u});break;case"array":a=this.options.value,e.each(a,function(t){o[t]=u});break;case"object":o=this.options.value}this.val(o)}this.$manager.delegate(this.$element,this),t(".picker-hours",this.$element).contents().filter(function(t,e){return 3===e.nodeType}).remove();var p=t(".picker-hour",this.$element);p.on("mousedown",function(e){var n=t(this),r=!n.hasClass("active");n.toggleClass("active"),i._merge(),i._syncShortcut();var a=t(this).siblings();a.on("mouseenter.drag"+c,function(e){var n=t(this);n[r?"addClass":"removeClass"]("active"),i._merge(),i._syncShortcut(),e.preventDefault()}),t(document.body).off("mouseup.drag"+c).on("mouseup.drag"+c,function(){a.off("mouseenter.drag"+c),t(document.body).off("mouseup.drag"+c),i.trigger("change"+c,i.val())}),e.preventDefault()})},val:function(){return arguments.length?(this._set.apply(this,arguments),this.trigger("change"+c,this._get()),this):this._get()},shortcut:function(t,i){void 0===i&&(i=t,t=void 0),e.isArray(i)||(i=[i]);var n={};e.each(i,function(t){n[t]=u}),this.val(n)},toggle:function(t,e){void 0===e&&(e=t,t=void 0);var i=this.val()[e];24===i.length?this.val(e,[]):this.val(e,u),t&&t.preventDefault()},apply:function(i,n,r){var s=this,o=t(i.target),c=t(".apply-dialog",this.$element);switch(n){case"to":this._tmp=this._tmp||{},this._tmp.from=r,this._tmp.$target=o.css("visibility","visible");var l=a(o,c,"bottom","right"),u=parseInt(c.css("margin-top"),10)||0;c.show().offset({left:l.left,top:l.top+u}),c.find("label[data-value]").removeClass("disabled").find('input[name="shortcut"]').prop({checked:!1,disabled:!1}).end().end().find("label[data-value="+r+"]").addClass("disabled").find("input").prop("disabled",!0);break;case"do":var p=e.map(c.find("input:checked"),function(t){return t.value}),d=this.val()[this._tmp.from];e.each(p,function(t){s.val(t,d)}),c.hide(),this._tmp.$target.css("visibility","inherit");break;case"close":this._tmp.$target.css("visibility","inherit"),c.hide()}},_get:function(){var i,n,r={},a=this.$element.find(".picker-day");return e.each(a,function(a){a=t(a),n=[],i=a.find(".picker-hour.active"),e.each(i,function(e){n.push(+t(e).attr("data-value"))}),r[a.attr("data-value")]=n}),r},_set:function(t){var i=[].slice.call(arguments),n=this.$element.find(".picker-day");2===arguments.length?(t={},t[i[0]]=i[1],n.filter("[data-value="+i[0]+"]").find(".picker-hour").removeClass("active")):n.find(".picker-hour").removeClass("active");var r;e.each(t,function(t,i){r=n.filter("[data-value="+i+"]").find(".picker-hour"),e.each(t,function(t){r.filter("[data-value="+t+"]").addClass("active")})}),this._merge(),this._syncShortcut()},_merge:function(){var i=t(".picker-hour",this.$element);e.each(i,function(e){e=t(e);var i=e.find(".picker-hour-start"),n=e.find(".picker-hour-end");e.hasClass("active")?(i[e.prev().hasClass("active")?"hide":"show"](),n[e.next().hasClass("active")?"hide":"show"]()):(i.hide(),n.hide())})},_syncShortcut:function(){function e(t,e){for(var n,r=0;r<t.length;r++)if(n=t[r],i[n].length<24)return!1;for(var a=0;a<e.length;a++)if(n=e[a],0!==i[n].length)return!1;return!0}if(!this.options.simplify){var i=this.val();t(".shortcuts input[name=shortcut]:eq(0)",this.$element).prop("checked",e("0123456","")),t(".shortcuts input[name=shortcut]:eq(1)",this.$element).prop("checked",e("12345","06")),t(".shortcuts input[name=shortcut]:eq(2)",this.$element).prop("checked",e("06","12345"))}},destroy:function(){this.$manager.undelegate(this.$element),this.$element.empty()}}),o}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(e,i){e.exports=t},function(t,i){t.exports=e},function(t,e){t.exports=i},function(t,e){t.exports=n},function(t,e){t.exports=r},function(t,e,i){var n,r;n=[i(2)],r=function(t){function e(e,n,r,o){var c=t(e);if(!c.length)return i(n);var l=c.offset(),u=l.left,p=l.top,d=c.outerWidth(),h=c.outerHeight(),f=t(n),v="none"!==f.css("display");f.show();var m=f.outerWidth(),b=f.outerHeight();v||f.hide();var g,y,k=d/2-m/2,x=h/2-b/2;switch(r){case"top":g=u+k,y=p-b;break;case"bottom":g=u+k,y=p+h;break;case"left":g=u-m,y=p+x;break;case"right":g=u+d,y=p+x}if(a.test(r)!==a.test(o)&&s.test(r)!==s.test(o))switch(o){case"top":y=p;break;case"bottom":y=p+h-b;break;case"left":g=u;break;case"right":g=u+d-m}return{left:g,top:y}}function i(e,i){var n,r;if(i)n=parseFloat(e,12),r=parseFloat(i,12);else{var a=t(e),s="none"!==a.css("display");a.show(),n=a.outerWidth(),r=a.outerHeight(),s||a.hide()}var o=t(window),c=o.width(),l=o.height(),u=o.scrollLeft(),p=o.scrollTop();return{left:c/2-n/2+u,top:l/2-r/2+p}}function n(e,i,n){var r=t(e),a="none"!==r.css("display");r.show();var s=r.outerWidth(),o=r.outerHeight();a||r.hide();var c={opacity:0,left:i.left,top:i.top};switch(n){case"top":c.top=c.top-.5*o;break;case"bottom":c.top=c.top+.5*o;break;case"left":c.left=c.left-.5*s;break;case"right":default:c.left=c.left+.5*s}return c}function r(t,e){return{opacity:1,left:e.left,top:e.top}}var a=/top|bottom/,s=/left|right/;return e.center=i,e.start=n,e.end=r,e}.apply(e,n),!(void 0!==r&&(t.exports=r))},function(t,e,i){var n;n=function(){return'<div class="hourpicker">\n    <div class="apply-dialog">\n        <div class="apply-dialog-body">\n            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n            <label data-value="<%= DICT[i][0] %>"><input type="checkbox" name="shortcut" value="<%= DICT[i][0] %>"> <%= DICT[i][1] %></label>\n            <% } %>\n        </div>\n        <div class="apply-dialog-footer">\n            <button class="btn btn-default submit" bx-click="apply(\'do\')">确认</button>\n            <a href="javascript: void(0);" bx-click="apply(\'close\')" class="btn btn-default cancel ml5">取消</a>\n        </div>\n    </div>\n    <div class="shortcuts <%= simplify ? \'hide\' : \'\' %>">\n        <label class="mr50">\n            <input type="radio" bx-click="shortcut([0,1,2,3,4,5,6])" name="shortcut">\n            全日程投放\n        </label>\n        <label class="mr50">\n            <input type="radio" bx-click="shortcut([1,2,3,4,5])" name="shortcut">\n            工作日（周一至周五）投放\n        </label>\n        <label>\n            <input type="radio" bx-click="shortcut([0,6])" name="shortcut">\n            休息日（周六、周日）投放\n        </label>\n        <div class="utc">当前排期时间：GMT <%= utcOffset %></div>\n    </div>\n    <table class="picker-days">\n        <thead>\n            <tr>\n                <td width="160">时间段</td>\n                <td class="picker-day-range">\n                    <span class="item item-0">0:00</span>\n                    <span class="item item-6">6:00</span>\n                    <span class="item item-12">12:00</span>\n                    <span class="item item-18">18:00</span>\n                    <span class="item item-24">24:00</span>\n                </td>\n                <td width="160" align="center">操作</td>\n            </tr>\n        </thead>\n        <tbody>\n            <% for ( var i = 0; i < DICT.length; i++ ) { %>\n            <tr class="picker-day" data-value="<%= DICT[i][0] %>">\n                <td class="picker-label">\n                    <span bx-click="toggle(<%= DICT[i][0] %>)"><%= DICT[i][1] %></span>\n                </td>\n                <td class="">\n                    <div class="picker-hours">\n                        <% for ( var ii = 0; ii < 24; ii++ ) { %>\n                        <div class="picker-hour <%= ii % 6 === 0 ? \'milestone\' : \'\'%>" data-value=<%= ii %>>\n                            <div class="picker-hour-line"></div>\n                            <div class="picker-hour-duration"></div>\n                            <div class="picker-hour-start bottom">\n                                <div class="picker-hour-arrow arrow"></div>\n                                <span><%= ii %>:00</span>\n                            </div>\n                            <div class="picker-hour-end top">\n                                <div class="picker-hour-arrow arrow"></div>\n                                <span><%= ii+1 %>:00</span>\n                            </div>\n                        </div>\n                        <% } %>\n                        <div class="picker-hour milestone">\n                            <div class="picker-hour-line"></div>\n                        </div>\n                    </div>\n                </td>\n                <td align="center">\n                    <div class="operation">\n                        <a bx-click="apply(\'to\', <%= DICT[i][0] %>)" href="javascript: void(0);">复制到</a>\n                    </div>\n                </td>\n            </tr>\n            <% } %>\n        </tbody>\n    </table>\n</div>'}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))}])});
//# sourceMappingURL=hourpicker.js.map
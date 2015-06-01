define(["jquery","underscore","moment","brix/loader","components/base","brix/event","components/datepicker","../dialog/position.js","./datepickerwrapper.tpl.js","css!./datepickerwrapper.css"],function(t,e,i,a,n,s,r,o,c){function l(){}var p=/^input|textarea$/i,d=".datepickerwrapper",h=r.DATE_PATTERN,u=r.TIME_PATTERN,f=r.DATE_TIME_PATTERN,m=function(){var t=i(),e=t.get("date"),a={"今天":[i().startOf("day"),i().startOf("day")],"昨天":[i().startOf("day").subtract(1,"days"),i().startOf("day").subtract(1,"days")],"过去 7 天":[i().startOf("day").subtract(7,"days"),i().startOf("day").subtract(1,"days")],"本月":[i().startOf("day").subtract(e-1,"days"),i().startOf("day")],"上月":[i().startOf("day").subtract(1,"month").subtract(e-1,"days"),i().startOf("day").subtract(e,"days")],"最近 15 天":[i().startOf("day").subtract(15,"days"),i().startOf("day").subtract(1,"days")]};return a}(),g={PENDING:"pending",ACTIVE:"active",INACTIVE:"inactive"};return l.DATE_PATTERN=h,l.TIME_PATTERN=u,l.DATE_TIME_PATTERN=f,l.SHORTCUTS=m,e.extend(l.prototype,n.prototype,{options:{placement:"bottom",align:"left",offset:{},mode:"signal",shortcuts:m,type:"date",dates:[],ranges:[],unlimits:[]},init:function(){this.options.typeMap=r.typeMap(this.options.type),this.options.dates.length>1&&(this.options.mode="multiple"),this.options.dates.length||(this.options.dates=[i().startOf("day").format(h)]),this.options.shortcuts&&e.each(this.options.shortcuts,function(t){e.each(t,function(a,n){t[n]=i(a,e.isString(a)&&f)})}),this.options.range&&this.options.range.length&&(this.options.ranges=this.options.range),this.options.ranges=e.flatten(this.options.ranges||this.options.range),e.each(this.options.ranges,function(t,a,n){t&&(n[a]=i(t,e.isString(t)&&f))}),this.options._ranges=e.map(this.options.ranges,function(t){return t?t.format(h):void 0}),this.options._ranges="['"+this.options._ranges.join("','")+"']",c=this.options.template||c,this.options.css&&require("css!"+this.options.css)},render:function(){var i=this;this.$element=t(this.element),this.$relatedElement=t(e.template(c)(this.options)).insertAfter(this.$element),this["_"+this.options.mode]();var a="click.datepickerwrapper_toggle_"+this.clientId;this.$element.off(a).on(a,function(t){i.toggle(t)});var n=new s("bx-");n.delegate(this.$element,this),n.delegate(this.$relatedElement,this),this._autoHide()},val:function(t){var i=a.query("components/datepicker",this.$relatedElement);return t?(e.each(i,function(i,a){i.val(e.isArray(t)?t[a]:t)}),this):e.map(i,function(t){return t.val()})},range:function(t){var i=a.query("components/datepicker",this.$relatedElement);return t?(this.options.ranges=t=e.flatten(t),e.each(i,function(e){e.range(t)}),this):this.options.ranges},_signal:function(){var e=this;a.boot(this.$relatedElement,function(){var i=a.query("components/datepicker",e.$relatedElement)[0];i.on("change.datepicker unchange.datepicker",function(i,a,n){if(!(void 0!==n&&"date"!==n&&"time"!==n||e.options.typeMap.time&&"date"===n)){e.hide();var s=t.Event("change"+d);if(e.trigger(s,[[a],n]),!s.isDefaultPrevented()){var r=p.test(e.element.nodeName),o=e._unlimitFilter(a,e.options.unlimits[0]);if(e.$element[r?"val":"html"](o),e.$element.triggerHandler("change"),!r){var c=t("[data-hidden-index]",e.$element);c.eq(0).val(o).triggerHandler("change")}}}}),i.$element.on("click",".timepicker .timepicker-footer .cancel",function(){e.hide()})})},_multiple:function(){var n=this;a.boot(this.$relatedElement,function(){var s=t(".datepickerwrapper-inputs",n.$relatedElement),r=t("input",s),o=t(".datepickerwrapper-pickers",n.$relatedElement),c=t(".picker",o),l=a.query("components/datepicker",n.$relatedElement),p=t(".datepickerwrapper-shortcuts",n.$relatedElement),d=t(".shortcut",p);n.options.shortcuts&&e.each(e.values(n.options.shortcuts),function(t,a){var s=!0;e.each(t,function(t,a){var r=i(n.options.dates[a],e.isString(n.options.dates[a])&&f);t.isSame(r,"days")||(s=!1)}),s&&d.eq(a).addClass("active").siblings().removeClass("active")}),e.each(r,function(a,s){t(a).val(i(n.options.dates[s],e.isString(n.options.dates[s])&&f).format(h))}),e.each(l,function(t,a){t.val(n.options.dates[a]).on("change.datepicker unchange.datepicker ",function(t,e,i){if(void 0===i||"date"===i||"time"===i){var s=n._unlimitFilter(e,n.options.unlimits[a]);r.eq(a).val(s),c.eq(a).hide()}});var s=n._unlimitFilter(i(n.options.dates[a],e.isString(n.options.dates[a])&&f),n.options.unlimits[a]);r.eq(a).val(s)})})},_unlimitFilter:function(t,a){var n=this.options.typeMap,s=n.date&&n.time&&f||n.date&&h||n.time&&u,r=t.format(s);return a&&r===i(a,e.isString(a)&&f).format(s)&&(r="不限"),r},_inputToggleDatePicker:function(e,i,a){var n=t(".datepickerwrapper-inputs",this.$relatedElement),s=t(".datepickerwrapper-pickers",this.$relatedElement),r=t(".picker",s),o=n.offset();s.offset({left:o.left,top:o.top+n.outerHeight()+(parseInt(s.css("margin-top"),10)||0)});var c,l=r.eq(i),p=t(e.target),d=p.offset();switch(this.options.align){case"left":c=d.left;break;case"right":c=d.left-(l.outerWidth()-p.outerWidth())}l[a?a:"toggle"]().offset({left:c}).siblings().hide()},_hideDatePicker:function(){var e=t(".datepickerwrapper-pickers",this.$relatedElement),i=t(".picker",e);i.hide()},show:function(){this.$element.addClass("datepickerwrapper-open"),this.$relatedElement.show().offset(this._offset())},hide:function(){this.$element.removeClass("datepickerwrapper-open"),this._hideDatePicker(),this.$relatedElement.hide()},toggle:function(){this.$element.toggleClass("datepickerwrapper-open"),this.$relatedElement.toggle().offset(this._offset())},_offset:function(){var t=o(this.$element,this.$relatedElement,this.options.placement,this.options.align),e=parseInt(this.$relatedElement.css("margin-left"),10)||0,i=parseInt(this.$relatedElement.css("margin-top"),10)||0;return{left:t.left+e+(this.options.offset.left||0),top:t.top+i+(this.options.offset.top||0)}},submit:function(i,n){var s=this;switch(n){case"shortcut":break;default:var r=t(".datepickerwrapper-shortcuts",s.$relatedElement),o=t(".shortcut",r);o.removeClass("active")}var c=a.query("components/datepicker",this.$relatedElement),l=e.map(c,function(t){return t.val()});this.hide();var h=t.Event("change"+d);if(this.trigger(h,[l]),!h.isDefaultPrevented()){var u=t("[data-index]",this.$element);u.length?e.each(u,function(e,i){var a=t(e);i=+a.attr("data-index"),a[p.test(e.nodeName)?"val":"html"](s._unlimitFilter(l[i],s.options.unlimits[i]))}):this.$element.text(e.map(l,function(t,e){return s._unlimitFilter(t,s.options.unlimits[e])}).join(", ")),u=t("[data-hidden-index]",this.$element),e.each(u,function(e,i){var a=t(e);i=+a.attr("data-hidden-index");var n=s._unlimitFilter(l[i],void 0);a.val(n).trigger("change")})}},shortcutText:function(t){var i;return e.each(this.options.shortcuts,function(a,n){if(!i){var s=!0;e.each(a,function(e,i){e.isSame(t[i],"days")||(s=!1)}),s&&(i=n)}}),i},_change:function(n,s,r){var o=this,c=t(n.target),l=a.query("components/datepicker",this.$relatedElement);switch(s){case"shortcut":var p=c.attr("data-value").split(",");e.each(p,function(t,e){o.options.dates[e]=t,l[e].val(t)}),c.addClass("active").siblings().removeClass("active"),this.submit(n,s);break;case"date":var d=i(c.val());if(!d.isValid())break;l[r].val(d)}},_autoHide:function(){var e=this,i="click"+d+"_"+this.clientId;this._state=g.INACTIVE,t(document.body).off(i).on(i,function(i){if(t.contains(document.body,i.target)){if(i.target===e.element||t.contains(e.element,i.target)||i.target===e.$relatedElement[0]||t.contains(e.$relatedElement[0],i.target)){if(e._state===g.ACTIVE)return;return e.trigger(t.Event("active"+d,{target:i.target})),void(e._state=g.ACTIVE)}if(e._state!==g.INACTIVE){var a=t.Event("inactive"+d,{target:i.target});e.trigger(a),e._state=g.INACTIVE,a.isDefaultPrevented()||e.hide()}}}).on(i,function(i){var a=t(".datepickerwrapper-inputs-body",e.$relatedElement),n=t(".datepickerwrapper-pickers",e.$relatedElement);i.target!==e.$relatedElement[0]&&!t.contains(e.$relatedElement[0],i.target)||!a.length||!n.length||t.contains(a[0],i.target)||t.contains(n[0],i.target)||e._hideDatePicker()})},destroy:function(){var t="click.datepickerwrapper_toggle_"+this.clientId;this.$element.off(t)}}),l});
define(["jquery","underscore","brix/loader","components/base","brix/event","./state.js","./pagination.tpl.js"],function(t,i,s,e,n,a,o){function r(){}var h=[10,20,30,40,50];return i.extend(r.prototype,e.prototype,{options:{statistics:!0,simplify:!1,step:7,total:0,cursor:1,limit:10,limits:void 0},init:function(){this.options.limits=this.options.limits&&this.options.limits.length?i.unique(this.options.limits):[].concat(h),this._state=new a(this.options.total,this.options.cursor,this.options.limit)},render:function(){var e=this;this.$manager=new n("bx-"),this.$element=t(this.element),this.data=this._fixData();var a=i.template(o)(this.data);t(this.element).empty().append(a),this.$manager.delegate(this.element,this),s.boot(this.element,function(){e.dropdown=s.query("components/dropdown",e.element)[0],e.dropdown&&e.dropdown.on("change.dropdown",function(t,i){t.stopPropagation(),e._state.setCursor(1),e._state.setLimit(i.value),e.trigger("change.pagination",e._state),e._update()})})},_update:function(){this.data=this._fixData();var s=i.template(o)(this.data),e=t(s);this.$element.find("ul.pagination").replaceWith(e.find("ul.pagination")),this.$element.find("span.start-end-total").replaceWith(e.find("span.start-end-total"))},moveTo:function(t,i){1===arguments.length&&(i=t),this._state.moveTo(i),this.trigger("change.pagination",this._state),this._update()},total:function(t){return void 0===t||null===t?this._state.total:(this._state.total!==t&&(this._state.setTotal(t),this._update()),this)},cursor:function(t){return void 0===t||null===t?this._state.cursor:(this._state.cursor!==t&&(this._state.setCursor(t),this._update()),this)},limit:function(t){return void 0===t||null===t?this._state.limit:(this._state.limit!==t&&(this._state.setLimit(t),this._update()),this)},_fixData:function(){var t=Math.min(this._state.pages,Math.max(1,this._state.cursor-parseInt(this.options.step/2,10))),s=+this.options.limit,e=[].concat(this.options.limits).sort(function(t,i){return t-i});if(!i.contains(e,s))switch(!0){case s<e[0]:e.unshift(s);break;case s>e[e.length-1]:e.push(s);break;default:for(var n=0;n<e.length;n++)if(s<e[n]){e.splice(n,0,s);break}}return i.extend({barStart:t,barEnd:Math.min(this._state.pages,t+this.options.step-1),limits:e,simplify:this.options.simplify},this._state)},destroy:function(){this.$manager.undelegate(this.$element,this)}}),r});
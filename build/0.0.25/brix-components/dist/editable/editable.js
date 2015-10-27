define(["jquery","underscore","components/base","css!./editable.css"],function(t,e,n){function i(e){return t(e.element).find(".editable-content").length?new s(e):void 0}function s(){}var o=".editable",h={pre:"<textarea>",_default:'<input type="text">'};return e.extend(i.prototype,n.prototype,{options:{type:"text",content:""},init:function(){var e=this.options.type;this.$element=t(this.element),this.options.content||(this.options.content=this.$element[e]()),this.$element[e]()||this.$element[e](this.options.content)},render:function(){var e=this,n=this.$element.is("pre")?h.pre:h._default;this.$relatedElement=t(n).val(this.options.content).insertAfter(this.$element),this._beautify(),this.$relatedElement.hide(),this.$element.on("click",function(){e.show()}),this.$relatedElement.on("keydown",function(t){e._hooks[t.which]&&e._hooks[t.which].call(e,t)}).on("blur",function(){e.update()!==!1&&e.hide()})},update:function(){var e=this.$element[this.options.type]()||this.options.content,n=this.$relatedElement.val();if(e!==n){var i=t.Event("change"+o);return this.trigger(i,[n]),i.isDefaultPrevented()?!1:void this.$element[this.options.type](n)}},show:function(){this._beautify(),this.$element.hide(),this.$relatedElement.show().focus()},hide:function(){this.$relatedElement.hide(),this.$element.show()},_hooks:{13:function(t){t.preventDefault(),this.update()!==!1&&this.hide()},27:function(t){t.preventDefault(),this.hide(),this.$relatedElement.val(this.$element[this.options.type]())}},_beautify:function(){var t=this.$element,e=this.$relatedElement,n=t.css("display"),i=t.css("z-index"),s=t.outerWidth(!0),o=parseInt(t.css("padding-left"),10)||0,h=parseInt(t.css("padding-right"),10)||0,l=parseInt(t.css("border-left-width"),10)||0,c=parseInt(t.css("border-right-width"),10)||0,r=parseInt(e.css("padding-left"),10)||0,d=parseInt(e.css("padding-right"),10)||0,a=parseInt(e.css("border-left-width"),10)||0,p=parseInt(e.css("border-right-width"),10)||0;this.$relatedElement.addClass("form-control").css({display:n,"font-size":t.css("font-size"),"font-family":t.css("font-family"),"font-weight":t.css("font-weight"),"line-height":t.css("line-height"),color:t.css("color"),"z-index":"auto"===i?1001:i+1,margin:t.css("margin"),width:/inline/.test(n)?s+(r-o)+(d-h)+(a-l)+(p-c):s,height:"auto"})}}),e.extend(s.prototype,i.prototype,{init:function(){var e=this.options.type;this.$element=t(this.element),this._$content=this.$element.find(".editable-content"),this._$toggle=this.$element.find(".editable-toggle"),this._$input=this.$element.find(".editable-input"),this.options.content||(this.options.content=this._$content[e]()),this._$content[e]()||this._$content[e](this.options.content)},render:function(){var t=this;this._$toggle.on("click",function(){t.show()}),this._$input.on("keydown",function(e){t._hooks[e.which]&&t._hooks[e.which].call(t,e)}).on("blur",function(){t.update()!==!1&&t.hide()})},update:function(){var e=this._$content[this.options.type]()||this.options.content,n=this._$input.val();if(e!==n){var i=t.Event("change"+o);return this.trigger(i,[n]),i.isDefaultPrevented()?!1:void this._$content[this.options.type](n)}},show:function(){this._$content.hide(),this._$toggle.hide(),this._$input.show().focus()},hide:function(){this._$content.show(),this._$toggle.css("display",""),this._$input.hide()},_hooks:{13:function(t){t.preventDefault(),this.update()!==!1&&this.hide()},27:function(t){t.preventDefault(),this.hide(),this._$input.val(this._$content[this.options.type]())}}}),i});
define(["jquery","underscore","components/base","brix/event","./switch.tpl.js"],function(e,t,i,s,n){function h(){}var d=".switch",o=t.template(n),l="switch-checked",c="switch-disabled";return t.extend(h.prototype,i.prototype,{options:{checked:!1,disabled:!1,size:""},init:function(){this.$element=e(this.element).hide(),this.$manager=new s("bx-"),this.options.checked=this.$element.prop("checked"),this.options.disabled=this.$element.prop("disabled")},render:function(){var t=this;this.$relatedElement=e(o(this.options)).insertBefore(this.$element),this.$element.on("change",function(){t.checked(t.$element.prop("checked"))}),this.$manager.delegate(this.$element,this),this.$manager.delegate(this.$relatedElement,this)},toggle:function(e){return e&&this.options.disabled||this.checked(!this.options.checked),e&&e.preventDefault(),this},checked:function(e){if(void 0!==e){if(this.options.checked===e)return;return this.options.checked=e,this.$relatedElement[e?"addClass":"removeClass"](l),this.$element.prop("checked",e),this.trigger("change"+d,{name:this.$element.attr("name"),value:this.$element.val(),checked:this.options.checked,disabled:this.options.disabled}),this.$element.triggerHandler("change"),this}return this.options.checked},disabled:function(e){return void 0!==e?(this.options.disabled=e,this.$relatedElement[e?"addClass":"removeClass"](c),this.$element.prop("disabled",e),this):this.options.disabled},val:function(e){return void 0!==e?(this.$element.val(e),this):this.$element.val()}}),h});
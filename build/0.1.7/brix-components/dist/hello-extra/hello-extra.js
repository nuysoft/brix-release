define(["jquery","underscore","components/hello","./hello-extra.tpl.js"],function(e,n,t,o){return t.extend({render:function(){var t=n.template(o)(this.options);e(this.element).append(t)}})});
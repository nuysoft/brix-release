define(["jquery","brix/base","css!./imager.css"],function(t,i){return i.extend({options:{src:"",left:0,top:0,width:"",height:""},init:function(){},render:function(){var i,o,n=this,e=t(this.element).css({overflow:"hidden"}).addClass("imager"),s=t("<img>").attr("src",this.options.src).on("load",function(s){var h=e.width(),r=e.height(),d=s.target;i||(i=d.width,o=d.height,n.options.width=n.options.width||i,n.options.height=n.options.height||o);var p,a,g,c,w;h>=i||(e.height(h/(i/o)),h<n.options.width?(w=h/n.options.width,p=i*w,a=o*w,g=-n.options.left*w,c=-n.options.top*w):i>h&&(w=i/o,g=-n.options.left+(h-n.options.width)/2,r=h/w,c=-n.options.top+(r-n.options.height)/2),t(d).css({"margin-left":Math.min(0,g),"margin-top":Math.min(0,c),width:p,height:a}))}).appendTo(e);t(window).on("resize",function(){s.trigger("load")})}})});
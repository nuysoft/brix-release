define(["jquery","brix/base"],function(t,i){return i.extend({options:{src:"",left:0,top:0,width:"",height:""},init:function(){},render:function(){var i,o,n=this,e=t(this.element).css({overflow:"hidden"}).addClass("imager"),h=t("<img>").attr("src",this.options.src).on("load",function(h){var s=e.width(),r=e.height(),d=h.target;i||(i=d.width,o=d.height,n.options.width=n.options.width||i,n.options.height=n.options.height||o);var p,a,g,w,f;s>=i||(e.height(s/(i/o)),s<n.options.width?(f=s/n.options.width,p=i*f,a=o*f,g=-n.options.left*f,w=-n.options.top*f):i>s&&(f=i/o,g=-n.options.left+(s-n.options.width)/2,r=s/f,w=-n.options.top+(r-n.options.height)/2),t(d).css({"margin-left":Math.min(0,g),"margin-top":Math.min(0,w),width:p,height:a}))}).appendTo(e);t(window).on("resize",function(){h.trigger("load")})}})});
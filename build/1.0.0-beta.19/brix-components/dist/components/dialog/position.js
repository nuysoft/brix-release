!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports["components/dialog/position"]=e(require("jquery")):t["components/dialog/position"]=e(t.jquery)}(this,function(t){return function(t){function e(r){if(o[r])return o[r].exports;var i=o[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){var r,i;r=[o(2)],i=function(t){function e(e,r,i,a){var p=t(e);if(!p.length)return o(r);var c=p.offset(),f=c.left,u=c.top,l=p.outerWidth(),d=p.outerHeight(),h=t(r),b="none"!==h.css("display");h.show();var v=h.outerWidth(),y=h.outerHeight();b||h.hide();var g,x,m=l/2-v/2,k=d/2-y/2;switch(i){case"top":g=f+m,x=u-y;break;case"bottom":g=f+m,x=u+d;break;case"left":g=f-v,x=u+k;break;case"right":g=f+l,x=u+k}if(n.test(i)!==n.test(a)&&s.test(i)!==s.test(a))switch(a){case"top":x=u;break;case"bottom":x=u+d-y;break;case"left":g=f;break;case"right":g=f+l-v}return{left:g,top:x}}function o(e,o){var r,i;if(o)r=parseFloat(e,12),i=parseFloat(o,12);else{var n=t(e),s="none"!==n.css("display");n.show(),r=n.outerWidth(),i=n.outerHeight(),s||n.hide()}var a=t(window),p=a.width(),c=a.height(),f=a.scrollLeft(),u=a.scrollTop();return{left:p/2-r/2+f,top:c/2-i/2+u}}function r(e,o,r){var i=t(e),n="none"!==i.css("display");i.show();var s=i.outerWidth(),a=i.outerHeight();n||i.hide();var p={opacity:0,left:o.left,top:o.top};switch(r){case"top":p.top=p.top-.5*a;break;case"bottom":p.top=p.top+.5*a;break;case"left":p.left=p.left-.5*s;break;case"right":default:p.left=p.left+.5*s}return p}function i(t,e){return{opacity:1,left:e.left,top:e.top}}var n=/top|bottom/,s=/left|right/;return e.center=o,e.start=r,e.end=i,e}.apply(e,r),!(void 0!==i&&(t.exports=i))},function(e,o){e.exports=t}])});
//# sourceMappingURL=position.js.map
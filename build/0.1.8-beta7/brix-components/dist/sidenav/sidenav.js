define(["jquery","underscore","handlebars","components/base","brix/event"],function(a,i,n,t,e){function s(){arguments.length&&(this.element=a(arguments[0]),this.options=i.extend(this.options,arguments[1]),this.render())}var r="swing",o={EVENTS:{".sub-nav":{mouseenter:function(i,n){a(n.element).find(".side-hold span").hasClass("on")||n._expandCollapseSubNav()},mouseleave:function(i,n){a(n.element).find(".side-hold span").hasClass("on")||n._expandCollapseSubNav()}},".side-hold span":{click:function(i,n){var t=a(i.currentTarget);t.toggleClass("on"),t.hasClass("on")?n.main.animate({marginLeft:200},n.duration,r,function(){n.trigger("slideEnd",1),n.isFullSubNav="1",n.localStorage.isFullSubNav="1"}):n.main.animate({marginLeft:40},n.duration,r,function(){n.trigger("slideEnd",0),n.isFullSubNav="0",n.localStorage.isFullSubNav="0"})}},".sub-nav .sub-link":{click:function(a,i){return}},".sub-nav .sub-title":{click:function(a,i){return}},".sub-nav .sub":{mouseenter:function(a,i){return}}},DOCEVENTS:{".sub-nav-view a":{click:function(a,i){}},".sub-nav-view":{mouseleave:function(a,i){}}},WINEVENTS:{scroll:function(i,n){n._timer(function(){n._fixedStatic()},10);var t=n.sidebar.find(".sidebar");t.css(t.hasClass("sidebar-fixed")?{left:-a(window).scrollLeft()}:{left:0})},resize:function(i,n){n.subNav.height(a(window).height())},hashchange:function(a,i){i._pathname2sidebar()}}};return i.extend(s.prototype,t.prototype,{options:{inmain:".inmain",index:"/index",duration:250,pathMap:{}},render:function(){var i=this,n=a(this.element);this.sidebar=n,this.main=a(this.options.inmain),this.allLinks=n.find(".sidebar").find("a"),this.nav=n.find(".top-nav"),this.subNav=n.find(".sub-nav"),this.subNavWrap=n.find(".sub-nav-wrap"),this.subNavHandle=n.find(".subnav-handle"),this.pathMap=this.options.pathMap,this.sidebar.find(".sidebar").find("[data-sub]").hide(),this.localStorage=window.localStorage||{},this.isFullSubNav=this.localStorage.isFullSubNav||this.options.expand||"1",this.isExpandNav="1"===this.isFullSubNav?!0:!1,this.index=this.options.index,this.duration=this.options.duration,this.isHandleClick=!1,i.navTop=n.find(".sidebar").offset().top,this._pathname2sidebar(),this.subNav.height(a(window).height()),this._bindUI()},_bindUI:function(){var i=a(this.element),n=this;a.each(o,function(t,e){switch(t){case"EVENTS":a.each(e,function(t,e){a.each(e,function(a,e){i.delegate(t,a,function(a){e(a,n)})})});break;case"DOCEVENTS":a.each(e,function(i,t){a.each(t,function(t,e){a(document).delegate(i,t,function(a){e(a,n)})})});break;case"WINEVENTS":a.each(e,function(i,t){a(window).bind(i,function(a){t(a,n)})})}})},_getPathname:function(a){var i;if(a.indexOf("#!")>-1)var n=/^.*(#!\/[^\?]+)\??.*$/.exec(a);else var n=/^(\/[^\?]+)\??.*$/.exec(a);return i=n&&n[1]||"",i=i.replace("#!","")},_pathname2sidebar:function(){var i=this,n=this._getPathname(location.hash)||this._getPathname(this.index);a.each(this.pathMap,function(a,i){return n===a?(n=i,!1):void 0});var t=!1,e=Array.prototype.slice,s=i.subNav.find("a");s=s.filter(function(i,n){var t=a(n).closest("[data-notmenu]");return t&&0!==t.length?void 0:n});var r=i.nav.find("a"),o=e.call(r).concat(e.call(s));return a.each(o,function(e,s){s=a(s);var r=s.attr("href");return r=r.replace(/^.*?#/g,"#"),r=i._getPathname(r),""===n?!1:r===n?(i.navclick(s,n),t=!0,!1):void 0}),t&&""!==n?void(this.isNavClick=!1):void i._setNoSelectedNav()},_setNoSelectedNav:function(){this.sidebar.find(".sidebar").find("a").removeClass("on"),this.nav.find("a").removeClass("on"),this._collapseNav(null,function(){})},navclick:function(i,n,t,e){var s=this;n=n||this._getPathname(location.hash);var r,o=!1;if(e)this.nav.find("a").each(function(t,e){e=a(e),r=e.attr("href"),r=r.slice(r.indexOf("#")),r=s._getPathname(r),r===n&&(o=!0,i=e)});else{var d=!1,h=this.subNav.find("a");h=h.filter(function(i,n){var t=a(n).closest("[data-notmenu]");return t&&0!==t.length?void 0:n}),h.each(function(t,e){return e=a(e),r=e.attr("href"),r=r.slice(r.indexOf("#")),r=s._getPathname(r),r===n?(d=!0,i=e,!1):void 0}),d||this.nav.find("a").each(function(t,e){e=a(e),r=e.attr("href"),r=r.slice(r.indexOf("#")),r=s._getPathname(r),r===n&&(o=!0,i=e)})}if(o)s._expandCollapseNav(i);else{var u=i.parents("[data-sub]");if(!u)return;var l=this.nav.find("[data-sub="+u.attr("data-sub")+"]");s._expandCollapseNav(l);var v=s.subNav.find("a").filter(function(i,n){var t=a(n).closest("[data-notmenu]");return t&&0!==t.length?void 0:n});v.removeClass("on"),v.each(function(i,t){return t=a(t),s._getPathname(t.attr("href").replace(/^.*?#/g,"#"))===n?(t.addClass("on"),!1):void 0})}s.isHandleClick=!1,s.nowNav=i,s.isNavClick=!0},_fixedStatic:function(i){var n=this,t=a(document).scrollTop(),e=t>n.navTop;e?n.sidebar.find(".sidebar").addClass("sidebar-fixed"):n.sidebar.find(".sidebar").removeClass("sidebar-fixed")},_timer:function(a,i){clearTimeout(this.itv),this.itv=setTimeout(a,i)},_setSubNavOn:function(a){if(this.subNav.find("a, .icon-font").removeClass("on"),a){var i=a.closest(".sub-nav-third");a.addClass("on"),"0"===this.isFullSubNav&&i&&i.prev().addClass("on")}},_expandCollapseNav:function(i){var n,t=this,e=i.attr("data-sub"),s=i.attr("href");if(s=s.slice(s.indexOf("#")),e){var r=t.currentNav;t.currentNav&&t.currentNav.hide(),t.currentNav=t.subNav.find('[data-sub="'+e+'"]'),t.currentNav.find("a").each(function(i,t){t=a(t);var e=t.attr("href");return e.slice(e.indexOf("#"))===s?(n=t,!1):void 0}),t.currentSubNav=n,t._setSubNavOn(n),(t.sidebar.find(".sidebar .side-hold span").hasClass("on")||r.html()===t.currentNav.html())&&t.currentNav.show(),t._expandNav()}else t._collapseNav();t.nav.find("a").removeClass("on"),i.addClass("on")},_switchTrigger:function(){"1"===this.isFullSubNav?this.subNavHandle.removeClass("icon-collapse").addClass(".icon-expand"):"0"===this.isFullSubNav&&this.subNavHandle.removeClass("icon-expand").addClass(".icon-collapse")},_expandCollapseSubNav:function(){var i=this,n=i.currentSubNav,t=n&&("LI"===n.prop("nodeName")?n.find("ul"):n.closest("ul")),e=t&&t.hasClass("sub-nav-third");i.isExpandNav?(i.isExpandNav=!1,i._collapseSubNav(function(){i._switchTrigger(),a(i.element).find(".side-hold").hide()}),e&&t.prev()&&t.prev().addClass("on"),a(".menu-icon").show(),a(".menu-btn").hide()):(i.isExpandNav=!0,i._expandSubNav(),i._switchTrigger(),e&&t.prev()&&t.prev().removeClass("on"),a(".menu-icon").hide(),a(".menu-btn").show(),a(i.element).find(".side-hold").show())},_collapseSubNav:function(a){var i=this;this.subNav.animate({width:"40px"},this.duration,r,a),this.main.animate({marginLeft:"40px"},this.duration,r,function(){i.currentNav.hide()}),this._collapseThirdNav()},_expandSubNav:function(a){var i=this;this.subNav.animate({width:"200px"},this.duration,r,a),i.currentNav.show(),this._expandThirdNav()},_expandThirdNav:function(i){var n=this;if(n.nowNav){var t=n.nowNav.attr("data-sub");!t||t===n.currentNav.attr("data-sub")&&!n.isHandleClick?n.sidebar.find(".sidebar").find(".sub-nav-third").css("height","auto"):n.sidebar.find(".sidebar").find(".sub-nav-third").each(function(t,e){e=a(e);var s=e.css("height","auto").height();e.css("height",0),e.animate({height:s},n.duration,r,i)})}},_collapseThirdNav:function(a){var i=this;i.sidebar.find(".sidebar").find(".sub-nav-third").animate({height:0},this.duration,r,a)},_expandNav:function(i,n){"1"!==this.isFullSubNav&&(this.currentNav.hide(),a(this.element).find(".side-hold span").removeClass("on"),a(".menu-icon").show()),this.subNav.show(),this.subNav.animate({width:"1"===this.isFullSubNav?"200px":"40px"},this.duration,r,n),this.subNavWrap.animate({marginLeft:"0"},this.duration,r,n);var t=a(this.element).find(".side-hold span").hasClass("on"),e=t?200:40;200===this.subNav.width()&&(e=200),this.main.animate({marginLeft:e},this.duration,r),"1"===this.isFullSubNav?this._expandThirdNav():this._collapseThirdNav()},_collapseNav:function(a,i){var n=this;this.subNav.animate({width:"1px"},this.duration,r,function(){n.subNav.hide()}),this.subNavWrap.animate({marginLeft:"1"===this.isFullSubNav?"-200px":"-40px"},this.duration,r,i),this.main.animate({marginLeft:"0"},this.duration,r)}}),s});
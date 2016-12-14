!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery"),require("underscore"),require("brix/loader"),require("components/base"),require("brix/event")):"function"==typeof define&&define.amd?define(["jquery","underscore","brix/loader","components/base","brix/event"],t):"object"==typeof exports?exports["components/dropdown"]=t(require("jquery"),require("underscore"),require("brix/loader"),require("components/base"),require("brix/event")):e["components/dropdown"]=t(e.jquery,e.underscore,e["brix/loader"],e["components/base"],e["brix/event"])}(this,function(e,t,n,i,a){return function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){var i,a;i=[n(2),n(3),n(4),n(5),n(6),n(7)],a=function(e,t,n,i,a,o){function l(e){if(e&&e.element&&"select"!==e.element.nodeName.toLowerCase())return new r(e)}function r(){}var s=".dropdown",d=t.template(o);return t.extend(l.prototype,i.prototype,{options:{name:void 0,label:void 0,value:void 0,data:[],disabled:void 0,width:void 0,className:void 0,justify:!1,searchbox:!1,placeholder:"搜索关键词",_searchboxEvent:"keyup",popover:!1,_popoverWidth:""},init:function(){this.$element=e(this.element).hide(),this.$manager=new a("bx-");var n=this.options;n.data.length?(this._fixFlattenData(this.options.data),this._fillSelect()):n.data=this._parseDataFromSelect(this.$element),n.multiple=this.$element.prop("multiple"),n.disabled=this.$element.prop("disabled"),void 0===n.value&&(n.value=[]),t.isArray(n.value)||(n.value=[n.value]),n.value.length&&this.$element.val(n.value);var i=this.$element.find("option:selected");n.label=t.map(i,function(t){return e.trim(e(t).text())}).join(", "),n.value=t.map(i,function(t){return e(t).attr("value")}),n.name=this.$element.attr("name"),n.searchbox&&(n.searchbox===!0?n._searchboxEvent="keyup":(n._searchboxEvent=n.searchbox,n.searchbox=!0)),n.popover&&n.popover!==!0&&(n._popoverWidth=n.popover,n.popover=!0),this.options["class"]&&(this.options.className=this.options["class"])},render:function(){this.$relatedElement=e(d(t.extend({},this.options,{isActive:function(e,n){return t.contains(e,n)||t.contains(e,n+"")}}))).insertBefore(this.$element);var i=this.options.width;i&&(parseInt(i)==i&&(i+="px"),this.$relatedElement.css({width:i,"min-width":i})),this.options.className&&this.$relatedElement.addClass(this.options.className),this.$manager.delegate(this.$element,this),this.$manager.delegate(this.$relatedElement,this),this.options.popover&&n.boot(this.$relatedElement),this._autoHide()},toggle:function(){return this.$relatedElement.toggleClass("open"),this},show:function(){return this.$relatedElement.addClass("open"),this},hide:function(){return this.$relatedElement.removeClass("open"),this},val:function(n,i){var a=this,o=this.options,l=o.multiple?this.options.value:function(){var n=a.$relatedElement.find("ul.dropdown-menu > li.active > a");return t.map(n,function(t){var n=e(t),i=n.attr("value");return void 0!==i?i:e.trim(n.text())})}();if(void 0===n)return o.multiple?l:l[0];t.isArray(n)||(n=[n]),n=t.map(n,function(e){return e+""});var r=[];if(t.each(this.options.data,function(e){e.children?t.each(e.children,function(e){e.selected=t.contains(n,e.value)||t.contains(n,e.value+""),e.selected&&r.push(e)}):(e.selected=t.contains(n,e.value)||t.contains(n,e.value+""),e.selected&&r.push(e))}),l.sort().join("")===t.map(r,function(e){return e.value}).sort().join(""))return this;this.$relatedElement.find("button.dropdown-toggle > span.dropdown-toggle-label").text(t.map(r,function(e){return e.label}).join(", ")),this.$element.val(t.map(r,function(e){return e.value}));var d=this.$relatedElement.find("ul.dropdown-menu");if(t.each(l,function(e){d.find('li:has([value="'+e+'"])').removeClass("active").find("input:checkbox").prop("checked",!1)}),t.each(r,function(e){d.find('li:has([value="'+e.value+'"])').addClass("active").find("input:checkbox").prop("checked",!0)}),this.options.__value=this.options.value,this.options.value=t.map(r,function(e){return e.value}),i===!1)return this;var c=e.Event("change"+s),u=t.map(r,function(e){return{name:o.name,label:e.label,value:e.value}});return this.trigger(c,[o.multiple?u:u[0]]),c.isDefaultPrevented()?this:(this.$element.triggerHandler("change"),this)},data:function(i){if(void 0===i)return this.options.data;this.options.data=this._fixFlattenData(i),this._fillSelect();var a=this.$relatedElement.find("ul.dropdown-menu"),o=e(d(t.extend({},this.options,{isActive:function(e,n){return t.contains(e,n)||t.contains(e,n+"")}}))).find("ul.dropdown-menu");return a.replaceWith(o),this.$manager.delegate(this.$relatedElement,this),this.options.popover&&n.boot(this.$relatedElement),this},select:function(t){var n=e(t.currentTarget),i=n.attr("value"),a=e.trim(n.text());switch(this.options.multiple){case!0:var o=n.closest("li").toggleClass("active");n.find("input:checkbox").prop("checked",o.hasClass("active"));break;case!1:this.val(void 0!==i?i:a),this.toggle()}},search:function(t){if("keyup"===t.type){var n=t.keyCode;if(91===n||15<n&&n<19||37<=n&&n<=40)return;if("enter"===this.options._searchboxEvent&&13!==n)return}var i=e(t.target).val();this.trigger("search"+s,i)},filter:function(e,t){e.type&&(e=t,t=!1);var n=this.$relatedElement.find("ul.dropdown-menu li");e?(n.css("display","none"),n.filter(':contains("'+e+'")').show().css("display","list-item")):n.css("display","list-item"),t&&n.has('> a[value*="'+e+'"]').show()},disabled:function(e){return void 0===e?this.options.disabled:(this.options.disabled=e,this.$element.prop("disabled",e),this.$relatedElement[e?"addClass":"removeClass"]("disabled"),this)},submit:function(){var n=this.$relatedElement.find("ul.dropdown-menu > li.active > a"),i=t.map(n,function(t){var n=e(t);return void 0!==n.attr("value")?n.attr("value"):e.trim(n.text())});this.val(i),this.toggle()},_parseDataFromSelect:function(n){function i(e){return t.map(e,function(e){return a(e)})}function a(t){var n=e(t);return n.hasClass("divider")?"divider":{label:e.trim(n.text()),value:n.attr("value"),selected:n.prop("selected")}}var o=t.filter(n.children(),function(e){return/optgroup|option/i.test(e.nodeName)});return t.map(o,function(t){var n=e(t);return/optgroup/i.test(t.nodeName)?{label:n.attr("label"),children:i(n.children())}:a(t)})},_fixFlattenData:function(e){return t.map(e,function(e,n,i){return i[n]=t.isObject(e)?e:{label:e,value:e}})},_fillSelect:function(){function n(t){return e("<option>").attr("value",t.value).prop("selected",t.selected).text(t.label)}var i=this.$element.empty();t.each(this.options.data,function(a){if(a.children&&a.children.length){var o=e("<optgroup>").attr("label",a.label);t.each(a.children,function(e){n(e).appendTo(o)}),o.appendTo(i)}else n(a).appendTo(i)})},_responsive:function(){var t=e(window),n=this.$relatedElement,i=n.find("ul.dropdown-menu");e(window).on("scroll",function(){var e=n.offset(),a=e.top-t.scrollTop(),o=t.scrollTop()+t.height()-e.top-n.outerHeight(),l=o>=a?"button":"top";switch(l){case"button":i.css("max-height",a-10);break;case"top":i.css("max-height",o-10)}})},_autoHide:function(){var t=this,n="click.dropdown_autohide_"+this.clientId;e(document.body).off(n).on(n,function(e){t.$relatedElement.has(e.target).length||t.hide()})},destroy:function(){this.$manager.undelegate(this.$element),this.$manager.undelegate(this.$relatedElement),this.$relatedElement.remove();var t="click.dropdown_autohide_"+this.clientId;e(document.body).off(t)}}),t.extend(r.prototype,l.prototype,{init:function(){this.$element=e(this.element),this.$relatedElement=this.$element,this.$manager=new a("bx-"),this._fixFlattenData(this.options.data),this.options.name=this.$element.attr("name")},render:function(){void 0!==this.options.value&&this.val(this.options.value),this.$manager.delegate(this.$relatedElement,this),this._autoHide()},val:function(n){var i=this,a=function(){var t=i.$element.find("ul.dropdown-menu > li.active > a"),n=t.attr("value");return void 0===n&&(n=e.trim(t.text())),n}();if(void 0===n)return a;var o;return t.isObject(n)?o=n:t.each(i.$element.find("ul.dropdown-menu > li"),function(t){var a=e(t),l=a.find("> a"),r=l.attr("value"),s=e.trim(l.text());(void 0!==r&&r==n||void 0===r&&s==n)&&(o={name:i.options.name,label:s,value:void 0!==r?r:s})}),o?(this.$relatedElement.find("button.dropdown-toggle > span.dropdown-toggle-label").text(o.label),""+o.value===a?this:(this.$relatedElement.find("ul.dropdown-menu").find('li:has([value="'+a+'"])').removeClass("active").end().find('li:has([value="'+o.value+'"])').addClass("active"),this.trigger("change"+s,o),this)):void 0},data:function(n){if(void 0===n)return this.options.data;this.options.data=this._fixFlattenData(n);var i=this.$relatedElement.find("ul.dropdown-menu"),a=e(d(t.extend({},this.options,{isActive:function(e,n){return t.contains(e,n)||t.contains(e,n+"")}}))).find("ul.dropdown-menu");return i.replaceWith(a),this.$manager.delegate(this.$relatedElement,this),this}}),l}.apply(t,i),!(void 0!==a&&(e.exports=a))},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=i},function(e,t){e.exports=a},function(e,t,n){var i;i=function(){return"<div class=\"dropdown \n    <%= disabled ? 'disabled' : '' %> \n    <%= multiple ? 'dropdown-multiple' : '' %> \n    <%= searchbox ? 'dropdown-searchbox' : '' %> \n    <%= popover ? 'dropdown-popover dropdown-ellipsis' : '' %>\n    <%= justify ? 'dropdown-justify' : '' %>\">\n"+'    <button class="btn btn-default dropdown-toggle" type="button" value="<%= value %>" bx-click="toggle()">\n        <span class="dropdown-toggle-label"><%= label %></span>\n        <!-- <span class="caret"> -->\n        <span class="caret_custom caret_brixfont"><!-- 保留 caret_brixfont 是为了向后兼容，在下个版本中移除  -->\n            <span class="brixfont down">&#xe623;</span><!-- 向下 &#xe623; -->\n            <span class="brixfont up">&#xe62e;</span><!-- 向上 &#xe62e;-->\n        </span>\n    </button>\n    <div class="dropdown-menu-wrapper">\n        <% if (searchbox) { %>\n        <div class="searchbox">\n            <label>\n                <span class="brixfont">&#xe61c;</span>\n                <input bx-keyup="search()" type="text" placeholder="<%= placeholder %>">\n            </label>\n        </div>\n        <% } %>\n        <ul class="dropdown-menu">\n            <% for(var i = 0, item; item = data[i]; i++ ) { %>\n                <% if(item.children) { %>\n                    <li class="dropdown-header"><%=item.label%></li>\n                    <% for(var ii = 0; ii < item.children.length; ii++ ) { %>\n                        <li class="dropdown-menu-item-child <%= item.children[ii].value == value ? \'active\' : \'\'%>">\n                            <% if (popover) { %>\n                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()"\n                                bx-name="components/popover"\n                                data-content="<%= item.children[ii].label %>" \n                                data-width="<%= _popoverWidth %>">\n                                <% if (multiple) { %>\n                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.children[ii].value) ? \'checked\' : \'\' %>>\n                                <% } %>\n                                <span><%= item.children[ii].label %></span>\n                            </a>\n                            <% } else { %>\n                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()"\n                                title="<%= item.children[ii].label %>">\n                                <% if (multiple) { %>\n                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.children[ii].value) ? \'checked\' : \'\' %>>\n                                <% } %>\n                                <span><%= item.children[ii].label %></span>\n                            </a>\n                            <% } %>    \n                        </li>\n                    <% } %>\n                <% } else { %>\n                    <% if (item === \'divider\') { %>\n                        <li class="divider"></li>\n                    <% } else { %>\n                        <li class="<%= isActive(value, item.value) ? \'active\' : \'\' %>">\n                            <% if (popover) { %>\n                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()"\n                                bx-name="components/popover"\n                                data-content="<%= item.label %>" \n                                data-width="<%= _popoverWidth %>">\n                                <% if (multiple) { %>\n                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.value) ? \'checked\' : \'\' %>>\n                                <% } %>\n                                <span><%= item.label %></span>\n                            </a>\n                            <% } else { %>\n                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()"\n                                title="<%= item.label %>">\n                                <% if (multiple) { %>\n                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.value) ? \'checked\' : \'\' %>>\n                                <% } %>\n                                <span><%= item.label %></span>\n                            </a>\n                            <% } %>\n                        </li>\n                    <% }  %>\n                <% } %>\n            <% } %>\n        </ul>\n        <% if (multiple) { %>\n        <div class="dropdown-footer">\n            <button type="button" class="btn btn-default submit" bx-click="submit">确认</button>\n            <a href="javascript: void(0);" bx-click="hide" class="btn btn-default cancel ml5">取消</a>\n        </div>\n        <% } %>\n    </div>\n</div>'}.call(t,n,t,e),!(void 0!==i&&(e.exports=i))}])});
//# sourceMappingURL=dropdown.js.map
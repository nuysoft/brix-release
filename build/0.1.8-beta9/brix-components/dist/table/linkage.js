define(["jquery","underscore"],function(e,n){function a(n,o){var h=e(n),d="["+f+"],["+u+"]";return t(h,d),e(n).on("change.linkage",d,function(t){if(t.target===t.currentTarget){var f=e(t.currentTarget);r(f,h),i(f,h),c(f,h),o&&o(t,a.val(n),t.currentTarget)}}),a}function t(a,t){var r=a.find(t);n.each(r,function(a){var t=e(a),r=t.attr(f),i=t.attr(u);r===i&&(console.warn(new Error(n.template('<%= a %> and <%= b %> have save value "<%= value %>", may cause the Linkage to recursive search. You should avoid this kind of code.')({a:f,b:u,value:r})).stack),console.warn(a))})}function r(a,t){var i=a.attr(f),c=a.attr(u);if(c&&i!==c){var o=t.find(n.template(h)({name:c}));if(o.length){var v=t.find(n.template(d)({name:c}));if(v.length){var l=v.filter(":checkbox"),p=[];n.each(l,function(e){p.push(!e.indeterminate&&e.checked)});var m=e(n.filter(l,function(e){return e.indeterminate})),k=v.filter(":radio"),g=n.uniq(n.map(k,function(n){return e(n).attr("name")})),s=[];n.each(g,function(e){e&&s.push(!!k.filter('[name="'+e+'"]:checked').length)});var b=n.uniq(p.concat(s));o.prop("indeterminate",!!m.length||2===b.length).prop("checked",!m.length&&(1===b.length&&b[0])),r(o,t)}}}}function i(a,t){var r=a.attr(f),c=a.attr(u),o=a.prop("checked");if(r&&r!==c){var h=t.find(n.template(d)({name:r}));if(h.length){var v=h.not(":disabled");if(v.length){var l=v.filter(":checkbox");l.prop("checked",o);var p=v.filter(":radio");if(o||p.prop("checked",o),o){var m=n.uniq(n.map(p,function(n){return e(n).attr("name")}));n.each(m,function(a){if(a){var t=p.filter('[name="'+a+'"]');if(t.length){var r=n.map(t,function(n){return e(n).prop("checked")});n.indexOf(r,o)===-1&&t.eq(0).prop("checked",o)}}})}n.each(h,function(n){i(e(n),t)})}}}}function c(a,t){if(a.is(":radio")){var c=a.attr("name"),o=t.find('[name="'+c+'"]').not(a);n.each(o,function(n){var a=e(n);r(a,t),i(a,t)})}}var o="data-linkage-",f=o+"name",u=o+"parent-name",h="["+f+'="<%= name %>"]',d="["+u+'="<%= name %>"]';return a.off=function(n){var t=e(n),r="["+f+"],["+u+"]";return t.off("click.linkage",r),a},a.val=function(t,c){var o=e(t);if(c){var f=o.find("input:checkbox, input:radio").not(":disabled").prop("checked",!1);return n.each(c,function(a){var t=f.filter('[value="'+a+'"]').prop("checked",!0);n.each(t,function(n){r(e(n),o),i(e(n),o)})}),a}c=[];var u=o.find("input:checkbox:checked, input:radio:checked");return n.each(u,function(n){var a=e(n).attr("value");void 0!==a&&""!==a&&c.push(a)}),c},a});
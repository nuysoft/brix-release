define(function(){function r(r,n){if("string"!=typeof r||!r.match(f))return void console.log.apply(console,arguments);n=[].slice.call(arguments,1);var o=0,u=r.replace(f,function(r,u,e,a,f){var i=n[o++]+"",t="",c="";switch(f){case"s":break;case"d":var F=i.indexOf(".");a&&~F&&(i=i.slice(0,F+1+parseInt(a)));break;case"j":i=JSON.stringify(i)}for(var l=parseInt(e)-i.length,v=0;v<l;v++)"-"===u?c+=" ":t+=" ";return t+i+c});console.log(u)}function n(r){var n=/[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;r=""+r;for(var o=0,u=0;u<r.length;u++)o+=r[u].match(n)?2:1;return o}function o(r){var o,u,e={};for(u in r)for(o in r[u])e[o]=n(o);var a=0;for(o in e)for(u in r)a=n(r[u][o]),e[o]=a>e[o]?a:e[o];return e}function u(r){var n="+";for(var o in r){for(var u=0;u<r[o]+2;u++)n+="-";n+="+"}return n}function e(r){var o="|";for(var u in r){o+=" ",o+=u;for(var e=0;e<r[u]+2-1-n(u);e++)o+=" ";o+="|"}return o}function a(r,o){var u,e=[];for(var a in r){u="|";for(var f in o){u+=" ",u+=r[a][f];for(var i=0;i<o[f]+2-1-n(r[a][f]);i++)u+=" ";u+="|"}e.push(u)}return e}var f=/%([-+]?)(\d+)?(?:\.?(\d+)?)(s|d)/gi;return r.re=function(r,n){for(var o="",u=0;u<n;u++)o+=r;console.log(o)},r.table=function(r){if(r&&r.length){var n=o(r),f=u(n),i=e(n),t=a(r,n);console.log(f),console.log(i),console.log(f);for(var c in t)console.log(t[c]);console.log(f)}},r});
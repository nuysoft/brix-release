var requirejs,require,define;!function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var r;for(r=0;r<e.length&&(!e[r]||!t(e[r],r,e));r+=1);}}function eachReverse(e,t){if(e){var r;for(r=e.length-1;r>-1&&(!e[r]||!t(e[r],r,e));r-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var r;for(r in e)if(hasProp(e,r)&&t(e[r],r))break}function mixin(e,t,r,n){return t&&eachProp(t,function(t,i){(r||!hasProp(e,i))&&(!n||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[i]=t:(e[i]||(e[i]={}),mixin(e[i],t,r,n)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,r,n){var i=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return i.requireType=e,i.requireModules=n,r&&(i.originalError=r),i}function newContext(e){function t(e){var t,r;for(t=0;t<e.length;t++)if(r=e[t],"."===r)e.splice(t,1),t-=1;else if(".."===r){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function r(e,r,n){var i,o,s,a,c,p,d,u,l,f,m,h,g=r&&r.split("/"),b=k.map,v=b&&b["*"];if(e&&(e=e.split("/"),d=e.length-1,k.nodeIdCompat&&jsSuffixRegExp.test(e[d])&&(e[d]=e[d].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(h=g.slice(0,g.length-1),e=h.concat(e)),t(e),e=e.join("/")),n&&b&&(g||v)){s=e.split("/");e:for(a=s.length;a>0;a-=1){if(p=s.slice(0,a).join("/"),g)for(c=g.length;c>0;c-=1)if(o=getOwn(b,g.slice(0,c).join("/")),o&&(o=getOwn(o,p))){u=o,l=a;break e}!f&&v&&getOwn(v,p)&&(f=getOwn(v,p),m=a)}!u&&f&&(u=f,l=m),u&&(s.splice(0,l,u),e=s.join("/"))}return i=getOwn(k.pkgs,e),i?i:e}function n(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===j.contextName?(t.parentNode.removeChild(t),!0):void 0})}function i(e){var t=getOwn(k.paths,e);return t&&isArray(t)&&t.length>1?(t.shift(),j.require.undef(e),j.makeRequire(null,{skipMap:!0})([e]),!0):void 0}function o(e){var t,r=e?e.indexOf("!"):-1;return r>-1&&(t=e.substring(0,r),e=e.substring(r+1,e.length)),[t,e]}function s(e,t,n,i){var s,a,c,p,d=null,u=t?t.name:null,l=e,f=!0,m="";return e||(f=!1,e="_@r"+(T+=1)),p=o(e),d=p[0],e=p[1],d&&(d=r(d,u,i),a=getOwn(O,d)),e&&(d?m=a&&a.normalize?a.normalize(e,function(e){return r(e,u,i)}):-1===e.indexOf("!")?r(e,u,i):e:(m=r(e,u,i),p=o(m),d=p[0],m=p[1],n=!0,s=j.nameToUrl(m))),c=!d||a||n?"":"_unnormalized"+(C+=1),{prefix:d,name:m,parentMap:t,unnormalized:!!c,url:s,originalName:l,isDefine:f,id:(d?d+"!"+m:m)+c}}function a(e){var t=e.id,r=getOwn(y,t);return r||(r=y[t]=new j.Module(e)),r}function c(e,t,r){var n=e.id,i=getOwn(y,n);!hasProp(O,n)||i&&!i.defineEmitComplete?(i=a(e),i.error&&"error"===t?r(i.error):i.on(t,r)):"defined"===t&&r(O[n])}function p(e,t){var r=e.requireModules,n=!1;t?t(e):(each(r,function(t){var r=getOwn(y,t);r&&(r.error=e,r.events.error&&(n=!0,r.emit("error",e)))}),n||req.onError(e))}function d(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(j.defQueueMap[t]=!0),M.push(e)}),globalDefQueue=[])}function u(e){delete y[e],delete E[e]}function l(e,t,r){var n=e.map.id;e.error?e.emit("error",e.error):(t[n]=!0,each(e.depMaps,function(n,i){var o=n.id,s=getOwn(y,o);!s||e.depMatched[i]||r[o]||(getOwn(t,o)?(e.defineDep(i,O[o]),e.check()):l(s,t,r))}),r[n]=!0)}function f(){var e,t,r=1e3*k.waitSeconds,o=r&&j.startTime+r<(new Date).getTime(),s=[],a=[],c=!1,d=!0;if(!v){if(v=!0,eachProp(E,function(e){var r=e.map,p=r.id;if(e.enabled&&(r.isDefine||a.push(e),!e.error))if(!e.inited&&o)i(p)?(t=!0,c=!0):(s.push(p),n(p));else if(!e.inited&&e.fetched&&r.isDefine&&(c=!0,!r.prefix))return d=!1}),o&&s.length)return e=makeError("timeout","Load timeout for modules: "+s,null,s),e.contextName=j.contextName,p(e);d&&each(a,function(e){l(e,{},{})}),o&&!t||!c||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,f()},50)),v=!1}}function m(e){hasProp(O,e[0])||a(s(e[0],null,!0)).init(e[1],e[2])}function h(e,t,r,n){e.detachEvent&&!isOpera?n&&e.detachEvent(n,t):e.removeEventListener(r,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return h(t,j.onScriptLoad,"load","onreadystatechange"),h(t,j.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function b(){var e;for(d();M.length;){if(e=M.shift(),null===e[0])return p(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));m(e)}j.defQueueMap={}}var v,x,j,q,w,k={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},y={},E={},S={},M=[],O={},R={},P={},T=1,C=1;return q={require:function(e){return e.require?e.require:e.require=j.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?O[e.map.id]=e.exports:e.exports=O[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(k.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},x=function(e){this.events=getOwn(S,e.id)||{},this.map=e,this.shim=getOwn(k.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},x.prototype={init:function(e,t,r,n){n=n||{},this.inited||(this.factory=t,r?this.on("error",r):this.events.error&&(r=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=r,this.inited=!0,this.ignore=n.ignore,n.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,j.startTime=(new Date).getTime();var e=this.map;return this.shim?void j.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;R[e]||(R[e]=!0,j.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,r=this.map.id,n=this.depExports,i=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){try{i=j.execCb(r,o,n,i)}catch(s){e=s}if(this.map.isDefine&&void 0===i&&(t=this.module,t?i=t.exports:this.usingExports&&(i=this.exports)),e){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",p(this.error=e);"undefined"!=typeof console&&console.error?console.error(e):req.onError(e)}}else i=o;if(this.exports=i,this.map.isDefine&&!this.ignore&&(O[r]=i,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(j,this.map,a)}u(r),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(j.defQueueMap,r)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,n=s(e.prefix);this.depMaps.push(n),c(n,"defined",bind(this,function(n){var i,o,d,l=getOwn(P,this.map.id),f=this.map.name,m=this.map.parentMap?this.map.parentMap.name:null,h=j.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(n.normalize&&(f=n.normalize(f,function(e){return r(e,m,!0)})||""),o=s(e.prefix+"!"+f,this.map.parentMap),c(o,"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),d=getOwn(y,o.id),void(d&&(this.depMaps.push(o),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):l?(this.map.url=j.nameToUrl(l),void this.load()):(i=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),i.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(y,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&u(e.map.id)}),p(e)}),i.fromText=bind(this,function(r,n){var o=e.name,c=s(o),d=useInteractive;n&&(r=n),d&&(useInteractive=!1),a(c),hasProp(k.config,t)&&(k.config[o]=k.config[t]);try{req.exec(r)}catch(u){return p(makeError("fromtexteval","fromText eval for "+t+" failed: "+u,u,[t]))}d&&(useInteractive=!0),this.depMaps.push(c),j.completeLoad(o),h([o],i)}),void n.load(e.name,h,i,k))})),j.enable(n,this),this.pluginMaps[n.id]=n},enable:function(){E[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var r,n,i;if("string"==typeof e){if(e=s(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,i=getOwn(q,e.id))return void(this.depExports[t]=i(this));this.depCount+=1,c(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?c(e,"error",bind(this,this.errback)):this.events.error&&c(e,"error",bind(this,function(e){this.emit("error",e)}))}r=e.id,n=y[r],hasProp(q,r)||!n||n.enabled||j.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(y,e.id);t&&!t.enabled&&j.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var r=this.events[e];r||(r=this.events[e]=[]),r.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},j={config:k,contextName:e,registry:y,defined:O,urlFetched:R,defQueue:M,defQueueMap:{},Module:x,makeModuleMap:s,nextTick:req.nextTick,onError:p,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=k.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(k[t]||(k[t]={}),mixin(k[t],e,!0,!0)):k[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(P[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,r){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=j.makeShimExports(e)),t[r]=e}),k.shim=t),e.packages&&each(e.packages,function(e){var t,r;e="string"==typeof e?{name:e}:e,r=e.name,t=e.location,t&&(k.paths[r]=e.location),k.pkgs[r]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(y,function(e,t){e.inited||e.map.unnormalized||(e.map=s(t,null,!0))}),(e.deps||e.callback)&&j.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,i){function o(r,n,c){var d,u,l;return i.enableBuildCallback&&n&&isFunction(n)&&(n.__requireJsBuild=!0),"string"==typeof r?isFunction(n)?p(makeError("requireargs","Invalid require call"),c):t&&hasProp(q,r)?q[r](y[t.id]):req.get?req.get(j,r,t,o):(u=s(r,t,!1,!0),d=u.id,hasProp(O,d)?O[d]:p(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(b(),j.nextTick(function(){b(),l=a(s(null,t)),l.skipMap=i.skipMap,l.init(r,n,c,{enabled:!0}),f()}),o)}return i=i||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var n,i=e.lastIndexOf("."),o=e.split("/")[0],s="."===o||".."===o;return-1!==i&&(!s||i>1)&&(n=e.substring(i,e.length),e=e.substring(0,i)),j.nameToUrl(r(e,t&&t.id,!0),n,!0)},defined:function(e){return hasProp(O,s(e,t,!1,!0).id)},specified:function(e){return e=s(e,t,!1,!0).id,hasProp(O,e)||hasProp(y,e)}}),t||(o.undef=function(e){d();var r=s(e,t,!0),i=getOwn(y,e);i.undefed=!0,n(e),delete O[e],delete R[r.url],delete S[e],eachReverse(M,function(t,r){t[0]===e&&M.splice(r,1)}),delete j.defQueueMap[e],i&&(i.events.defined&&(S[e]=i.events),u(e))}),o},enable:function(e){var t=getOwn(y,e.id);t&&a(e).enable()},completeLoad:function(e){var t,r,n,o=getOwn(k.shim,e)||{},s=o.exports;for(d();M.length;){if(r=M.shift(),null===r[0]){if(r[0]=e,t)break;t=!0}else r[0]===e&&(t=!0);m(r)}if(j.defQueueMap={},n=getOwn(y,e),!t&&!hasProp(O,e)&&n&&!n.inited){if(!(!k.enforceDefine||s&&getGlobal(s)))return i(e)?void 0:p(makeError("nodefine","No define call for "+e,null,[e]));m([e,o.deps||[],o.exportsFn])}f()},nameToUrl:function(e,t,r){var n,i,o,s,a,c,p,d=getOwn(k.pkgs,e);if(d&&(e=d),p=getOwn(P,e))return j.nameToUrl(p,t,r);if(req.jsExtRegExp.test(e))a=e+(t||"");else{for(n=k.paths,i=e.split("/"),o=i.length;o>0;o-=1)if(s=i.slice(0,o).join("/"),c=getOwn(n,s)){isArray(c)&&(c=c[0]),i.splice(0,o,c);break}a=i.join("/"),a+=t||(/^data\:|\?/.test(a)||r?"":".js"),a=("/"===a.charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+a}return k.urlArgs?a+((-1===a.indexOf("?")?"?":"&")+k.urlArgs):a},load:function(e,t){req.load(j,e,t)},execCb:function(e,t,r,n){return t.apply(n,r)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);j.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!i(t.id)){var r=[];return eachProp(y,function(e,n){0!==n.indexOf("_@r")&&each(e.depMaps,function(e){return e.id===t.id&&r.push(n),!0})}),p(makeError("scripterror",'Script error for "'+t.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[t.id]))}}},j.require=j.makeRequire(),j}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.22",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,r,n){var i,o,s=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=r,r=n):e=[]),o&&o.context&&(s=o.context),i=getOwn(contexts,s),i||(i=contexts[s]=req.s.newContext(s)),o&&i.configure(o),i.require(e,t,r)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},req.load=function(e,t,r){var n,i=e&&e.config||{};if(isBrowser)return n=req.createNode(i,t,r),i.onNodeCreated&&i.onNodeCreated(n,i,t,r),n.setAttribute("data-requirecontext",e.contextName),n.setAttribute("data-requiremodule",t),!n.attachEvent||n.attachEvent.toString&&n.attachEvent.toString().indexOf("[native code")<0||isOpera?(n.addEventListener("load",e.onScriptLoad,!1),n.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,n.attachEvent("onreadystatechange",e.onScriptLoad)),n.src=r,currentlyAddingScript=n,baseElement?head.insertBefore(n,baseElement):head.appendChild(n),currentlyAddingScript=null,n;if(isWebWorker)try{importScripts(r),e.completeLoad(t)}catch(o){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+r,o,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,r){var n,i;"string"!=typeof e&&(r=t,t=e,e=null),isArray(t)||(r=t,t=null),!t&&isFunction(r)&&(t=[],r.length&&(r.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,r){t.push(r)}),t=(1===r.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(n=currentlyAddingScript||getInteractiveScript(),n&&(e||(e=n.getAttribute("data-requiremodule")),i=contexts[n.getAttribute("data-requirecontext")])),i?(i.defQueue.push([e,t,r]),i.defQueueMap[e]=!0):globalDefQueue.push([e,t,r])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),function(){var e,t,r=~location.search.indexOf("local")||~location.host.indexOf("localhost")||~location.host.indexOf(".local"),n=~location.search.indexOf("debug"),i=function(){var e=document.getElementsByTagName("script");return e[e.length-1]}(),o=function(){var o=i.getAttribute("src"),s=/(.+\/)(.+)/.exec(o)[1];return/-debug\.js$/.test(o)&&(n=!0),e=~s.indexOf("g-assets.daily.taobao.net"),t=~s.indexOf("g.tbcdn.cn")||~s.indexOf("g.alicdn.com"),(e||t)&&(r=!1),r&&(s+="bower_components/"),s}(),s=function(){var t="brix-components/";return r&&(n=!0),e&&(n=!0),n||(t+="dist/"),t}();require.config({waitSeconds:0,map:{"*":{css:o+"require-css/css.js",less:o+"require-less/less.js",text:o+"requirejs-text/text.js","components/base":o+s+"base/base.js","components/dropdown":o+s+"dropdown/dropdown.js","components/switch":o+s+"switch/switch.js","components/pagination":o+s+"pagination/pagination.js","components/pagination/state":o+s+"pagination/state.js","components/dialog":o+s+"dialog/dialog.js","components/dialog/position":o+s+"dialog/position.js","components/dialogview":o+s+"dialogview/dialogview.js","components/table":o+s+"table/table.js","components/table/linkage":o+s+"table/linkage.js","components/datepicker":o+s+"datepicker/datepicker.js","components/datepickerwrapper":o+s+"datepickerwrapper/datepickerwrapper.js","components/datepicker/ancient":o+s+"datepicker/ancient/datepicker.js","components/popover":o+s+"popover/popover.js","components/uploader":o+s+"uploader/uploader.js","components/nprogress":o+s+"nprogress/nprogress.js","components/hourpicker":o+s+"hourpicker/hourpicker.js","components/areapicker":o+s+"areapicker/areapicker.js","components/tree":o+s+"tree/tree.js","components/tree/tree.node.json.tpl":o+s+"tree/tree.node.json.tpl.js","components/taginput":o+s+"taginput/taginput.js","components/suggest":o+s+"suggest/suggest.js","components/chartxwrapper":o+s+"chartxwrapper/chartxwrapper.js","components/hello":o+s+"hello/hello.js","components/hello-extra":o+s+"hello-extra/hello-extra.js","components/colorpicker":o+s+"colorpicker/colorpicker.js","components/modal":o+s+"modal/modal.js","components/editor":o+s+"editor/editor.js","components/editable":o+s+"editable/editable.js","components/spin":o+s+"spin/spin.js","components/countdown":o+s+"countdown/countdown.js","components/sidebar":o+s+"sidebar/sidebar.js","components/chart":o+s+"chart/chart.js","components/imager":o+s+"imager/imager.js","components/validation":o+s+"validation/validation.js","components/validation/i18n":o+"parsleyjs/src/i18n","components/ellipsis":o+s+"ellipsis/ellipsis.js","components/progressbarwrapper":o+s+"progressbarwrapper/progressbarwrapper.js","components/errortips":o+s+"errortips/errortips.js","components/sidenav":o+s+"sidenav/sidenav.js","components/footer":o+s+"footer/footer.js","components/wizard":o+s+"wizard/wizard.js","components/tab":o+s+"tab/tab.js","components/ctree":o+s+"ctree/ctree.js","components/sticky":o+s+"sticky/sticky.js","components/nav":o+s+"nav/nav.js","components/readme":o+s+"readme/readme.js","components/css-layout-debugger":o+s+"css-layout-debugger/css-layout-debugger.js","components/boilerplate":o+s+"boilerplate/boilerplate.js"}},paths:{"brix/loader":o+"brix-loader/dist/loader"+(n?"-debug":""),"brix/base":o+"brix-base/dist/base"+(n?"-debug":""),"brix/event":o+"brix-event/dist/event"+(n?"-debug":""),"brix/bisheng":o+"brix-bisheng/dist/bisheng"+(n?"-debug":""),"brix/animation":o+"brix-animation/dist/animation"+(n?"-debug":""),"brix/spa":o+"brix-spa/dist/spa",magix:"//g.alicdn.com/thx/magix/2.0/requirejs-magix-min",chartx:"//g.alicdn.com/thx/charts/1.6.1/chartx/",dependencies:o+"",jquery:o+"jquery/dist/jquery"+(n?"":".min"),underscore:o+"underscore/underscore"+(n?"":"-min"),moment:o+(n?"moment/moment":"moment/min/moment.min"),handlebars:o+"handlebars/handlebars"+(n?"":".min"),mousetrap:o+"mousetrap/mousetrap"+(n?"":".min"),mock:o+"mockjs/dist/mock"+(n?"":"-min"),marked:o+"marked/lib/marked",Chart:o+"chartjs/Chart",director:o+"director/build/director",URIjs:o+"uri.js/src/",page:o+"page/page",highlightjs:o+"highlightjs/highlight.pack",nprogress:o+"nprogress/nprogress",parsley:o+"parsleyjs/dist/parsley"+(n?"":".min"),log:o+"log/log",accounting:o+"accountingjs/accounting"+(n?"":".min"),progressbar:o+"progressbar.js/dist/progressbar",Sortable:o+"Sortable/Sortable",fontawesome:o+"fontawesome/",vue:o+"vue/dist/vue"+(n?"":".min"),"css-tool":o+"brix-components/css-tool/",colors:o+"colors/",printf:o+"brix-components/printf/printf"},shim:{Chart:{exports:"Chart"},director:{exports:"Router"},highlightjs:{exports:"hljs"},parsley:{exports:"Parsley"}}})}(),function(){(new Image).src="http://c.simba.taobao.com/click.2?m=p&pid=mm_test&path="+location.host+"&_="+(new Date).getTime()}(),function(){require(["brix/loader"],function(e){var t={now:+new Date,parse:function(e){return{host:location.host,screen:screen.width+"x"+screen.height,scrollTop:document.documentElement.scrollTop||document.body.scrollTop||0,scrollLeft:document.documentElement.scrollLeft||document.body.scrollLeft||0,message:e.message,file:void 0!=e.fileName?e.fileName:void 0,line:void 0!=e.lineNumber?e.lineNumber:void 0,column:void 0!=e.columnNumber?e.columnNumber:void 0,stack:void 0!=e.stack?e.stack.substr(0,900):void 0,ecode:void 0!=e.number?65535&e.number:void 0,params:void 0!=e.params?e.params:void 0}},send:function(e){var r="http://fb.alimama.com/jsonp/feedback/create?_callback=Brix_"+t.now++ +"&site=66&form=51&card=92&customer="+encodeURIComponent(location.host)+"&url="+encodeURIComponent(location.href)+"&description="+encodeURIComponent(function(e){var r=[];for(var n in e)void 0!==e[n]&&r.push(t.fixWidth(n,10)+" : "+e[n]);return r.join("\r\n")}(e)),n=document.createElement("script");n.async=!0,n.src=r,n.onload=function(){n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null},n.onerror=function(){},document.head.appendChild(n)},fixWidth:function(e,t){for(var r=e.length;t>r;r++)e+=" ";return e}};e.onerror=function(e){if(!(Math.random()<.8))try{t.send(t.parse(e))}catch(e){console.log(e.stack||e)}}})}(),function(){require(["css!dependencies/bootstrap/dist/css/bootstrap.min.css"]),require(["css!dependencies/brix-components/dist/css-tool/components.css"]),require(["css!dependencies/parsleyjs/src/parsley.css"]),require(["css!dependencies/brix-components/dist/css-tool/minecraft.css"])}(),function(){require(["css!dependencies/minecraft-animation/dist/css/animate-min.css"])}();
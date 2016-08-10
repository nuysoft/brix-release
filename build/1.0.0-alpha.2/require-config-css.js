var requirejs,require,define;!function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var r;for(r=0;r<e.length&&(!e[r]||!t(e[r],r,e));r+=1);}}function eachReverse(e,t){if(e){var r;for(r=e.length-1;r>-1&&(!e[r]||!t(e[r],r,e));r-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var r;for(r in e)if(hasProp(e,r)&&t(e[r],r))break}function mixin(e,t,r,i){return t&&eachProp(t,function(t,n){(r||!hasProp(e,n))&&(!i||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,r,i)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,r,i){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=i,r&&(n.originalError=r),n}function newContext(e){function t(e){var t,r;for(t=0;t<e.length;t++)if(r=e[t],"."===r)e.splice(t,1),t-=1;else if(".."===r){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function r(e,r,i){var n,s,o,a,c,u,d,p,l,f,h,m,g=r&&r.split("/"),b=w.map,x=b&&b["*"];if(e&&(e=e.split("/"),d=e.length-1,w.nodeIdCompat&&jsSuffixRegExp.test(e[d])&&(e[d]=e[d].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),i&&b&&(g||x)){o=e.split("/");e:for(a=o.length;a>0;a-=1){if(u=o.slice(0,a).join("/"),g)for(c=g.length;c>0;c-=1)if(s=getOwn(b,g.slice(0,c).join("/")),s&&(s=getOwn(s,u))){p=s,l=a;break e}!f&&x&&getOwn(x,u)&&(f=getOwn(x,u),h=a)}!p&&f&&(p=f,l=h),p&&(o.splice(0,l,p),e=o.join("/"))}return n=getOwn(w.pkgs,e),n?n:e}function i(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName?(t.parentNode.removeChild(t),!0):void 0})}function n(e){var t=getOwn(w.paths,e);return t&&isArray(t)&&t.length>1?(t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0):void 0}function s(e){var t,r=e?e.indexOf("!"):-1;return r>-1&&(t=e.substring(0,r),e=e.substring(r+1,e.length)),[t,e]}function o(e,t,i,n){var o,a,c,u,d=null,p=t?t.name:null,l=e,f=!0,h="";return e||(f=!1,e="_@r"+(A+=1)),u=s(e),d=u[0],e=u[1],d&&(d=r(d,p,n),a=getOwn(j,d)),e&&(d?h=a&&a.normalize?a.normalize(e,function(e){return r(e,p,n)}):-1===e.indexOf("!")?r(e,p,n):e:(h=r(e,p,n),u=s(h),d=u[0],h=u[1],i=!0,o=q.nameToUrl(h))),c=!d||a||i?"":"_unnormalized"+(T+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!c,url:o,originalName:l,isDefine:f,id:(d?d+"!"+h:h)+c}}function a(e){var t=e.id,r=getOwn(k,t);return r||(r=k[t]=new q.Module(e)),r}function c(e,t,r){var i=e.id,n=getOwn(k,i);!hasProp(j,i)||n&&!n.defineEmitComplete?(n=a(e),n.error&&"error"===t?r(n.error):n.on(t,r)):"defined"===t&&r(j[i])}function u(e,t){var r=e.requireModules,i=!1;t?t(e):(each(r,function(t){var r=getOwn(k,t);r&&(r.error=e,r.events.error&&(i=!0,r.emit("error",e)))}),i||req.onError(e))}function d(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(q.defQueueMap[t]=!0),M.push(e)}),globalDefQueue=[])}function p(e){delete k[e],delete S[e]}function l(e,t,r){var i=e.map.id;e.error?e.emit("error",e.error):(t[i]=!0,each(e.depMaps,function(i,n){var s=i.id,o=getOwn(k,s);!o||e.depMatched[n]||r[s]||(getOwn(t,s)?(e.defineDep(n,j[s]),e.check()):l(o,t,r))}),r[i]=!0)}function f(){var e,t,r=1e3*w.waitSeconds,s=r&&q.startTime+r<(new Date).getTime(),o=[],a=[],c=!1,d=!0;if(!x){if(x=!0,eachProp(S,function(e){var r=e.map,u=r.id;if(e.enabled&&(r.isDefine||a.push(e),!e.error))if(!e.inited&&s)n(u)?(t=!0,c=!0):(o.push(u),i(u));else if(!e.inited&&e.fetched&&r.isDefine&&(c=!0,!r.prefix))return d=!1}),s&&o.length)return e=makeError("timeout","Load timeout for modules: "+o,null,o),e.contextName=q.contextName,u(e);d&&each(a,function(e){l(e,{},{})}),s&&!t||!c||!isBrowser&&!isWebWorker||E||(E=setTimeout(function(){E=0,f()},50)),x=!1}}function h(e){hasProp(j,e[0])||a(o(e[0],null,!0)).init(e[1],e[2])}function m(e,t,r,i){e.detachEvent&&!isOpera?i&&e.detachEvent(i,t):e.removeEventListener(r,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function b(){var e;for(d();M.length;){if(e=M.shift(),null===e[0])return u(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}q.defQueueMap={}}var x,v,q,y,E,w={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},k={},S={},O={},M=[],j={},P={},R={},A=1,T=1;return y={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(w.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},v=function(e){this.events=getOwn(O,e.id)||{},this.map=e,this.shim=getOwn(w.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},v.prototype={init:function(e,t,r,i){i=i||{},this.inited||(this.factory=t,r?this.on("error",r):this.events.error&&(r=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=r,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;return this.shim?void q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;P[e]||(P[e]=!0,q.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,r=this.map.id,i=this.depExports,n=this.exports,s=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(s)){try{n=q.execCb(r,s,i,n)}catch(o){e=o}if(this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(n=this.exports)),e){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",u(this.error=e);"undefined"!=typeof console&&console.error?console.error(e):req.onError(e)}}else n=s;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[r]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(q,this.map,a)}p(r),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(q.defQueueMap,r)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,i=o(e.prefix);this.depMaps.push(i),c(i,"defined",bind(this,function(i){var n,s,d,l=getOwn(R,this.map.id),f=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(i.normalize&&(f=i.normalize(f,function(e){return r(e,h,!0)})||""),s=o(e.prefix+"!"+f,this.map.parentMap),c(s,"defined",bind(this,function(e){this.map.normalizedMap=s,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),d=getOwn(k,s.id),void(d&&(this.depMaps.push(s),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):l?(this.map.url=q.nameToUrl(l),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(k,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),u(e)}),n.fromText=bind(this,function(r,i){var s=e.name,c=o(s),d=useInteractive;i&&(r=i),d&&(useInteractive=!1),a(c),hasProp(w.config,t)&&(w.config[s]=w.config[t]);try{req.exec(r)}catch(p){return u(makeError("fromtexteval","fromText eval for "+t+" failed: "+p,p,[t]))}d&&(useInteractive=!0),this.depMaps.push(c),q.completeLoad(s),m([s],n)}),void i.load(e.name,m,n,w))})),q.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){S[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var r,i,n;if("string"==typeof e){if(e=o(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(y,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,c(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?c(e,"error",bind(this,this.errback)):this.events.error&&c(e,"error",bind(this,function(e){this.emit("error",e)}))}r=e.id,i=k[r],hasProp(y,r)||!i||i.enabled||q.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(k,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var r=this.events[e];r||(r=this.events[e]=[]),r.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},q={config:w,contextName:e,registry:k,defined:j,urlFetched:P,defQueue:M,defQueueMap:{},Module:v,makeModuleMap:o,nextTick:req.nextTick,onError:u,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=w.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(w[t]||(w[t]={}),mixin(w[t],e,!0,!0)):w[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,r){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),t[r]=e}),w.shim=t),e.packages&&each(e.packages,function(e){var t,r;e="string"==typeof e?{name:e}:e,r=e.name,t=e.location,t&&(w.paths[r]=e.location),w.pkgs[r]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(k,function(e,t){e.inited||e.map.unnormalized||(e.map=o(t,null,!0))}),(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function s(r,i,c){var d,p,l;return n.enableBuildCallback&&i&&isFunction(i)&&(i.__requireJsBuild=!0),"string"==typeof r?isFunction(i)?u(makeError("requireargs","Invalid require call"),c):t&&hasProp(y,r)?y[r](k[t.id]):req.get?req.get(q,r,t,s):(p=o(r,t,!1,!0),d=p.id,hasProp(j,d)?j[d]:u(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(b(),q.nextTick(function(){b(),l=a(o(null,t)),l.skipMap=n.skipMap,l.init(r,i,c,{enabled:!0}),f()}),s)}return n=n||{},mixin(s,{isBrowser:isBrowser,toUrl:function(e){var i,n=e.lastIndexOf("."),s=e.split("/")[0],o="."===s||".."===s;return-1!==n&&(!o||n>1)&&(i=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(r(e,t&&t.id,!0),i,!0)},defined:function(e){return hasProp(j,o(e,t,!1,!0).id)},specified:function(e){return e=o(e,t,!1,!0).id,hasProp(j,e)||hasProp(k,e)}}),t||(s.undef=function(e){d();var r=o(e,t,!0),n=getOwn(k,e);n.undefed=!0,i(e),delete j[e],delete P[r.url],delete O[e],eachReverse(M,function(t,r){t[0]===e&&M.splice(r,1)}),delete q.defQueueMap[e],n&&(n.events.defined&&(O[e]=n.events),p(e))}),s},enable:function(e){var t=getOwn(k,e.id);t&&a(e).enable()},completeLoad:function(e){var t,r,i,s=getOwn(w.shim,e)||{},o=s.exports;for(d();M.length;){if(r=M.shift(),null===r[0]){if(r[0]=e,t)break;t=!0}else r[0]===e&&(t=!0);h(r)}if(q.defQueueMap={},i=getOwn(k,e),!t&&!hasProp(j,e)&&i&&!i.inited){if(!(!w.enforceDefine||o&&getGlobal(o)))return n(e)?void 0:u(makeError("nodefine","No define call for "+e,null,[e]));h([e,s.deps||[],s.exportsFn])}f()},nameToUrl:function(e,t,r){var i,n,s,o,a,c,u,d=getOwn(w.pkgs,e);if(d&&(e=d),u=getOwn(R,e))return q.nameToUrl(u,t,r);if(req.jsExtRegExp.test(e))a=e+(t||"");else{for(i=w.paths,n=e.split("/"),s=n.length;s>0;s-=1)if(o=n.slice(0,s).join("/"),c=getOwn(i,o)){isArray(c)&&(c=c[0]),n.splice(0,s,c);break}a=n.join("/"),a+=t||(/^data\:|\?/.test(a)||r?"":".js"),a=("/"===a.charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":w.baseUrl)+a}return w.urlArgs?a+((-1===a.indexOf("?")?"?":"&")+w.urlArgs):a},load:function(e,t){req.load(q,e,t)},execCb:function(e,t,r,i){return t.apply(i,r)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);q.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!n(t.id)){var r=[];return eachProp(k,function(e,i){0!==i.indexOf("_@r")&&each(e.depMaps,function(e){return e.id===t.id&&r.push(i),!0})}),u(makeError("scripterror",'Script error for "'+t.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[t.id]))}}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.22",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,r,i){var n,s,o=defContextName;return isArray(e)||"string"==typeof e||(s=e,isArray(t)?(e=t,t=r,r=i):e=[]),s&&s.context&&(o=s.context),n=getOwn(contexts,o),n||(n=contexts[o]=req.s.newContext(o)),s&&n.configure(s),n.require(e,t,r)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},req.load=function(e,t,r){var i,n=e&&e.config||{};if(isBrowser)return i=req.createNode(n,t,r),n.onNodeCreated&&n.onNodeCreated(i,n,t,r),i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0||isOpera?(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)),i.src=r,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i;if(isWebWorker)try{importScripts(r),e.completeLoad(t)}catch(s){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+r,s,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,r){var i,n;"string"!=typeof e&&(r=t,t=e,e=null),isArray(t)||(r=t,t=null),!t&&isFunction(r)&&(t=[],r.length&&(r.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,r){t.push(r)}),t=(1===r.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(e||(e=i.getAttribute("data-requiremodule")),n=contexts[i.getAttribute("data-requirecontext")])),n?(n.defQueue.push([e,t,r]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,r])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),function(){function e(e,t){return r?e:t}var t=!!~location.search.indexOf("local")||!!~location.host.indexOf("localhost")||!!~location.host.indexOf(".local"),r=!!~location.search.indexOf("debug"),i=function(){var e=document.getElementsByTagName("script"),i=e[e.length-1],n=i.getAttribute("src"),s=/(.+\/)(.+)/.exec(n)[1];/-debug\.js$/.test(n)&&(r=!0);var o=!!~s.indexOf("g-assets.daily.taobao.net"),a=!!~s.indexOf("g.tbcdn.cn")||!!~s.indexOf("g.alicdn.com");return(o||a)&&(t=!1),(t||o)&&(r=!0),t&&(s+="bower_components/"),s}();require.config({waitSeconds:0,map:{"*":{css:i+"require-css/css.js"}}});var n={"brix/loader":i+"brix-loader/dist/"+e("loader-debug","loader"),"brix/base":i+"brix-base/dist/"+e("base-debug","base"),"brix/event":i+"brix-event/dist/"+e("event-debug","event"),"brix/animation":i+"brix-animation/dist/"+e("animation-debug","animation"),"brix/components":i+"brix-components/dist/components","brix/styles":i+"brix-components/dist/styles","brix/dependencies":i,"brix/deps":i};n.components=n["brix/components"],n.styles=n["brix/styles"],n.dependencies=n["brix/dependencies"],n.deps=n.dependencies,require.config({paths:n});var s={jquery:i+"jquery/dist/"+e("jquery","jquery.min"),underscore:i+"underscore/"+e("underscore","underscore-min"),moment:i+e("moment/moment","moment/min/moment.min"),handlebars:i+"handlebars/"+e("handlebars","handlebars.min"),mock:i+"mockjs/dist/"+e("mock","mock-min"),marked:i+"marked/lib/marked",highlightjs:i+"highlightjs/highlight.pack",nprogress:i+"nprogress/nprogress",parsley:i+"parsleyjs/dist/"+e("parsley","parsley.min"),accounting:i+"accountingjs/"+e("accounting","accounting.min"),progressbar:i+"progressbar.js/dist/progressbar",Sortable:i+"Sortable/Sortable",vue:i+"vue/dist/"+e("vue","vue.min")};require.config({paths:s,shim:{highlightjs:{exports:"hljs"},parsley:{exports:"Parsley"}}})}(),function(){require(["css!brix/deps/bootstrap/dist/css/bootstrap.min.css"]),require(["css!brix/styles/components.css"]),require(["css!brix/deps/parsleyjs/src/parsley.css"]),require(["css!brix/styles/minecraft.css"])}();
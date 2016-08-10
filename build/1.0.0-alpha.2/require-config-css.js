var requirejs,require,define;!function(global){function commentReplace(e,t,i,r){return r||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}function eachReverse(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(e,t,i,r){return t&&eachProp(t,function(t,n){(i||!hasProp(e,n))&&(!r||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,i,r)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}function newContext(e){function t(e){var t,i;for(t=0;t<e.length;t++)if(i=e[t],"."===i)e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function i(e,i,r){var n,s,o,a,c,u,d,p,l,f,h,m,g=i&&i.split("/"),b=w.map,x=b&&b["*"];if(e&&(e=e.split("/"),d=e.length-1,w.nodeIdCompat&&jsSuffixRegExp.test(e[d])&&(e[d]=e[d].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),r&&b&&(g||x)){o=e.split("/");e:for(a=o.length;a>0;a-=1){if(u=o.slice(0,a).join("/"),g)for(c=g.length;c>0;c-=1)if(s=getOwn(b,g.slice(0,c).join("/")),s&&(s=getOwn(s,u))){p=s,l=a;break e}!f&&x&&getOwn(x,u)&&(f=getOwn(x,u),h=a)}!p&&f&&(p=f,l=h),p&&(o.splice(0,l,p),e=o.join("/"))}return n=getOwn(w.pkgs,e),n?n:e}function r(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName?(t.parentNode.removeChild(t),!0):void 0})}function n(e){var t=getOwn(w.paths,e);return t&&isArray(t)&&t.length>1?(t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0):void 0}function s(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function o(e,t,r,n){var o,a,c,u,d=null,p=t?t.name:null,l=e,f=!0,h="";return e||(f=!1,e="_@r"+(A+=1)),u=s(e),d=u[0],e=u[1],d&&(d=i(d,p,n),a=getOwn(j,d)),e&&(d?h=a&&a.normalize?a.normalize(e,function(e){return i(e,p,n)}):-1===e.indexOf("!")?i(e,p,n):e:(h=i(e,p,n),u=s(h),d=u[0],h=u[1],r=!0,o=q.nameToUrl(h))),c=!d||a||r?"":"_unnormalized"+(T+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!c,url:o,originalName:l,isDefine:f,id:(d?d+"!"+h:h)+c}}function a(e){var t=e.id,i=getOwn(k,t);return i||(i=k[t]=new q.Module(e)),i}function c(e,t,i){var r=e.id,n=getOwn(k,r);!hasProp(j,r)||n&&!n.defineEmitComplete?(n=a(e),n.error&&"error"===t?i(n.error):n.on(t,i)):"defined"===t&&i(j[r])}function u(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(k,t);i&&(i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}function d(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(q.defQueueMap[t]=!0),M.push(e)}),globalDefQueue=[])}function p(e){delete k[e],delete S[e]}function l(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,n){var s=r.id,o=getOwn(k,s);!o||e.depMatched[n]||i[s]||(getOwn(t,s)?(e.defineDep(n,j[s]),e.check()):l(o,t,i))}),i[r]=!0)}function f(){var e,t,i=1e3*w.waitSeconds,s=i&&q.startTime+i<(new Date).getTime(),o=[],a=[],c=!1,d=!0;if(!x){if(x=!0,eachProp(S,function(e){var i=e.map,u=i.id;if(e.enabled&&(i.isDefine||a.push(e),!e.error))if(!e.inited&&s)n(u)?(t=!0,c=!0):(o.push(u),r(u));else if(!e.inited&&e.fetched&&i.isDefine&&(c=!0,!i.prefix))return d=!1}),s&&o.length)return e=makeError("timeout","Load timeout for modules: "+o,null,o),e.contextName=q.contextName,u(e);d&&each(a,function(e){l(e,{},{})}),s&&!t||!c||!isBrowser&&!isWebWorker||E||(E=setTimeout(function(){E=0,f()},50)),x=!1}}function h(e){hasProp(j,e[0])||a(o(e[0],null,!0)).init(e[1],e[2])}function m(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function b(){var e;for(d();M.length;){if(e=M.shift(),null===e[0])return u(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}q.defQueueMap={}}var x,v,q,y,E,w={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},k={},S={},O={},M=[],j={},P={},R={},A=1,T=1;return y={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(w.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},v=function(e){this.events=getOwn(O,e.id)||{},this.map=e,this.shim=getOwn(w.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},v.prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;return this.shim?void q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;P[e]||(P[e]=!0,q.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,i=this.map.id,r=this.depExports,n=this.exports,s=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(s)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=q.execCb(i,s,r,n)}catch(o){e=o}else n=q.execCb(i,s,r,n);if(this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(n=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",u(this.error=e)}else n=s;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[i]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(q,this.map,a)}p(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(q.defQueueMap,i)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=o(e.prefix);this.depMaps.push(r),c(r,"defined",bind(this,function(r){var n,s,d,l=getOwn(R,this.map.id),f=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(f=r.normalize(f,function(e){return i(e,h,!0)})||""),s=o(e.prefix+"!"+f,this.map.parentMap),c(s,"defined",bind(this,function(e){this.map.normalizedMap=s,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),d=getOwn(k,s.id),void(d&&(this.depMaps.push(s),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):l?(this.map.url=q.nameToUrl(l),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(k,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),u(e)}),n.fromText=bind(this,function(i,r){var s=e.name,c=o(s),d=useInteractive;r&&(i=r),d&&(useInteractive=!1),a(c),hasProp(w.config,t)&&(w.config[s]=w.config[t]);try{req.exec(i)}catch(p){return u(makeError("fromtexteval","fromText eval for "+t+" failed: "+p,p,[t]))}d&&(useInteractive=!0),this.depMaps.push(c),q.completeLoad(s),m([s],n)}),void r.load(e.name,m,n,w))})),q.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){S[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(e=o(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(y,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,c(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?c(e,"error",bind(this,this.errback)):this.events.error&&c(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,r=k[i],hasProp(y,i)||!r||r.enabled||q.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(k,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},q={config:w,contextName:e,registry:k,defined:j,urlFetched:P,defQueue:M,defQueueMap:{},Module:v,makeModuleMap:o,nextTick:req.nextTick,onError:u,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var t=e.urlArgs;e.urlArgs=function(e,i){return(-1===i.indexOf("?")?"?":"&")+t}}var i=w.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(w[t]||(w[t]={}),mixin(w[t],e,!0,!0)):w[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),i[t]=e}),w.shim=i),e.packages&&each(e.packages,function(e){var t,i;e="string"==typeof e?{name:e}:e,i=e.name,t=e.location,t&&(w.paths[i]=e.location),w.pkgs[i]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(k,function(e,t){e.inited||e.map.unnormalized||(e.map=o(t,null,!0))}),(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function s(i,r,c){var d,p,l;return n.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),"string"==typeof i?isFunction(r)?u(makeError("requireargs","Invalid require call"),c):t&&hasProp(y,i)?y[i](k[t.id]):req.get?req.get(q,i,t,s):(p=o(i,t,!1,!0),d=p.id,hasProp(j,d)?j[d]:u(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(b(),q.nextTick(function(){b(),l=a(o(null,t)),l.skipMap=n.skipMap,l.init(i,r,c,{enabled:!0}),f()}),s)}return n=n||{},mixin(s,{isBrowser:isBrowser,toUrl:function(e){var r,n=e.lastIndexOf("."),s=e.split("/")[0],o="."===s||".."===s;return-1!==n&&(!o||n>1)&&(r=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(i(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(j,o(e,t,!1,!0).id)},specified:function(e){return e=o(e,t,!1,!0).id,hasProp(j,e)||hasProp(k,e)}}),t||(s.undef=function(e){d();var i=o(e,t,!0),n=getOwn(k,e);n.undefed=!0,r(e),delete j[e],delete P[i.url],delete O[e],eachReverse(M,function(t,i){t[0]===e&&M.splice(i,1)}),delete q.defQueueMap[e],n&&(n.events.defined&&(O[e]=n.events),p(e))}),s},enable:function(e){var t=getOwn(k,e.id);t&&a(e).enable()},completeLoad:function(e){var t,i,r,s=getOwn(w.shim,e)||{},o=s.exports;for(d();M.length;){if(i=M.shift(),null===i[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);h(i)}if(q.defQueueMap={},r=getOwn(k,e),!t&&!hasProp(j,e)&&r&&!r.inited){if(!(!w.enforceDefine||o&&getGlobal(o)))return n(e)?void 0:u(makeError("nodefine","No define call for "+e,null,[e]));h([e,s.deps||[],s.exportsFn])}f()},nameToUrl:function(e,t,i){var r,n,s,o,a,c,u,d=getOwn(w.pkgs,e);if(d&&(e=d),u=getOwn(R,e))return q.nameToUrl(u,t,i);if(req.jsExtRegExp.test(e))a=e+(t||"");else{for(r=w.paths,n=e.split("/"),s=n.length;s>0;s-=1)if(o=n.slice(0,s).join("/"),c=getOwn(r,o)){isArray(c)&&(c=c[0]),n.splice(0,s,c);break}a=n.join("/"),a+=t||(/^data\:|^blob\:|\?/.test(a)||i?"":".js"),a=("/"===a.charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":w.baseUrl)+a}return w.urlArgs&&!/^blob\:/.test(a)?a+w.urlArgs(e,a):a},load:function(e,t){req.load(q,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);q.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!n(t.id)){var i=[];return eachProp(k,function(e,r){0!==r.indexOf("_@r")&&each(e.depMaps,function(e){return e.id===t.id?(i.push(r),!0):void 0})}),u(makeError("scripterror",'Script error for "'+t.id+(i.length?'", needed by: '+i.join(", "):'"'),e,[t.id]))}}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.2.0",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,s,o=defContextName;return isArray(e)||"string"==typeof e||(s=e,isArray(t)?(e=t,t=i,i=r):e=[]),s&&s.context&&(o=s.context),n=getOwn(contexts,o),n||(n=contexts[o]=req.s.newContext(o)),s&&n.configure(s),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},req.load=function(e,t,i){var r,n=e&&e.config||{};if(isBrowser)return r=req.createNode(n,t,i),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,n.onNodeCreated&&n.onNodeCreated(r,n,t,i),currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{setTimeout(function(){},0),importScripts(i),e.completeLoad(t)}catch(s){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,s,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,i){var r,n;"string"!=typeof e&&(i=t,t=e,e=null),isArray(t)||(i=t,t=null),!t&&isFunction(i)&&(t=[],i.length&&(i.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,i){t.push(i)}),t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")])),n?(n.defQueue.push([e,t,i]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),function(){function e(e,t){return i?e:t}var t=!!~location.search.indexOf("local")||!!~location.host.indexOf("localhost")||!!~location.host.indexOf(".local"),i=!!~location.search.indexOf("debug"),r=function(){var e=document.getElementsByTagName("script"),r=e[e.length-1],n=r.getAttribute("src"),s=/(.+\/)(.+)/.exec(n)[1];/-debug\.js$/.test(n)&&(i=!0);var o=!!~s.indexOf("g-assets.daily.taobao.net"),a=!!~s.indexOf("g.tbcdn.cn")||!!~s.indexOf("g.alicdn.com");return(o||a)&&(t=!1),(t||o)&&(i=!0),t&&(s+="bower_components/"),s}();require.config({waitSeconds:0,map:{"*":{css:r+"require-css/css.js"}}});var n={"brix/loader":r+"brix-loader/dist/"+e("loader-debug","loader"),"brix/base":r+"brix-base/dist/"+e("base-debug","base"),"brix/event":r+"brix-event/dist/"+e("event-debug","event"),"brix/animation":r+"brix-animation/dist/"+e("animation-debug","animation"),"brix/components":r+"brix-components/dist/components","brix/styles":r+"brix-components/dist/styles","brix/dependencies":r,"brix/deps":r};n.components=n["brix/components"],n.styles=n["brix/styles"],n.dependencies=n["brix/dependencies"],n.deps=n.dependencies,require.config({paths:n});var s={jquery:r+"jquery/dist/"+e("jquery","jquery.min"),underscore:r+"underscore/"+e("underscore","underscore-min"),moment:r+e("moment/moment","moment/min/moment.min"),handlebars:r+"handlebars/"+e("handlebars","handlebars.min"),mock:r+"mockjs/dist/"+e("mock","mock-min"),marked:r+"marked/lib/marked",highlightjs:r+"highlightjs/highlight.pack",nprogress:r+"nprogress/nprogress",parsley:r+"parsleyjs/dist/"+e("parsley","parsley.min"),accounting:r+"accountingjs/"+e("accounting","accounting.min"),progressbar:r+"progressbar.js/dist/progressbar",Sortable:r+"Sortable/Sortable",vue:r+"vue/dist/"+e("vue","vue.min")};require.config({paths:s,shim:{highlightjs:{exports:"hljs"},parsley:{exports:"Parsley"}}})}(),function(){require(["css!brix/deps/bootstrap/dist/css/bootstrap.min.css"]),require(["css!brix/styles/components.css"]),require(["css!brix/deps/parsleyjs/src/parsley.css"]),require(["css!brix/styles/minecraft.css"])}();
/*!3.5.2 MIT kooboy_li@163.com*/define("magix",["$"],function(n){var t,e,r=n("$"),i=function(){},o=function(e,r){if(e)if(O==e)t||(t=Ct.extend()),r(t);else if(window.seajs)seajs.use(e,r);else{var i=[];c(e)||(e=[e]);for(var o=0;o<e.length;o++)i.push(n(e[o]));r&&r.apply(w,i)}else r()},f=function(){},a=function(n,t,e,r,i){return f[A]=t[A],i=new f,R(i,e),R(n,r),i.constructor=n,n[A]=i,n},u=r.isPlainObject,c=r.isArray,s=function(n,t){r(n).html(t),k.triggerHandler({type:"htmlchange",target:n})},$=r.find||r.zepto,h=$.matchesSelector||$.matches,v=function(n,t){t=n.data,n.eventTarget=t.e,N(t.f,n,t.v)},l=function(n,t,e,i,o){o&&(t+="."+o.i),i?r(n).off(t,e):r(n).on(t,o,e)},p=0,d="",m=[],g=m.slice,y=",",w=null,b=window,x=document,k=r(x),V="#",q=JSON.stringify,I="\x1e",j="object",A="prototype",T=/[#?].*$/,S=/([^=&?\/#]+)=?([^&#?]*)/g,U=/(?!^)=|&/,H=function(n){return(n||"mx_")+p++},O=H(),E={rootId:H(),defaultView:O,error:function(n){throw n}},C=E.hasOwnProperty,L=function(n){return typeof n==j?n:x.getElementById(n)},M=function(n){return!n||typeof n!=j},P=function(n,t,e){var r,i,o,f=0;for(o in n)r=n[o],i=t[o],M(r)&&i==r||(e[o]=1,f=1),t[o]=r;return f},Z=function(n,t,e){if(n=L(n),t=L(t),n&&t&&(e=n==t,!e))try{e=t.contains?t.contains(n):16&t.compareDocumentPosition(n)}catch(r){}return e},R=Object.assign||function(n,t,e){for(e in t)n[e]=t[e];return n},F=function(n,t){t&&!F[n]&&(F[n]=1,r("head").append("<style>"+t+"</style>"))},N=function(n,t,e,r,i,o){for(t=t||m,c(n)||(n=[n]),c(t)||(t=[t]),r=0;o=n[r];r++)try{i=o&&o.apply(e,t)}catch(f){E.error(f)}return i},B=function(n,t){return n&&C.call(n,t)},D=function(n,t){return t.f-n.f||t.t-n.t},z=function(n,t,e,r){r=this,r.c=[],r.b=0|t||5,r.x=r.b+(n||20),r.r=e};R(z[A],{get:function(n){var t=this,e=t.c,r=e[I+n];return r&&(r.f++,r.t=p++,r=r.v),r},each:function(n,t,e,r,i){for(e=this,r=e.c,i=r.length-1;i>-1;i--)n(r[i].v,t,e)},set:function(n,t){var e=this,r=e.c,i=I+n,o=r[i],f=e.b;if(!o){if(r.length>=e.x)for(r.sort(D);f--;)o=r.pop(),o.f>0&&e.del(o.o);o={o:n},r.push(o),r[i]=o}o.v=t,o.f=1,o.t=p++},del:function(n){n=I+n;var t=this.c,e=t[n],r=this.r;e&&(e.f=-1,e.v=d,delete t[n],r&&N(r,e.o))},has:function(n){return B(this.c,I+n)}});var J,K=new z,Q=function(n,t,e){try{e=decodeURIComponent(e)}catch(r){}J[t]=e},_=function(n){var t,e=K.get(n);return e||(J={},t=n.replace(T,d),n==t&&U.test(t)&&(t=d),n.replace(t,d).replace(S,Q),K.set(n,e={a:t,b:J})),{path:e.a,params:R({},e.b)}},G=function(n,t,e){var r,i,o,f=[];for(i in t)r=t[i]+d,(!e||r||B(e,i))&&(r=encodeURIComponent(r),f.push(o=i+"="+r));return o&&(n+=(n&&(~n.indexOf("?")?"&":"?"))+f.join("&")),n},W=function(n,t){var e,r,i,o={};if(n&&(i=n.length))for(e=0;e<i;e++)r=n[e],o[t&&r?r[t]:r]=t?r:(0|o[r])+1;return o},X=Object.keys||function(n,t,e){t=[];for(e in n)B(n,e)&&t.push(e);return t},Y={config:function(n,t){return t=E,n&&(t=u(n)?R(t,n):t[n]),t},boot:function(n){R(E,n),o(E.ini,function(t){R(E,t),R(E,n),o(E.exts,function(){Zn.on("changed",Wn),sn.on("changed",Wn),En()})})},toMap:W,toTry:N,toUrl:G,parseUrl:_,mix:R,has:B,keys:X,inside:Z,node:L,applyStyle:F,guid:H,Cache:z},nn="on",tn={fire:function(n,t,e,r){var i,o,f,a,u=I+n,c=this,s=c[u];if(t||(t={}),t.type||(t.type=n),s)for(i=s.length,o=i-1;i--;)f=r?i:o-i,a=s[f],a.f?(a.x=1,N(a.f,t,c),a.x=d):a.x||(s.splice(f,1),o--);s=c[nn+n],s&&N(s,t,c),e&&c.off(n)},on:function(n,t){var e=this,r=I+n,i=e[r]||(e[r]=[]);i.push({f:t})},off:function(n,t){var e,r,i=I+n,o=this,f=o[i];if(t){if(f)for(e=f.length;e--;)if(r=f[e],r.f==t){r.f=d;break}}else delete o[i],delete o[nn+n]}};Y.Event=tn;var en={},rn={},on={},fn=0,an=function(n,t,e){var r=n.$os;if(r)for(var i=r.length-1;i>-1;i--){var o=r[i];if(e=B(t,o))break}return e},un=function(n){n=(n+"").split(",");for(var t,e=0;e<n.length;e++)t=n[e],B(rn,t)?rn[t]++:rn[t]=1;return n},cn=function(n){for(var t,e,r=0;r<n.length;r++)t=n[r],B(rn,t)&&(e=--rn[t],e||(delete rn[t],delete en[t]))},sn=R({get:function(n){var t=n?en[n]:en;return t},set:function(n){fn=P(n,en,on)||fn;return this},has:function(n){return B(en,n)},digest:function(n){n&&sn.set(n),fn&&(this.fire("changed",{keys:on}),fn=0,on={})},clean:function(n){return{ctor:function(){var t=this;n=un(n),t.on("destroy",function(){cn(n)})}}}},tn);Y.State=sn;var $n,hn,vn,ln,pn,dn,mn,gn=r.isFunction,yn="/",wn="path",bn="view",xn="params",kn=new z,Vn=new z,qn=b.location,In=0,jn={query:{},params:{},href:d},An=/(?:^.*\/\/[^\/]+|#.*$)/gi,Tn=/^[^#]*#?!?/,Sn=function(n,t){return t=this[xn],t[n]||d},Un=V+"!",Hn=function(n,t){n=Un+n,t?qn.replace(n):qn.hash=n},On=function(n,t,e,r,i,o){n=G(n,t,o),n!=e.srcHash&&(In=i,Hn(n,r))},En=function(){var n,t,e=Mn().srcHash;l(b,"hashchange",function(r,i,o){t||(i=Mn(),n=i.srcHash,n!=e&&(o=function(){r.p=1,e=n,t=d,Hn(n),Pn()},r={reject:function(){r.p=1,t=d,Hn(e)},resolve:o,prevent:function(){t=1}},Zn.fire("change",r),t||r.p||o()))}),b.onbeforeunload=function(n){n=n||b.event;var t={};if(Zn.fire("pageunload",t),t.msg)return n&&(n.returnValue=t.msg),t.msg},Pn()},Cn=function(n,t){if(vn||(vn=E.routes||{},ln=E.unmatchView,dn=E.defaultView,mn=E.defaultPath||yn,pn=gn(vn),pn||vn[mn]||(vn[mn]=dn)),!n[bn]){var e=n.hash[wn]||hn&&n.query[wn]||mn;t=pn?vn.call(E,e,n):vn[e]||ln||dn,n[wn]=e,n[bn]=t}},Ln=function(n,t){var e=n.href,r=t.href,i=e+I+r,o=Vn.get(i);if(!o){var f,a,u,c;o={force:!e},o[xn]=c={};var s,$,h=n[xn],v=t[xn],l=[wn,bn].concat(X(h),X(v));for(s=l.length-1;s>=0;s--)$=l[s],1==s&&(h=n,v=t,c=o),a=h[$],u=v[$],a!=u&&(c[$]={from:a,to:u},f=1);Vn.set(i,o={a:f,b:o})}return o},Mn=function(n){n=n||qn.href;var t,e,r,i,o,f=kn.get(n);return f||(t=n.replace(An,d),e=n.replace(Tn,d),r=_(t),i=_(e),o=R({},r[xn]),R(o,i[xn]),f={get:Sn,href:n,srcQuery:t,srcHash:e,query:r,hash:i,params:o},Cn(f),kn.set(n,f)),f},Pn=function(){var n=Mn(),t=Ln(jn,jn=n);return!In&&t.a&&Zn.fire("changed",$n=t.b),In=0,$n},Zn=R({parse:Mn,diff:Pn,to:function(n,t,e,r){!t&&u(n)&&(t=n,n=d);var i=_(n),o=i[xn],f=i[wn],a=jn[wn],c=jn[xn],s=jn.query[xn];if(R(o,t),f){if(!hn)for(a in s)B(o,a)||(o[a]=d)}else c&&(f=a,o=R(R({},c),o));On(f,o,jn,e,r,s)}},tn);Y.Router=Zn;var Rn,Fn,Nn,Bn=function(n,t,e){n.$d||n.$h||n.$cc!=n.$rc||(n.$cr||(n.$cr=1,n.$ca=0,n.fire("created")),t=n.id,e=Jn[n.pId],e&&!B(e.$r,t)&&(e.$r[t]=1,e.$rc++,Bn(e)))},Dn=function(n,t,e,r){!n.$ca&&n.$cr&&(n.$cr=0,n.$ca=1,n.fire("alter",t),e=n.id,r=Jn[n.pId],r&&B(r.$r,e)&&(r.$rc--,delete r.$r[e],Dn(r,t)))},zn=function(n,t){return Rn||(e=x.body,n=E.rootId,t=L(n),t||(e.id=n),Rn=new Xn(n)),Rn},Jn={},Kn=function(n,t){B(Jn,n)||(Jn[n]=t,Xn.fire("add",{vframe:t}),n=L(n),n&&(n.vframe=t))},Qn=function(n,t,e){for(t=n.$il;t.length;)e=t.shift(),e.r||n.invoke(e.n,e.a),delete t[e.k]},_n=function(n,t,e){e=Jn[n],e&&(delete Jn[n],Xn.fire("remove",{vframe:e,fcc:t}),n=L(n),n&&(n.vframe=w))},Gn=function(n,t,e){if(n&&n.$g!=Nn&&(e=n.$v)&&e.$s>0){var r=t?an(e,t):Et(e);r&&e.render();for(var i=n.children(),o=i.length,f=0;f<o;)Gn(Jn[i[f++]],t)}},Wn=function(n){var t,e=zn();(t=n.view)?e.mountView(t.to):(Nn=p++,Gn(e,n.keys))},Xn=function(n,t,e){e=this,e.id=n,e.$c={},e.$cc=0,e.$rc=0,e.$s=1,e.$r={},e.$il=[],e.pId=t,Kn(n,e)};R(Xn,R({all:function(){return Jn},get:function(n){return Jn[n]}},tn)),R(R(Xn[A],tn),{mountView:function(n,t){var e,r,i,f=this,a=f.id,u=L(a);if(!f.$a&&u&&(f.$a=1,f.$t=u.innerHTML),f.unmountView(),f.$d=0,u&&n){f.path=n,e=_(n),i=e.path,r=++f.$s;var c,s,$=e.params,h=f.pId,v=Jn[h];if(v=v&&v.$v,v=v&&v.updater,v&&n.indexOf(I)>0)for(c in $)s=$[c],s.charAt(0)==I&&($[c]=v.get(s));R($,t),o(i,function(n){if(r==f.$s){if(!n)return E.error(Error("id:"+a+" cannot load:"+i));Ht(n),i=new n({owner:f,id:a},$),f.$v=i,f.$g=Nn,Tt(i),i.init($),i.render(),i.$t||i.$p||i.endUpdate()}})}},unmountView:function(){var n,t,e=this,r=e.$v;e.$il=[],r&&(Fn||(t=1,Fn={id:e.id}),e.$d=1,e.unmountZone(0,1),Dn(e,Fn),e.$v=0,r.$s>0&&(r.$s=0,r.fire("destroy",0,1,1),It(r,1),Tt(r,1)),r.$s--,r.owner=w,n=L(e.id),n&&e.$a&&s(n,e.$t),t&&(Fn=0)),e.$s++},mountVframe:function(n,t,e){var r,i=this;return Dn(i,{id:n}),r=Jn[n],r||(B(i.$c,n)||(i.$cl=d,i.$cc++),i.$c[n]=n,r=new Xn(n,i.id)),r.mountView(t,e),r},mountZone:function(n,t){var e,i,o,f=this,a=[];n=n||f.id;var u=r(V+n+" [mx-view]");for(f.$h=1,e=0;e<u.length;e++)i=u[e],o=i.id||(i.id=H()),i.$m||(i.$m=1,a.push([o,i.getAttribute("mx-view")]));for(;a.length;)i=a.shift(),o=i[0],a[o]?E.error(Error("vf.id duplicate:"+o+" at "+f.path)):f.mountVframe(a[o]=o,i[1],t);f.$h=0,Bn(f)},unmountVframe:function(n,t){var e,r,i,o=this;n=n?o.$c[n]:o.id,e=Jn[n],e&&(r=e.$cr,i=e.pId,e.unmountView(),_n(n,r),e.id=e.pId=d,e=Jn[i],e&&B(e.$c,n)&&(delete e.$c[n],e.$cl=d,e.$cc--,t||Bn(e)))},unmountZone:function(n,t){var e,r=this,i=r.$c;for(e in i)(!n||e!=n&&Z(e,n))&&r.unmountVframe(e,1);t||Bn(r)},parent:function(n,t){for(t=this,n=n>>>0||1;t&&n--;)t=Jn[t.pId];return t},children:function(n){return n=this,n.$cl||(n.$cl=X(n.$c))},invoke:function(n,t){var e,r,i,o,f,a=this,u=a.$il;return(r=a.$v)&&r.$p?e=(i=r[n])&&N(i,t,r):(o=u[f=I+n],o&&(o.r=t==o.a),o={n:n,a:t,k:f},u.push(o),u[f]=o),e}}),Y.Vframe=Xn,r.fn.invokeView=function(){var n,t=this.prop("vframe");return t&&(n=t.invoke.apply(t,arguments)),n};var Yn="mx-",nt=new z(30,10),tt=/(?:([\w\-]+)\u001e)?([^\(]+)\(([\s\S]*)?\)/,et={},rt={},it=function(n,t){var r,i,o,f,a,u,c,s=[],$=n,v=n.getAttribute(Yn+t),l=[];if(v&&(a=nt.get(v),a||(a=v.match(tt)||m,a={v:a[1],n:a[2],i:a[3]},a.p=a.i&&N(Function("return "+a.i)),nt.set(v,a)),s.push(a={r:v,v:a.v,p:a.p,n:a.n})),a&&!a.v||rt[t]){if(c=n.$v,!c)for(l.push($);$!=e&&($=$.parentNode);){if(Jn[i=$.id]||(i=$.$v)){c=i;break}l.push($)}if(c){for(;v=l.pop();)v.$v=c;do if(r=Jn[c],u=r.$v){o=u.$so,f=o[t];for(i in f)h(n,i)&&s.push({r:i,v:c,n:i});if(u.$t){a&&!a.v&&(a.v=c);break}}while(c=r.pId)}}return s},ot=function(n){for(var t,r,i,o,f,a,u,c=n.target,s=n.type,$=[];c!=e&&1==c.nodeType;){if(r=it(c,s),r.length)for($=[];t=r.shift();){if(!t.v)return E.error(Error("bad "+s+":"+t.r));o=Jn[t.v],f=o&&o.$v,a=t.n+I+s,u=f[a],u&&(n.eventTarget=c,n.params=t.p||{},N(u,n,f))}if((i=c.$)&&i[s]||n.isPropagationStopped())break;$.push(c),c=c.parentNode||e}for(;c=$.pop();)i=c.$||(c.$={}),i[s]=1},ft=function(n,t,r){var i=0|et[n],o=r?-1:1;i&&r!==i||l(e,n,ot,r),et[n]=i+o,t&&(rt[n]=(0|rt[n])+o)},at=/\\|'/g,ut=/\r|\n/g,ct=/<%([@=!])?([\s\S]+?)%>|$/g,st=function(n){var t=0,e="$p+='";return n.replace(ct,function(r,i,o,f){return e+=n.slice(t,f).replace(at,"\\$&").replace(ut,"\\n"),t=f+r.length,"@"==i?e+="'\n$s=$i();$p+=$s;$$[$s]="+o+";$p+='":"="==i?e+="'+$e("+o+")+'":"!"==i?e+="'+"+o+"+'":o&&(e+="';"+o+"\n$p+='"),r}),e+="';",e="var $t,$p='',$em={'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\\'':'&#x27;','`':'&#x60;'},$er=/[&<>\"'`]/g,$ef=function(m){return $em[m]},$e=function(v){return (''+v).replace($er,$ef)},$i=function(){return '"+I+"'+$g++},$s,$eum={'!':'%21','\\'':'%27','(':'%28',')':'%29','*':'%2A'},$euf=function(m){return $eum[m]},$eur=/[!')(*]/g,$eu=function(v){return encodeURIComponent(v).replace($eur,$euf)},$eqr=/[\\\\'\"]/g,$eq=function(v){return (''+v).replace($eqr,'\\\\$&')};"+e+"return $p",Function("$g","$$",e)},$t=new z,ht=function(n,t){var e=$t.get(n);return e||(e=st(n),$t.set(n,e)),e(1,t)},vt=/\d+\u001d/g,lt=/([\w\-:]+)(?:=(["'])([\s\S]*?)\2)?/g,pt={amp:"&",lt:"<",gt:">",quot:'"',"#x27":"'","#x60":"`"},dt=/&([^;]+?);/g,mt=function(n,t){return pt[t]||n},gt=function(n,t,e,r,i,o,f){var a,u,c,s=n.id||(n.id=H());if(i){var $=Vt(ht(e.attr,r),f),h={};$.replace(lt,function(n,t,e,r){h[t]=r});for(var v,l,p,d,m,g=e.attrs.length-1;g>=0;g--)v=e.attrs[g],l=v.n,m=v.f,v.v?(a=1,u=h[l]):(p=v.p?n[m||l]:n.getAttribute(l),d=v.b?B(h,l):h[l]||"",p!=d&&(v.p?(v.q&&(d=d.replace(dt,mt)),n[m||l]=d):d?n.setAttribute(l,d):n.removeAttribute(l)))}a&&(c=Jn[s],c&&c[u?"unmountView":"unmountVframe"]()),o&&t.setHTML(s,ht(e.tmpl,r)),a&&u&&t.owner.mountVframe(s,u)},yt=function(n,t,e){var i,o=n.$i,f=Jn[o],a=f&&f.$v;if(a&&(i=a.tmpl)){var u=i.html,c=i.subs;if(n.$rd&&t)for(var s,$,h,v,l,p,d,m,g=c.length-1;g>=0;g--){if(h=0,v=0,$=c[g],l=1,d=$.mask,s=$.pKeys)for(p=s.length;--p>=0;)if(B(t,s[p])){l=0;break}if(l){for(s=$.keys,p=s.length,l=0;--p>=0;)if(B(t,s[p])){if(l=1,!d||h&&v){h=$.tmpl,v=$.attr;break}m=d.charAt(p),h=h||1&m,v=v||2&m}if(l){var y=r(Vt($.path,o));for(p=0;p<y.length;)gt(y[p++],a,$,e,v,h,o,f)}}}else{var w,b,x=function(n){return w[n].tmpl};if(c){if(!c.$)for(c.$=w={},b=c.length;b>0;){var k=c[--b];k.s&&(w[k.s]=k,k.tmpl=k.tmpl.replace(vt,x),delete k.s)}w=c.$}n.$rd=1;var V=u.replace(vt,x);a.setHTML(n.$t,ht(V,e))}}},wt=function(n){var t=this;t.$i=n,t.$t=n,t.$data={},t.$keys={}},bt=wt.prototype;R(bt,{to:function(n,t){return t=this,t.$t=n,t},get:function(n){var t=this.$data;return n&&(t=t[n]),t},gain:function(n){for(var t,e=this.$data,r=n.split(".");e&&r.length;)t=r.shift(),e=e[t];return e},set:function(n){var t=this,e=t.$data,r=t.$keys;return P(n,e,r),t},digest:function(n){var t=this;n&&t.set(n),n=t.$data;var e=t.$keys;return t.$keys={},yt(t,e,n),t},snapshot:function(){var n=this;return n.$ss=q(n.$data),n},altered:function(){var n=this;if(n.$ss)return n.$ss!=q(n.$data)}});var xt=/^(\$?)([^<]+?)<([^>]+)>$/,kt=/\u001f/g,Vt=function(n,t){return(n+d).replace(kt,t||this.id)},qt=function(n,t,e){return n.$l?e=n:(e=function(n){N(e.$l,n,this)},e.$l=[n],e.$m=1),e.$l=e.$l.concat(t.$l||t),e},It=function(n,t){var e,r,i=n.$r;for(e in i)r=i[e],(t||r.x)&&jt(i,e,1)},jt=function(n,t,e,r){var i,o,f=n[t];return f&&f!=r&&(o=f.e,i=o.destroy,i&&e&&N(i,m,o),delete n[t]),o},At=function(n,t,e){t=n.render,n.render=function(){e=this,e.$s>0&&(e.$s++,e.fire("rendercall"),It(e),N(t,g.call(arguments),e))}},Tt=function(n,t){var e,r,i=n.$eo,o=n.$so;for(e in i)ft(e,o[e],t);for(i=n.$el,e=i.length;e--;)r=i[e],l(r.e,r.n,v,t,{i:n.id,v:n,f:r.f,e:r.e})},St=[],Ut={win:b,doc:x},Ht=function(n){if(!n[I]){n[I]=1;var t,e,r,i,o,f,a,u,c,s=n[A],$={},h=[],v={};for(a in s)if(t=s[a],e=a.match(xt))for(f=e[1],r=e[2],i=e[3].split(y);u=i.pop();){if(o=Ut[r],c=1,f){if(o){h.push({f:t,e:o,n:u});continue}c=2,o=v[u],o||(o=v[u]={}),o[r]=1}$[u]=$[u]|c,u=r+I+u,o=s[u],o?o.$m&&(t.$m?s[u]=qt(o,t):B(s,a)&&(s[u]=t)):s[u]=t}At(s),s.$eo=$,s.$el=h,s.$so=v,s.$t=!!s.tmpl}},Ot=function(n,t,e){for(var r=0;r<n.length&&!(e=B(t,n[r]));r++);return e},Et=function(n){var t,e=n.$l;return e.f&&(e.p&&(t=$n[wn]),t||(t=Ot(e.k,$n[xn]))),t},Ct=function(n,t){t=this,R(t,n),t.$l={k:[]},t.$r={},t.$s=1,t.updater=new wt(t.id),N(St,n,t)},Lt=Ct[A];R(Ct,{merge:function(n,t){t=n&&n.ctor,t&&St.push(t),R(Lt,n)},extend:function(n,t){var e=this;n=n||{};var r=n.ctor,i=[];r&&i.push(r);var o=function(n,t){e.call(this,n,t),N(i,t,this)},f=n.mixins;if(f){for(var u,c,s,$,h=f.length,v=0,l={};v<h;){u=f[v++];for(c in u)s=u[c],$=l[c],"ctor"==c?i.push(s):xt.test(c)?($?s=qt($,s):s.$m=1,l[c]=s):l[c]=s}n=R(l,n)}return o.extend=e.extend,a(o,e,n,t)}}),R(R(Lt,tn),{render:i,init:i,wrapEvent:Vt,beginUpdate:function(n,t){t=this,t.$s>0&&t.$p&&(t.owner.unmountZone(n,1),t.fire("prerender",{id:n}))},endUpdate:function(n,t,e,r){t=this,t.$s>0&&(n=n||t.id,t.fire("rendered",{id:n}),r=t.$p,t.$p=1,e=t.owner,e.mountZone(n),r||setTimeout(t.wrapAsync(function(){Qn(e)}),0))},wrapAsync:function(n,t){var e=this,r=e.$s;return function(){r>0&&r==e.$s&&n&&n.apply(t||e,arguments)}},observeLocation:function(n,t){var e,r=this;e=r.$l,e.f=1,u(n)&&(t=n.path,n=n.params),e.p=t,n&&(e.k=(n+d).split(y))},observeState:function(n){this.$os=(n+d).split(y)},capture:function(n,t,e,r,i){return r=this.$r,t?(jt(r,n,1,t),i={e:t,x:e},r[n]=i):(i=r[n],t=i&&i.e||t),t},release:function(n,t){return jt(this.$r,n,t)},leaveTip:function(n,t){var e=this,r=function(i){var o="a",f="b";"change"!=i.type&&(o="b",f="a"),r[o]?(i.prevent(),i.reject()):t()?(i.prevent(),r[f]=1,e.leaveConfirm(n,function(){r[f]=0,i.resolve()},function(){r[f]=0,i.reject()})):i.resolve()},i=function(e){t()&&(e.msg=n)};Zn.on("change",r),Zn.on("pageunload",i),e.on("unload",r),e.on("destroy",function(){Zn.off("change",r),Zn.off("pageunload",i)})},setHTML:function(n,t){var e,r=this;r.beginUpdate(n),r.$s>0&&(e=L(n),e&&s(e,Vt(t,r.id))),r.endUpdate(n)}}),Y.View=Ct;var Mt=r.type,Pt=r.proxy,Zt=r.now||Date.now,Rt=function(){this.id=H("b"),this.$={}};R(Rt[A],{get:function(n,t,e){var r=this,i=arguments.length,o=i>=2,f=r.$,a=f;if(i){for(var u,s=c(n)?g.call(n):(n+d).split(".");(u=s.shift())&&a;)a=a[u];u&&(a=e)}var $;return o&&($=Mt(t))!=Mt(a)&&(a=t),a},set:function(n,t){var e,r=this;u(n)||(e={},e[n]=t,n=e),R(r.$,n)}});var Ft=1,Nt=2,Bt=function(n,t,e){e=this[n],e&&(delete this[n],N(e,t,e.e))},Dt=function(n,t,e,r,i,o){var f=[],a=w,u=0;return function(c,s){var $,h=this;u++;var v=h.$m,l=v.k;f[c+1]=h;var p={bag:h,error:s};if(s)a=s,t.fire("fail",p),$=1;else if(!o.has(l)){l&&o.set(l,h),v.t=Zt();var d=v.a;d&&N(d,h,h),v.x&&t.clear(v.x),t.fire("done",p),$=1}if(!e.$o){var m=u==r;m&&(e.$b=0,i==Nt&&(f[0]=a,N(n,f,e))),i==Ft&&N(n,[s?s:w,h,m,c],e)}$&&t.fire("end",p)}},zt=function(n,t,e,r,i){if(n.$o)return n;if(n.$b)return n.enqueue(function(){zt(this,t,e,r,i)});n.$b=1;var o=n.constructor,f=o.$r;c(t)||(t=[t]);for(var a,u=t.length,s=Dt(e,o,n,u,r,o.$c),$=0;$<u;$++)if(a=t[$]){var h,v=o.get(a,i),l=v.e,p=l.$m.k,d=Pt(s,l,$);p&&f[p]?f[p].push(d):v.u?(p&&(h=[d],h.e=l,f[p]=h,d=Pt(Bt,f,p)),o.$s(l,d)):d()}return n},Jt=function(){var n=this;n.id=H("s"),n.$q=[]};R(Jt[A],{all:function(n,t){return zt(this,n,t,Nt)},save:function(n,t){return zt(this,n,t,Nt,1)},one:function(n,t){return zt(this,n,t,Ft)},enqueue:function(n){var t=this;return t.$o||(t.$q.push(n),t.dequeue(t.$a)),t},dequeue:function(){var n=this,t=g.call(arguments);n.$b||n.$o||(n.$b=1,setTimeout(function(){if(n.$b=0,!n.$o){var e=n.$q.shift();e&&N(e,n.$a=t,n)}},0))},destroy:function(n){n=this,n.$o=1,n.$q=0}});var Kt=function(n,t,e){return e=[q(t),q(n)],e.join(I)},Qt=function(n,t,e,r){r=n&&n.$m,r&&t[r.n]&&e.del(r.k)},_t=R({add:function(n){var t=this,e=t.$m;c(n)||(n=[n]);for(var r,i,o=n.length-1;o>-1;o--)r=n[o],r&&(i=r.name,r.cache=0|r.cache,e[i]=r)},create:function(n){var t=this,e=t.meta(n),r=0|n.cache||e.cache,i=new Rt;i.set(e),i.$m={n:e.name,a:e.after,x:e.cleans,k:r&&Kt(e,n)},u(n)&&i.set(n);var o=e.before;return o&&N(o,i,i),t.fire("begin",{bag:i}),i},meta:function(n){var t=this,e=t.$m,r=n.name||n,i=e[r];return i||n},get:function(n,t){var e,r,i=this;return t||(e=i.cached(n)),e||(e=i.create(n),r=1),{e:e,u:r}},clear:function(n){this.$c.each(Qt,W((n+d).split(y)))},cached:function(n){var t,e,r=this,i=r.$c,o=r.meta(n),f=0|n.cache||o.cache;if(f&&(e=Kt(o,n)),e){var a=r.$r,u=a[e];u?t=u.e:(t=i.get(e),t&&Zt()-t.$m.t>f&&(i.del(e),t=0))}return t}},tn);Jt.extend=function(n,t,e){var r=this,i=function(){r.call(this)};return i.$s=n,i.$c=new z(t,e),i.$r={},i.$m={},a(i,r,w,_t)},Y.Service=Jt;var Gt=function(n,t){var e=this,r=n&&n.ctor,i=function(){var n=this,t=arguments;e.apply(n,t),r&&r.apply(n,t)};return i.extend=Gt,a(i,e,n,t)};return R(i[A],tn),i.extend=Gt,Y.Base=i,Y});
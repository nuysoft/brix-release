/*
    一个请求send后，应该取消吗？
    参见xmlhttprequest的实现
        https://chromium.googlesource.com/chromium/blink/+/master/Source/core
        https://chromium.googlesource.com/chromium/blink/+/master/Source/core/xmlhttprequest/XMLHttpService.cpp
    当请求发出，服务器接受到之前取消才有用，否则连接已经建立，数据开始传递，中止只会浪费。
    但我们很难在合适的时间点abort，而且像jsonp的，我们根本无法abort掉，只能任数据返回

    然后我们在自已的代码中再去判断、决定回调是否调用

    那我们是否可以这样做：
        1. 不取消请求
        2. 请求返回后尽可能的处理保留数据，比如缓存。处理完成后才去决定是否调用回调（Service_Send中的Done实现）

    除此之外，我们还要考虑
        1. 跨请求对象对同一个缓存的接口进行请求，而某一个销毁了。
            Service.add([{
                name:'Test',
                url:'/test',
                cache:20000
            }]);

            var r1=new Service();
            r1.all('Test',function(e,m){

            });

            var r2=new Service();
            r2.all('Test',function(e,m){

            });

            r1.destroy();

            如上代码，我们在实现时：
            r2在请求Test时，此时Test是可缓存的，并且Test已经处于r1请求中了，我们不应该再次发起新的请求，只需要把回调排队到r1的Test请求中即可。参见代码：Service_Send中的for,Service.cached。

            当r1进行销毁时，并不能贸然销毁r1上的所有请求，如Test请求不能销毁，只能从回调中标识r1的回调不能再被调用。r1的Test还要继续，参考上面讨论的请求应该取消吗。就算能取消，也需要查看Test的请求中，除了r1外是否还有别的请求要用，我们示例中是r2，所以仍然继续请求。参考Service#.destroy


 */
/**
 * Bag类
 * @name Bag
 * @beta
 * @module service
 * @constructor
 * @property {String} id bag唯一标识
 */

var Bag = function() {
    this.id = G_Id('b');
    this.$ = {};
};
G_Mix(Bag[G_PROTOTYPE], {
    /**
     * @lends Bag#
     */
    /**
     * 获取属性
     * @param {String} [key] 要获取数据的key
     * @param {Object} [dValue] 当根据key取到的值为falsy时，使用默认值替代，防止代码出错
     * @return {Object}
     * @example
     * new Serice().one({
     *     name:'Test'
     * },function(error,bag){
     *     var obj=bag.get();//获取所有数据
     *
     *     var list=bag.get('list',[]);//获取list数据，如果不存在list则使用空数组
     *
     *     var count=bag.get('data.info.count',0);//获取data下面info下count的值，您无须关心data下是否有info属性
     *     console.log(list);
     * });
     */
    get: function(key, dValue, udfd) {
        var me = this;
        //var alen = arguments.length;
        /*
            目前只处理了key中不包含.的情况，如果key中包含.则下面的简单的通过split('.')的方案就不行了，需要改为：

            var reg=/[^\[\]]+(?=\])|[^.\[\]]+/g;
            var a=['a.b.c','a[b.c].d','a[0][2].e','a[b.c.d][eg].a.b.c','[e.g.d]','a.b[c.d.fff]'];

            for(var i=0,one;i<a.length;i++){
              one=a[i];
              console.log(one.match(reg))
            }

            但考虑到key中有.的情况非常少，则优先使用性能较高的方案

            或者key本身就是数组
         */
        var hasDValue = dValue != udfd;
        var $attrs = me.$;
        var attrs = $attrs;
        if (key) {
            var tks = G_IsArray(key) ? G_Slice.call(key) : (key + G_EMPTY).split('.'),
                tk;
            while ((tk = tks.shift()) && attrs) {
                attrs = attrs[tk];
            }
            if (tk) {
                attrs = udfd;
            }
        }
        var type;
        if (hasDValue && (type = G_Type(dValue)) != G_Type(attrs)) {
            if (DEBUG) {
                Magix_Cfg.error(Error('type neq:' + key + ' is not a(n) ' + type));
            }
            attrs = dValue;
        }
        if (DEBUG && me.$m && me.$m.k) { //缓存中的接口不让修改数据
            attrs = Safeguard(attrs);
        }
        return attrs;
    },
    /**
     * 设置属性
     * @param {String|Object} key 属性对象或属性key
     * @param {Object} [val] 属性值
     */
    set: function(key, val) {
        var me = this,
            t;
        if (!G_IsObject(key)) {
            t = {};
            t[key] = val;
            key = t;
        }
        G_Mix(me.$, key);
    }
});
var Service_FetchFlags_ONE = 1;
var Service_FetchFlags_ALL = 2;
var Service_CacheDone = function(cacheKey, err, fns) {
    fns = this[cacheKey]; //取出当前的缓存信息
    if (fns) {
        delete this[cacheKey]; //先删除掉信息
        G_ToTry(fns, err, fns.e); //执行所有的回调
    }
};
var Service_Task = function(done, host, service, total, flag, bagCache) {
    var doneArr = [];
    var errorArgs = G_NULL;
    var currentDoneCount = 0;

    return function(idx, err) {
        var bag = this;
        var newBag;
        currentDoneCount++; //当前完成加1
        var mm = bag.$m;
        var cacheKey = mm.k;
        doneArr[idx + 1] = bag; //完成的bag
        var dispach = {
            bag: bag,
            error: err
        };
        if (err) { //出错
            errorArgs = err;
            //errorArgs[idx] = err; //记录相应下标的错误信息
            //G_Mix(errorArgs, err);
            host.fire('fail', dispach);
            newBag = 1; //标记当前是一个新完成的bag,尽管出错了
        } else if (!bagCache.has(cacheKey)) { //如果缓存对象中不存在，则处理。注意在开始请求时，缓存与非缓存的都会调用当前函数，所以需要在该函数内部做判断处理
            if (cacheKey) { //需要缓存
                bagCache.set(cacheKey, bag); //缓存
            }
            //bag.set(data);
            mm.t = G_Now(); //记录当前完成的时间
            var after = mm.a;
            if (after) { //有after
                G_ToTry(after, bag, bag);
            }
            if (mm.x) { //需要清理
                host.clear(mm.x);
            }
            host.fire('done', dispach);
            newBag = 1;
        }
        if (!service.$o) { //service.$o 当前请求被销毁
            var finish = currentDoneCount == total;
            if (finish) {
                service.$b = 0;
                if (flag == Service_FetchFlags_ALL) { //all
                    doneArr[0] = errorArgs;
                    G_ToTry(done, doneArr, service);
                }
            }
            if (flag == Service_FetchFlags_ONE) { //如果是其中一个成功，则每次成功回调一次
                G_ToTry(done, [err ? err : G_NULL, bag, finish, idx], service);
            }
        }
        if (newBag) { //不管当前request或回调是否销毁，均派发end事件，就像前面缓存一样，尽量让请求处理完成，该缓存的缓存，该派发事件派发事件。
            host.fire('end', dispach);
        }
    };
};
/**
 * 获取attrs，该用缓存的用缓存，该发起请求的请求
 * @private
 * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',urlParams:{a:'12'},formParams:{b:2}}
 * @param {Function} done   完成时的回调
 * @param {Integer} flag   获取哪种类型的attrs
 * @param {Boolean} save 是否是保存的动作
 * @return {Service}
 */
var Service_Send = function(me, attrs, done, flag, save) {
    if (me.$o) return me; //如果已销毁，返回
    if (me.$b) { //繁忙，后续请求入队
        return me.enqueue(function() {
            Service_Send(this, attrs, done, flag, save);
        });
    }
    me.$b = 1; //标志繁忙
    var host = me.constructor;
    //var bagCache = host.$c; //存放bag的Cache对象
    var bagCacheKeys = host.$r; //可缓存的bag key

    if (!G_IsArray(attrs)) {
        attrs = [attrs];
    }
    var total = attrs.length;
    var remoteComplete = Service_Task(done, host, me, total, flag, host.$c);
    /*#if(modules.serviceCombine){#*/
    var combineBags = [],
        combineCbs = [];
    /*#}#*/
    for (var i = 0, bag; i < total; i++) {
        bag = attrs[i];
        if (bag) {
            var bagInfo = host.get(bag, save); //获取bag信息

            var bagEntity = bagInfo.e;
            var cacheKey = bagEntity.$m.k; //从实体上获取缓存key

            var complete = G_Proxy(remoteComplete, bagEntity, i); //包装当前的完成回调
            var cacheList;

            if (cacheKey && bagCacheKeys[cacheKey]) { //如果需要缓存，并且请求已发出
                bagCacheKeys[cacheKey].push(complete); //放到队列中
            } else if (bagInfo.u) { //需要更新
                if (cacheKey) { //需要缓存
                    cacheList = [complete];
                    cacheList.e = bagEntity;
                    bagCacheKeys[cacheKey] = cacheList;
                    complete = G_Proxy(Service_CacheDone, bagCacheKeys, cacheKey); //替换回调，详见Service_CacheDone
                }
                /*#if(modules.serviceCombine){#*/
                combineBags.push(bagEntity);
                combineCbs.push(complete);
                /*#}else{#*/
                host.$s(bagEntity, complete);
                /*#}#*/
            } else { //不需要更新时，直接回调
                complete();
            }
        }
    }
    /*#if(modules.serviceCombine){#*/
    if (combineBags.length) {
        var tempBag = new Bag();
        tempBag.set('bags', combineBags);
        tempBag._cbs = combineCbs;
        host.$s(tempBag, function() {
            var list = tempBag._cbs;
            for (var i = 0; i < list.length; i++) {
                list[i]();
            }
        });
    }
    /*#}#*/
    return me;
};
/**
 * 接口请求服务类
 * @name Service
 * @constructor
 * @beta
 * @module service
 * @borrows Event.on as on
 * @borrows Event.fire as fire
 * @borrows Event.off as off
 * @example
 * var S = Magix.Service.extend(function(bag,callback){
 *     $.ajax({
 *         url:bag.get('url'),
 *         success:function(data){
 *             bag.set('data',data)//设置数据
 *             callback();//通知内部完成数据请求
 *         },
 *         error:function(msg){
 *             callback(msg);//出错
 *         }
 *     })
 * });
 * // 添加接口
 * S.add({
 *     name:'test',
 *     url:'/test',
 *     cache:1000*60 //缓存一分钟
 * });
 * // 使用接口
 * var s=new S();
 * s.all('test',function(err,bag){
 *     console.log(err,bag);
 * });
 */
var Service = function() {
    var me = this;
    me.id = G_Id('s');
    if (DEBUG) {
        me.id = G_Id('\x1es');
        setTimeout(function() {
            if (!me.$c) {
                console.warn('beware! You should use view.capture to connect Service and View');
            }
        }, 1000);
    }
    me.$q = [];
};

G_Mix(Service[G_PROTOTYPE], {
    /**
     * @lends Service#
     */
    /**
     * 获取attrs，所有请求完成回调done
     * @function
     * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',cacheKey:'key',urlParams:{a:'12'},formParams:{b:2}}
     * @param {Function} done   完成时的回调
     * @return {Service}
     * @example
     * new Service().all([{
     *     name:'Test1'
     * },{
     *     name:'Test2'
     * }],function(err,bag1,bag2){
     *     console.log(arguments);
     * });
     */
    all: function(attrs, done) {
        return Service_Send(this, attrs, done, Service_FetchFlags_ALL);
    },
    /**
     * 保存attrs，所有请求完成回调done
     * @function
     * @param {Object|Array} attrs 保存attrs时的描述信息，如:{name:'Home',urlParams:{a:'12'},formParams:{b:2}}
     * @param {Function} done   完成时的回调
     * @return {Service}
     * @example
     * // 同all,但与all不同的是，当指定接口缓存时，all方法会优先使用缓存，而save方法则每次都会发送请求到服务器，忽略掉缓存。同时save更语义化
     */
    save: function(attrs, done) {
        return Service_Send(this, attrs, done, Service_FetchFlags_ALL, 1);
    },
    /**
     * 获取attrs，其中任意一个成功均立即回调，回调会被调用多次。注：当使用promise时，不存在该方法。
     * @function
     * @param {Object|Array} attrs 获取attrs时的描述信息，如:{name:'Home',cacheKey:'key',urlParams:{a:'12'},formParams:{b:2}}
     * @param {Function} callback   完成时的回调
     * @beta
     * @return {Service}
     * @example
     *  //代码片断：
     * var s = new Service().one([
     *     {name:'M1'},
     *     {name:'M2'},
     *     {name:'M3'}
     * ],function(err,bag){//m1,m2,m3，谁快先调用谁，且被调用三次
     *     if(err){
     *         alert(err.msg);
     *     }else{
     *         alert(bag.get('name'));
     *     }
     * });
     */
    one: function(attrs, done) {
        return Service_Send(this, attrs, done, Service_FetchFlags_ONE);
    },
    /**
     * 前一个all,one或save任务做完后的下一个任务
     * @param  {Function} callback 当前面的任务完成后调用该回调
     * @return {Service}
     * @beta
     * @example
     * var r = new Service().all([
     *     {name:'M1'},
     *     {name:'M2'}
     * ],function(err,bag1,bag2){
     *     r.dequeue(['args1','args2']);
     * });
     * r.enqueue(function(args1,args2){
     *     alert([args1,args2]);
     * });
     */
    enqueue: function(callback) {
        var me = this;
        if (!me.$o) {
            me.$q.push(callback);
            me.dequeue(me.$a);
        }
        return me;
    },
    /**
     * 做下一个任务
     * @param {Array} preArgs 传递的参数
     * @beta
     * @example
     * var r = new Service();
     * r.all('Name',function(e,bag){
     *     r.dequeue([e,bag]);
     * });
     * r.enqueue(function(e,result){//result为m
     *     r.all('NextName',function(e,bag){
     *         r.dequeue([e,bag]);
     *     });
     * });
     *
     * r.enqueue(function(e,bag){//m===queue m;
     *     console.log(e,bag);
     *     r.dequeue([e,bag]);
     * });
     *
     * r.enqueue(function(e,bag){
     *     console.log(e,bag);
     * });
     *
     * //当出错时，e为出错的信息
     */
    dequeue: function() {
        var me = this,
            a = G_Slice.call(arguments);
        if (!me.$b && !me.$o) {
            me.$b = 1;
            setTimeout(function() { //前面的任务可能从缓存中来，执行很快
                me.$b = 0;
                if (!me.$o) { //不清除setTimeout,但在回调中识别是否调用了destroy方法
                    var one = me.$q.shift();
                    if (one) {
                        G_ToTry(one, me.$a = a, me);
                    }
                }
            }, 0);
        }
    },
    /**
     * 销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调
     */
    destroy: function(me) {
        me = this;
        me.$o = 1; //只需要标记及清理即可，其它的不需要
        me.$q = 0;
    }
    /**
     * 当Service发送请求前触发
     * @name Service.begin
     * @event
     * @param {Object} e 事件对象
     * @param {Bag} e.bag bag对象
     * @example
     * var S = Magix.Service.extend({
     *     //codes
     * });
     *
     * S.on('begin',function(e){//监听所有的开始请求事件
     *     console.log(e);
     * });
     */
    /**
     * 当Service结束请求时触发(成功或失败均触发)
     * @name Service.end
     * @event
     * @param {Object} e 事件对象
     * @param {Bag} e.bag bag对象
     * @param {String} e.error 当请求出错时，error是出错的消息
     */
    /**
     * 当Service发送请求失败时触发
     * @name Service.fail
     * @event
     * @param {Object} e 事件对象
     * @param {Bag} e.bag bag对象
     * @param {String} e.error 当请求出错时，error是出错的消息
     */
    /**
     * 当Service发送请求成功时触发
     * @name Service.done
     * @event
     * @param {Object} e 事件对象
     * @param {Bag} e.bag bag对象
     */
});

var Manager_DefaultCacheKey = function(meta, attrs, arr) {
    arr = [JSONStringify(attrs), JSONStringify(meta)];
    return arr.join(G_SPLITER);
};
var Manager_ClearCache = function(v, ns, cache, mm) {
    mm = v && v.$m;
    if (mm && ns[mm.n]) {
        cache.del(mm.k);
    }
};
var Service_Manager = G_Mix({
    /**
     * @lends Service
     */
    /**
     * 添加元信息
     * @param {Object} attrs 信息属性
     */
    add: function(attrs) {
        var me = this;
        var metas = me.$m;
        if (!G_IsArray(attrs)) {
            attrs = [attrs];
        }
        for (var i = attrs.length, bag, name; i--;) {
            bag = attrs[i];
            if (bag) {
                name = bag.name;
                bag.cache = bag.cache | 0;
                metas[name] = bag;
            }
        }
    },
    /**
     * 创建bag对象
     * @param {Object} attrs           bag描述信息对象
     * @return {Bag}
     */
    create: function(attrs) {
        var me = this;
        var meta = me.meta(attrs);
        var cache = (attrs.cache | 0) || meta.cache;
        var entity = new Bag();
        entity.set(meta);
        entity.$m = {
            n: meta.name,
            a: meta.after,
            x: meta.cleans,
            k: cache && Manager_DefaultCacheKey(meta, attrs)
        };

        if (G_IsObject(attrs)) {
            entity.set(attrs);
        }
        var before = meta.before;
        if (before) {
            G_ToTry(before, entity, entity);
        }
        me.fire('begin', {
            bag: entity
        });
        return entity;
    },
    /**
     * 获取bag注册时的元信息
     * @param  {String|Object} attrs 名称
     * @return {Object}
     * @example
     * var S = Magix.Service.extend({
     *     //extend code
     * });
     *
     * S.add({
     *     name:'test',
     *     url:'/test'
     * });
     *
     * console.log(S.meta('test'),S.meta({name:'test'}));//这2种方式都可以拿到add时的对象信息
     */
    meta: function(attrs) {
        var me = this;
        var metas = me.$m;
        var name = attrs.name || attrs;
        var meta = metas[name];
        return meta || attrs;
    },
    /**
     * 获取bag对象，优先从缓存中获取
     * @param {Object} attrs           bag描述信息对象
     * @param {Boolean} createNew 是否是创建新的Bag对象，如果否，则尝试从缓存中获取
     * @return {Object}
     */
    get: function(attrs, createNew) {
        var me = this;
        var entity, update;
        if (!createNew) {
            entity = me.cached(attrs);
        }

        if (!entity) {
            entity = me.create(attrs);
            update = 1;
        }
        return {
            e: entity,
            u: update
        };
    },
    /**
     * 根据name清除缓存的attrs
     * @param  {String|Array} names 字符串或数组
     * @example
     * var S = Magix.Service.extend({
     *     //extend code
     * });
     *
     * S.add({
     *     name:'test',
     *     url:'/test',
     *     cache:1000*60
     * });
     *
     * var s = new Service();
     * s.all('test');
     * s.all('test');//from cache
     * S.clear('test');
     * s.all('test');//fetch from server
     */
    clear: function(names) {
        this.$c.each(Manager_ClearCache, G_ToMap((names + G_EMPTY).split(G_COMMA)));
    },
    /**
     * 从缓存中获取bag对象
     * @param  {Object} attrs
     * @return {Bag}
     * @example
     * var S = Magix.Service.extend({
     *     //extend code
     * });
     *
     * S.add({
     *     name:'test',
     *     url:'/test',
     *     cache:1000*60
     * });
     *
     * S.cached('test');//尝试从缓存中获取bag对象
     */
    cached: function(attrs) {
        var me = this;
        var bagCache = me.$c;
        var entity;
        var cacheKey;
        var meta = me.meta(attrs);
        var cache = (attrs.cache | 0) || meta.cache;

        if (cache) {
            cacheKey = Manager_DefaultCacheKey(meta, attrs);
        }

        if (cacheKey) {
            var requestCacheKeys = me.$r;
            var info = requestCacheKeys[cacheKey];
            if (info) { //处于请求队列中的
                entity = info.e;
            } else { //缓存
                entity = bagCache.get(cacheKey);
                if (entity && G_Now() - entity.$m.t > cache) {
                    bagCache.del(cacheKey);
                    entity = 0;
                }
            }
        }
        return entity;
    }
}, Event);
/**
 * 继承
 * @lends Service
 * @param  {Function} sync 接口服务同步数据方法
 * @param  {Integer} [cacheMax] 最大缓存数，默认20
 * @param  {Integer} [cacheBuffer] 缓存缓冲区大小，默认5
 * @return {Function} 返回新的接口类
 * @example
 * var S = Magix.Service.extend(function(bag,callback){
 *     $.ajax({
 *         url:bag.get('url'),
 *         success:function(data){
 *             bag.set('data',data);
 *             callback();
 *         },
 *         error:function(msg){
 *             callback({message:msg});
 *         }
 *     })
 * },10,2);//最大缓存10个接口数据，缓冲区2个
 */
Service.extend = function(sync, cacheMax, cacheBuffer) {
    var me = this;
    var NService = function() {
        me.call(this);
    };
    NService.$s = sync;
    NService.$c = new G_Cache(cacheMax, cacheBuffer);
    NService.$r = {};
    NService.$m = {};
    return G_Extend(NService, me, G_NULL, Service_Manager);
};
Magix.Service = Service;
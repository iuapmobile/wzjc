/*
 * SummerCore JavaScript Library
 * Copyright (c) 2016 yonyou.com
 */
//
//;(function(){
//
//    //方式1:打开一个新demo窗口,并加载appcan.cn页面
//    summer.openWin({
//        name:'demo',
//        url:'http://mobile.yyuap.com'
//    });
//    //方式2:打开一个新demo窗口,并加载appcan.cn页面
//    summer.window.openWin({
//        name:'demo',
//        url:'http://mobile.yyuap.com'
//    });
//    //方式3:require
//    var win = summer.require('window');
//    win.openWin({
//        name:'demo',
//        url:'http://mobile.yyuap.com'
//    });
//})(window);
//var __TEST = true;



// $summer
;(function(){
    var u = window.$summer || {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    u.os = (function(env){
        var browser={
            info:function(){
                var ua = navigator.userAgent, app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    //trident: ua.indexOf('Trident') > -1, //IE内核
                    //presto: ua.indexOf('Presto') > -1, //opera内核
                    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    //gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: ua.indexOf('iPad') > -1 //是否iPad
                    //webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            lang:(navigator.browserLanguage || navigator.language).toLowerCase()
        };

        if(browser.info.android){
            return "android";
        }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
            return "ios";
        }
    })(u);


    // u.isArray = function(obj){
    //     if(Array.isArray){
    //         return Array.isArray(obj);
    //     }else{
    //         return obj instanceof Array;
    //     }
    // };
    u.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    u.isFunction = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.alert = function(msg){
        try{
            if(typeof msg == "string"){
                alert(msg);
            }else if(typeof msg == "object"){
                alert(u.jsonToStr(msg));
            }else{
                alert(msg);
            }
        }catch(e){
            alert(msg);
        }
    };
    //获取随机的唯一id，随机不重复，长度固定
    u.UUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uid = '';
        while(len--){
            uid += seed[Math.round(Math.random()*seedLen)]
        }
        return uid;
    };

    window.$summer = window.$summer || u;
})();


// Summer and $Summer
;(function(w){
    w.$summer = w.$summer || {};
    w.summer =  w.summer || {};
    w.api = w.summer;
    (function(){
		var url="";
		var inNative = document.location.pathname.indexOf("assets/www")>-1 ? true:false;
		//var isIndex = document.location.pathname.indexOf("/html/index.html");
		if(inNative){
            document.addEventListener("DOMContentLoaded",function(){
                w.$summer["cordova"] = {
					isDebug:true,
                    require:function(){
                        return {openFrame:function(){console.log("openFrame is excuted....")}};
                    }
                };
                w.summer["cordova"] = w.$summer["cordova"];
				if(typeof w.summerready == "function")
					w.summerready();
				if(typeof w.summerReady == "function")
					w.summerReady();
            });            
        }else{
			url = document.location.pathname.split("www")[0]+"www/cordova.js";
			_script = document.createElement('script');
			_script.id = "cordova_js";
			_script.type = 'text/javascript';
			_script.charset = 'utf-8';
			_script.async = true;
			//alert(url)
			_script.src = url;
			_script.onload = function (e) {
				//alert(w.cordova)
				w.$summer["cordova"] = w.cordova;
				w.summer["cordova"] = w.cordova;

				document.addEventListener('deviceready', function(){
					//1、先通过cdv来获取页面参数
					summer.winParam(function(ret){
						//alert(typeof ret)// --> object

						if(typeof ret == "string"){
							ret = $summer.strToJson(ret);

						}
						//alert($summer.jsonToStr(ret));
						summer['pageParam'] = ret;//原生数据都放在summer对象上
						//alert($summer.jsonToStr(summer.pageParam));

						if(typeof summerready == "function")
							summerready();
						if(typeof summerReady == "function")
							summerReady();  

					});								  
				}, false);

			};
			if(typeof __TEST == "undefined"){
	            //document.currentScript.parentNode.insertBefore(_script, document.currentScript);
				fs = document.getElementsByTagName('script')[0];
				fs.parentNode.insertBefore(_script, fs);
			}
		}
    })();

    w.summer.require = function(mdlName){
        if(window.$summer["cordova"] != window.cordova){
           alert("---------warnning : init cordova is too late!")
           window.$summer["cordova"] = window.cordova;
           window.summer["cordova"] = window.cordova;
        }
        if(mdlName == "cordova"){
           return window.$summer["cordova"];
        }else{
           return window.$summer["cordova"].require(mdlName);
        }
   };
   w.$summer.require = w.summer.require;
})(window);


// JavaScript Base Type Extra API
;(function(){
    /**
    * 删除左右两端的空格
    */
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    /**
    * 删除左边的空格
    */
    String.prototype.ltrim=function(){
        return this.replace(/(^\s*)/g, "");
    }
    /**
    * 删除右边的空格
    */
    String.prototype.rtrim=function(){
        return this.replace(/(\s*$)/g, "");
    }
    String.prototype.isNullOrEmpty=function(){
        if(typeof this == "undefined" || this === null){
            return true;
        }
        if(typeof this == "string" && this == ""){
            return true;
        }
        return false;
    }

    //给Number类型增加一个add方法，使用时直接用 .add 即可完成加法计算。
    Number.prototype.add = function (arg) {
        var accAdd = function(arg1, arg2){
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        };

        return accAdd(arg, this);
    };

    //给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成减法计算。
    Number.prototype.sub = function (arg) {
        return this.add(this, -arg);
    };

    //给Number类型增加一个mul方法，使用时直接用 .mul 即可完成乘法计算。
    Number.prototype.mul = function (arg) {
        var accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        };

        return accMul(arg, this);
    };

    //给Number类型增加一个div方法，，使用时直接用 .div 即可完成除法计算。
    Number.prototype.div = function (arg) {
        var accDiv = function(arg1,arg2){
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        };
        return accDiv(this, arg);
    };

    Array.prototype.remove = function(i){
        if(isNaN(i) || i < 0 || i >= this.length){
            return this;
        }
        this.splice(i,1);
        return this;
    }
    Array.prototype.remove2 = function(i){
        if(isNaN(i))
            return this;
        if(i < 0 || i >= this.length)
            return this;
        else
            return this.slice(0,i).concat(this.slice(i+1,this.length));
    }
    Array.prototype.remove3 = function(dx){
        if(isNaN(dx) || dx > this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[dx]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    }
    Array.prototype.insert = function (i, item){
      return this.splice(i, 0, item);
    }
    Date.prototype.format = function(format){
        // (new Date()).format("yyyy-MM-dd hh:mm:ss")
        var o = {
            "M+" : this.getMonth()+1, //month 
            "d+" : this.getDate(), //day 
            "h+" : this.getHours(), //hour 
            "m+" : this.getMinutes(), //minute 
            "s+" : this.getSeconds(), //second 
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
            "S" : this.getMilliseconds() //millisecond 
        }

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
})();


//$summer.require
(function () {
//
//  //存储已经加载好的模块
//  var moduleCache = {};
//
//  var $require = function (deps, callback) {
//    var params = [];
//    var depCount = 0;
//    var i, len, isEmpty = false, modName;
//
//    //获取当前正在执行的js代码段，这个在onLoad事件之前执行
//    modName = document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';
//
//    //简单实现，这里未做参数检查，只考虑数组的情况
//    if (deps.length) {
//      for (i = 0, len = deps.length; i < len; i++) {
//        (function (i) {
//          //依赖加一
//          depCount++;
//          alert("gct1")
//          //这块回调很关键
//          loadMod(deps[i], function (param) {
//          alert("gct2")
//            params[i] = param;
//            depCount--;
//            if (depCount == 0) {
//              saveModule(modName, params, callback);
//            }
//          });
//        })(i);
//      }
//    } else {
//      isEmpty = true;
//    }
//
//    if (isEmpty) {
//      setTimeout(function () {
//        saveModule(modName, null, callback);
//      }, 0);
//    }
//
//  };
//
//  //考虑最简单逻辑即可
//  var _getPathUrl = function (modName) {
//    var url = modName;
//    //不严谨
//    if (url.indexOf('.js') == -1) url = url + '.js';
//    return url;
//  };
//
//  //模块加载
//  var loadMod = function (modName, callback) {
//    var url = _getPathUrl(modName), fs, mod;
//
//    //如果该模块已经被加载
//    if (moduleCache[modName]) {
//      mod = moduleCache[modName];
//      if (mod.status == 'loaded') {
//        setTimeout(callback(this.params), 0);
//      } else {
//        //如果未到加载状态直接往onLoad插入值，在依赖项加载好后会解除依赖
//        mod.onload.push(callback);
//      }
//    } else {
//
//      /*
//      这里重点说一下Module对象
//      status代表模块状态
//      onLoad事实上对应requireJS的事件回调，该模块被引用多少次变化执行多少次回调，通知被依赖项解除依赖
//      */
//      mod = moduleCache[modName] = {
//        modName: modName,
//        status: 'loading',
//        export: null,
//        onload: [callback]
//      };
//
//      _script = document.createElement('script');
//      _script.id = modName;
//      _script.type = 'text/javascript';
//      _script.charset = 'utf-8';
//      _script.async = true;
//      _script.src = url;
//
//      //这段代码在这个场景中意义不大，注释了
//            _script.onload = function (e) {alert("ok")};
//
//      fs = document.getElementsByTagName('script')[0];
//      fs.parentNode.insertBefore(_script, fs);
//
//    }
//  };
//
//  var saveModule = function (modName, params, callback) {
//    var mod, fn;
//
//    if (moduleCache.hasOwnProperty(modName)) {
//      mod = moduleCache[modName];
//      mod.status = 'loaded';
//      //输出项
//      mod.export = callback ? callback(params) : null;
//
//      //解除父类依赖，这里事实上使用事件监听较好
//      while (fn = mod.onload.shift()) {
//        fn(mod.export);
//      }
//    } else {
//      callback && callback.apply(window, params);
//    }
//  };
//
//  window.$summer._require = $require;
//  window.$summer._define = $require;
//
})();

//HTML DOM API by gct
;(function(window){
    var u = window.$summer || {};
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.byTag = function(name){
        return document.getElementsByTagName(name);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isEqualNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }
        
    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.addCls(el, cls);
            }else{
                u.removeCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }
        
    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl, st;
        if(document.documentElement){
            sl = document.documentElement.scrollLeft;
            st = document.documentElement.scrollTop;
        }else{
            sl = document.body.scrollLeft;
            st = document.body.scrollTop;
        }
        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }else{
            summer.toast(str + "$summer.strToJson's parameter is not a string");
        }
    };
    //gct api
    u.winWidth = function(){
        return document.documentElement.offsetWidth || document.body.offsetWidth;
    };
    //gct api
    u.winHeight = function(){
        return document.documentElement.offsetHeight || document.body.offsetHeight;
    };
    /******************** HTML API END ********************/

   
    /******************** Native API BEGIN ********************/
    u.fixIos7Bar = function(el){
        // if(!u.isElement(el)){
        //     console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
        //     return;
        // }
        // var strDM = api.systemType;
        // if (strDM == 'ios') {
        //     var strSV = api.systemVersion;
        //     var numSV = parseInt(strSV,10);
        //     var fullScreen = api.fullScreen;
        //     var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
        //     if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
        //         el.style.paddingTop = '20px';
        //     }
        // }
    };
    u.toast = function(title, text, time){
        // var opts = {};
        // var show = function(opts, time){
        //     api.showProgress(opts);
        //     setTimeout(function(){
        //         api.hideProgress();
        //     },time);
        // };
        // if(arguments.length === 1){
        //     var time = time || 500;
        //     if(typeof title === 'number'){
        //         time = title;
        //     }else{
        //         opts.title = title+'';
        //     }
        //     show(opts, time);
        // }else if(arguments.length === 2){
        //     var time = time || 500;
        //     var text = text;
        //     if(typeof text === "number"){
        //         var tmp = text;
        //         time = tmp;
        //         text = null;
        //     }
        //     if(title){
        //         opts.title = title;
        //     }
        //     if(text){
        //         opts.text = text;
        //     }
        //     show(opts, time);
        // }
        // if(title){
        //     opts.title = title;
        // }
        // if(text){
        //     opts.text = text;
        // }
        // time = time || 500;
        // show(opts, time);
    };
    u.post = function(/*url,data,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'json';
        // }
        // json.method = 'post';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
    u.get = function(/*url,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // //argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'text';
        // }
        // json.method = 'get';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
    
    

    /*
    serviceType:平台提供的服务类型
    jsonArgs: json类型
    isSync:默认false，是否同步调用
    */
    u.call=function(serviceType, jsonArgs, isSync){
        try{        
            var serviceparams = "";
            if(typeof jsonArgs == "string"){
                var json = u.strToJSON(jsonArgs);
                if(typeof json == "string"){
                    //转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
                    alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
                    return; 
                }
                serviceparams = u.jsonToStr(json);
                if(typeof serviceparams == "object"){
                    //转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
                    alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式。参数是" + jsonArgs);
                    return; 
                }           
            }else if(typeof jsonArgs == "object"){
                if(jsonArgs["callback"] && $isFunction(jsonArgs["callback"])){
                    var strFn = "fun" + uuid(8, 16) + "()";//anonymous method
                    while($__cbm[strFn]){
                        strFn =  "fun" + uuid(8, 16) + "()";//anonymous method
                    }
                    $__cbm[strFn] = jsonArgs["callback"];
                    jsonArgs["callback"] = strFn;               
                }
            
                serviceparams = jsonToString(jsonArgs);
                if(typeof serviceparams == "object"){
                    //转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
                    alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
                    return; 
                }
            }else{
                alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
                return;
            }
                
            if(u.os == "ios"){
                /*
                //IOS需要严格的JSON格式，故在此统一检查并处理一下
                if(typeof serviceparams == "string"){
                    var json = stringToJSON(serviceparams);
                    serviceparams = jsonToString(json);         
                }else if(typeof serviceparams == "object"){
                    serviceparams = jsonToString(serviceparams);
                }
                */
                if(isSync){
                    return UM_callNativeService(serviceType,serviceparams);//同步调用
                }else{
                    return UM_callNativeServiceNoraml(serviceType,serviceparams);//异步调用，多用于CallAction等，服务可支持callBack，通过callback参数
                }
            }else if(u.os == "android"){
                if(isSync){
                    return adrinvoker.call2(serviceType,serviceparams);//call2是同步调用
                }else{
                    //默认异步执行
                    return adrinvoker.call(serviceType,serviceparams);//call是异步调用 默认异步
                }
            }else{
                alert("$summer.os == " + u.os + ", $summer.call Not Implementation!")
            }
        }catch(e){
            var info="";
            if(isSync)  
                info = "调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
            else
                info = "调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
            $console.log(info);
            alert(info+", 更多请查看console日志;\n错误堆栈信息为:\n" + e.stack);
        }
    }
    window.$summer = window.$summer || u;
    window.$api = window.$summer;
})(window);

//UAP Mobile Service
;(function(window){
    var r = {};
    r.eval = function(controllerid, js, ctx, sender, args, uicontrols){
        //$router.eval("","getData()","","btn0",{a:1},{});
        try{
            var fnName = js.indexOf("(") > 0 ? js.substring(0, js.indexOf("(")) : js;
            
            var curInst = (controllerid && controllerid != ".") ? eval(controllerid) : window;
            fn = eval(controllerid ? controllerid + "." + fnName : fnName);
            fn.apply(curInst, [sender, args]);   
                            
        }catch(e){
            alert(e.stack);
        }    
    };

    window.$router = r;
})(window);






//sumemr API
+function(w,s){
    s.window = {
        openFrame : function(json, successFn, errFn){
            json["animation"] = json["animation"] || {};
            json["pageParam"] = json["pageParam"] || {};

    		if(json["rect"] && !json["position"]){
    			json["position"] = {};
    			json["position"].left = json["rect"].x;
    			json["position"].top = json["rect"].y;
    			json["position"].width = json["rect"].w;
    			json["position"].height = json["rect"].h;

    		}
    		if(json["position"].width=="auto"){
    		    json["position"].width = $summer.offset(document.getElementsByTagName("body")[0]).w;
    		}
    		if(json["position"].height=="auto"){
    		    json["position"].height = $summer.offset(document.getElementsByTagName("body")[0]).h;
    		}
            if(json["id"]){
               json["name"] = json["id"];
            }else if(json["name"]){
                json["id"] = json["name"];
            }else{
                alert("openFrame方法需指定id");
            }
    		// if(json["name"] && !json["id"]){
    		// 	json["id"] = json["name"];
    		// }
//            if(json["url"]){
//                var url = json["url"];
//                var idx = url.indexOf("www/html/");
//                if(idx < 0){
//                    if(url.indexOf("html/")==0){
//                        json["url"] = "www/" + json["url"];
//                    }else{
//                        json["url"] = "www/html/" + json["url"];
//                    }
//                }
//            }
            //$summer.alert(json);
            //alert($alert(json))
            return s.cordova.require('summer-plugin-frame.XFrame').openFrame(json, successFn, errFn);
        },
        closeFrame : function(json, successFn, errFn){
            return s.cordova.require('summer-plugin-frame.XFrame').openFrame(json, successFn, errFn);
        },
        openWin : function(json, successFn, errFn){
            if(json["id"]){
               json["name"] = json["id"];
            }else if(json["name"]){
                json["id"] = json["name"];
            }else{
                alert("openWin方法需指定id");
            }
            return s.cordova.require('summer-plugin-frame.XFrame').openWin(json, successFn, errFn);
        },
        closeWin : function(){
            return s.cordova.require('summer-plugin-frame.XFrame').closeWin();
        },
        setFrameAttr : function(json){
            return s.cordova.require('summer-plugin-frame.XFrame').setFrameAttr(json);
        },
        winParam : function(json){
            return s.cordova.require('summer-plugin-frame.XFrame').winParam(json);
        },
        frameParam : function(json){
            return s.cordova.require('summer-plugin-frame.XFrame').frameParam(json);
        },
        setRefreshHeaderInfo : function(json,success,error){
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshHeaderInfo(json,success,error);
        },
        refreshHeaderLoadDone : function(json,success,error){
            return s.cordova.require('summer-plugin-frame.XFrame').refreshHeaderLoadDone(json,success,error);
        },
        setRefreshFooterInfo : function(json,success,error){
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshFooterInfo(json,success,error);
        },
        refreshFooterLoadDone : function(json,success,error){
            return s.cordova.require('summer-plugin-frame.XFrame').refreshFooterLoadDone(json,success,error);
        }
    };

    //核心API直接通过 summer.xxx()访问
    s.openFrame = s.window.openFrame;
    s.closeFrame = s.window.closeFrame;
    s.openWin = s.window.openWin;
    s.closeWin = s.window.closeWin;

    s.winParam = s.window.winParam;//非对外API
    s.frameParam = s.window.frameParam;//非对外API

    s.setRefreshHeaderInfo = s.window.setRefreshHeaderInfo;
    s.refreshHeaderLoadDone = s.window.refreshHeaderLoadDone;
    s.setRefreshFooterInfo = s.window.setRefreshFooterInfo;
    s.refreshFooterLoadDone = s.window.refreshFooterLoadDone;

    s.setFrameAttr = s.window.setFrameAttr;

    s.showProgress = function(json){
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.showLoadingBar",json);
    };
    s.hideProgress = function(json){
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.hideLoadingBar",json);
    };

    if(w.adrinvoker) alert(w.adrinvoker);
    var adrinvoker = {};
    if(w.adrinvoker && w.adrinvoker.call2) alert(w.adrinvoker.call2);

    adrinvoker.call = function(srvName, strJson, isSync){
        var invoker = summer.require('summer-plugin-service.XService');
        json = json || {};
        isSync ? invoker.call(srvName,json) : invoker.call(srvName, $summer.strToJson(json));
    }

    adrinvoker.call2 = function(srvName, json, isSync){
        var invoker = summer.require('summer-plugin-service.XService');
        json = json || {};
        if(isSync)
           invoker.call(srvName,json);
        else
           invoker.call(srvName,json);
    }
    w.adrinvoker = adrinvoker;
}(window,summer);
//alert(adrinvoker.call)

$summer.log = function(nn){
    $summer.byId("log").innerHTML =nn;
}
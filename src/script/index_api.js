//previous page id, current page id
var prevPid = '', curPid = '';
//save opened frame name
var frameArr = [];

//frame whether open
function isOpened(frmName){
    var i = 0, len = frameArr.length;
    var mark = false;
    for(i; i<len; i++){
        if(frameArr[i] === frmName){
            mark = true;
            return mark;
        }
    }
    return mark;
}

//toggle header
function showHeader(type){
    if(!type){return;}
    var header = $api.dom('#header .active');
    $api.removeCls(header,'active');
    var thisHeader = $api.dom('#header .'+type);
    $api.addCls(thisHeader,'active');
}

//open tab
function openTab(type,tid){
    //debugger;
    if(type === 'user'){
    	//login
	    var uid = $api.getStorage('uid');
		if(!uid){
			api.openWin({
		        name: 'userLogin',
		        url: './html/userLogin.html',
		        opaque: true,
		        vScrollBarEnabled:false
		    });
		    return;
		}
    }
    
    showHeader(type);
    var width = api.winWidth;
    var nav = $api.byId('nav');
    var navPos = $api.offset(nav);
    var header = $api.byId('header');
    var headerPos = $api.offset(header);
    var height = api.winHeight - navPos.h - headerPos.h;
    
    type = type || 'main';

    var actTab = $api.dom('#nav .active');
    $api.removeCls(actTab,'active');
    var thisTab = $api.dom('#nav .'+ type);
    thisTab = thisTab.parentNode;
    $api.addCls(thisTab,'active');

    //record page id
    prevPid = curPid;
    curPid = type;
    if(prevPid !== curPid){

        // alert(type+':'+isOpened(type));
    
        if(isOpened(type)){
            api.setFrameAttr({
                name: type,
                hidden: false
            });
        }else{
            api.openFrame({
                name: type,
                url: 'html/'+ type +'.html',
                bounces: true,
                opaque: true,
                vScrollBarEnabled: false,
                pageParam:{ headerHeight: headerPos.h,tid:tid},
                rect: {
                    x: 0,
                    y: headerPos.h,
                    w: width,
                    h: height
                }
            });
        }

        if(prevPid){
            api.setFrameAttr({
                name: prevPid,
                hidden: true
            });
            
        }

        if(!isOpened(type)){
            //save frame name
            frameArr.push(type);
        }
        
    }
    
}

function changeCityTab(str){
    if(str){
        var title = $api.dom('#header .activity .city span');
        $api.text(title, str);
    }
}

function changeTypeTab(str){
    if(str){
        var title = $api.dom('#header .activity .hot span');
        $api.text(title, str);
    }
}

//search activity
var searchActOpened = false;

function closeFramGroup(){
    api.closeFrameGroup({
        name: 'searchAct'
    });

    var actLi = $api.dom('#header .activity li.active');
    $api.removeCls(actLi,'active');
    searchActOpened = false;
}

//search activity
function searchAct(el,type){
    if(!el || !type){return;}

    var header = $api.byId('header');
    var pos = $api.offset(header);

    var index = 0;  //frame group index
    if(type === "type"){
        index = 1;
    }

    if(!searchActOpened){
        api.openFrameGroup ({
            name: 'searchAct',
            scrollEnabled: false,
            rect:{x: 0, y: pos.h, w: 'auto', h: 'auto'},
            index: index,
            frames:[{
                name: 'searchActBy-city',
                url: 'html/searchActBy-city.html',
                bounces: false,
                opaque: false,
                bgColor: 'rgba(51,51,51,0.6)',
                vScrollBarEnabled: false
            },{
                name: 'searchActBy-type',
                url: 'html/searchActBy-type.html',
                bounces: false,
                opaque: false,
                bgColor: 'rgba(51,51,51,0.6)',
                vScrollBarEnabled:false
            }]
        }, function(ret, err){
            
        });

        searchActOpened = true;
    }else{
        api.setFrameGroupIndex ({
            name: 'searchAct',
            index: index
            // ,scroll: true
        });
        api.setFrameGroupAttr({
            name: 'searchAct',
            hidden: false
        });
    }

    //toggle active style
    var curLi = el.parentNode;
    //close frame group
    if($api.hasCls(curLi,'active')){
        
        api.setFrameGroupAttr({
            name: 'searchAct',
            hidden: true
        });
        
    }
    $api.toggleCls(curLi,'active');

    var lis = $api.domAll('#header .activity li');
    var i = 0, len = lis.length;

    for(i; i<len; i++){
        var thisLi = lis[i];
        if(thisLi === curLi){
            continue;
        }else{
            if($api.hasCls(thisLi,'active')){
                $api.removeCls(thisLi,'active');
            }
        }
    }

}

function setting(){
    api.openWin({
        name: 'setting',
        url: 'html/setting.html',
        opaque: true,
        vScrollBarEnabled:false
    });
}

function filterNews(type){
	var nav = $api.dom('#header .news .submenu');
	var actNav = $api.dom(nav, '.light');
	$api.removeCls(actNav, 'light');
	$api.addCls(event.target, 'light');
	var id='548ec1f272c60e937d21c8cf';

	switch (type){
		case 'hot':
			api.execScript({
				frameName: 'news',
	            script: 'initPage(\''+id+'\');'
            });
			break;
		case 'local':
			api.execScript({
				frameName: 'news',
	            script: 'initPage(\''+id+'\');'
            });
			break;
		case 'topic':
			api.execScript({
				frameName: 'news',
	            script: 'initPage(\''+id+'\');'
            });
			break;
	}
}

function scan(){
	var obj = api.require('scanner');
	obj.open(function(ret,err) {
		var resUrl = ret.msg;
		if(!resUrl){return;}
		
	    api.openApp({
	        iosUrl: resUrl,
	        androidPkg: 'android.intent.action.VIEW',
	        mimeType: 'text/html',
	        uri: resUrl
	    }, function (ret, err) {
			
	    });
	    
	});
}

////////////////////////////////////////////////////////////////////////////////////



var iuap = cordova;
var app = {
    // Application Constructor
    initialize: function() {
        debugger;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
//        var extraInfo = cordova.require('com.yyuap.plugin.FrameManager');
//        extraInfo.showToast("I am ready!",1);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//		debugger;
		//createFrame("main");
		openTab('main','548ec1e708d4718e7d771bbe');
		return;
//        var header = $api.byId('header');
//		$api.fixIos7Bar(header);
//
//		//status bar style
//		api.setStatusBarStyle({
//			style: 'light'
//		});
//		openTab('main','548ec1e708d4718e7d771bbe');
    }
};

app.initialize();
//app.receivedEvent();
/*
apiready = function(){
    var header = $api.byId('header');
    $api.fixIos7Bar(header);

    //status bar style
    api.setStatusBarStyle({
        style: 'light'
    });
    openTab('main','548ec1e708d4718e7d771bbe');
};
*/

///////////////////////////////////////////////////////////////////////////////////////
//获取控件左绝对位置
function getAbsoluteLeft(objectId) {
	o = document.getElementById(objectId)
	oLeft = o.offsetLeft
	while(o.offsetParent!=null) {
		oParent = o.offsetParent
		oLeft += oParent.offsetLeft
		o = oParent
	}
	return oLeft
}
//获取控件上绝对位置
function getAbsoluteTop(objectId) {
	o = document.getElementById(objectId);
	oTop = o.offsetTop;
	while(o.offsetParent!=null)
	{
		oParent = o.offsetParent
		oTop += oParent.offsetTop  // Add parent top position
		o = oParent
	}
	return oTop
}

//获取控件宽度
function getElementWidth(objectId) {
	x = document.getElementById(objectId);
	return x.offsetWidth;
}
//获取控件高度
function getElementHeight(objectId) {
	x = document.getElementById(objectId);
	return x.offsetHeight;
}



function createFrame(id) {
     var extraInfo = iuap.require('summer-plugin-frame.XFrame');
     var anim = {
        "type":"translate",
        "fromX":0,
        "toX":0,
        "fromY":1500,
        "toY":150,
        "duration":1000,
        "style":"bounce"
     };
//     var anim = {
//             "type":"alpha",
//             "fromAlpha":0,
//             "toAlpha":1,
//             "duration":3000
//          };

    var x=getAbsoluteLeft("main");
    var y=getAbsoluteTop("main");
    var w=getElementWidth("main");
    var h=getElementHeight("main");
    var position = {
            "left":x,
            "top":y,
            "width":w,
            "height":h
    }
    var position1 = {
        "left":0,
        "top":150,
        "width":500,
        "height":300
    };

    var pageParam = {
        "id":"xxxx",
        "wwww":"bbbbb"
    };

    var params = {
        "id":"frame1",
        "position":position,
        "animation":{},
        "pageParam":pageParam,
        "url":"www/newwindow.html"
    };
    extraInfo.openFrame(params,null,null);

//    var frame = iuap.require('com.yyuap.octopus.plugin.FrameManager');
//    frame.PageParam(function {
//        var sss = www;
//    });

}

var prv;
function createFrame2_old(type) {

    var page = type+".html";

    //
    var x=getAbsoluteLeft("main");
    var y=getAbsoluteTop("main");
    var w=getElementWidth("main");
    var h=getElementHeight("main");
    //
     var extraInfo = iuap.require('com.yyuap.octopus.plugin.FrameManager');
     var anim = {
        "type":"translate",
        "fromX":w,
        "toX":0,
        "fromY":y,
        "toY":y,
        "duration":500
     };
//     var anim = {
//             "type":"alpha",
//             "fromAlpha":0,
//             "toAlpha":1,
//             "duration":3000
//          };

    var postion = {
        "left":x,
        "top":y,
        "width":w,
        "height":h
    }
    extraInfo.openFrame("frame"+type, postion, {}, "www/html/"+page, function() {
        prv = type;
    },null);

}
function createFrame2(type) {

    var page = "content"+type+".html"

    //
    var x=getAbsoluteLeft("main");
    var y=getAbsoluteTop("main");
    var w=getElementWidth("main");
    var h=getElementHeight("main");
    //
     var extraInfo = iuap.require('summer-plugin-frame.XFrame');
     var anim = {
        "type":"translate",
        "fromX":w,
        "toX":0,
        "fromY":y,
        "toY":y,
        "duration":500
     };
//     var anim = {
//             "type":"alpha",
//             "fromAlpha":0,
//             "toAlpha":1,
//             "duration":3000
//          };

    var postion = {
        "left":x,
        "top":y,
        "width":w,
        "height":h
    }
    extraInfo.openFrame("frame"+type,postion,anim,"www/"+page,function() {
        //if(prv!=type){
                closeFrame2(prv);
                prv = type;
           //}
    },null);

}





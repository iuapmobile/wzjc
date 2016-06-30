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
    var header = $summer.dom('#header .active');
    $summer.removeCls(header,'active');//去掉原来active状态
    var thisHeader = $summer.dom('#header .'+type);
    $summer.addCls(thisHeader,'active');//设置当前tab为active状态
}


////////////////////////////////////////////////////////////////////////////////////////// open tab
function openTab(type,tid){
    //debugger;
    if(type === 'user'){//等于最后一个wo，采用openWin方式
    	//login
	    var uid = "getStorage";//$summer.getStorage('uid');
		if(!uid || true){
            // summer.openWin({
            //    name: 'userLogin',
            //    url: 'ƒuserLogin.html',
            //    opaque: true,
            //    vScrollBarEnabled:false
            // },null,null);
             summer.openWin({
                name: 'userLogin',
                url: 'html/userLogin.html',
                opaque: true,
                vScrollBarEnabled:false
             },null,null);

		    return;
		}
    }
    
    showHeader(type);//gct:js控制tabbar选中样式
    

    var nav = $summer.byId('nav');
    var navPos = $summer.offset(nav);
    var header = $summer.byId('header');
    var headerPos = $summer.offset(header);
    
    // var width = api.winWidth;
    var width = $summer.winWidth();//==320
    // var height = api.winHeight - navPos.h - headerPos.h;
    var height = $summer.winHeight() - navPos.h - headerPos.h;//gct:计算frame的高


    type = type || 'main';

    var actTab = $summer.dom('#nav .active');
    $summer.removeCls(actTab,'active');
    var thisTab = $summer.dom('#nav .'+ type);
    thisTab = thisTab.parentNode;
    $summer.addCls(thisTab,'active');

    //record page id
    prevPid = curPid;
    curPid = type;
   // var xxxx = $summer.require('summer-plugin-frame.XFrame');
    if(prevPid !== curPid){
    
        if(isOpened(type)){

            var attrs = {
                "display":"block"
            };

            summer.window.setFrameAttr({
                id:"frame1"+type,
                hidden: false
            });
//            api.setFrameAttr({
//                name: type,
//                hidden: false
//            });
        }else{
//            api.openFrame({
//                name: type,
//                url: 'html/'+ type +'.html',
//                bounces: true,
//                opaque: true,
//                vScrollBarEnabled: false,
//                pageParam:{ headerHeight: headerPos.h,tid:tid},
//                rect: {
//                    x: 0,
//                    y: headerPos.h,
//                    w: width,
//                    h: height
//                }
//            });
//            var extraInfo = iuap.require('summer-plugin-frame.XFrame');

            summer.openFrame({
                "id" : "frame1"+type,
                "position" : {
                    "left" : 0,
                    "top" : headerPos.h,
                    "width" : width,
                    "height" : height
                },/*
                "animation":{
                                    type:"push",                //动画类型（详见动画类型常量），例如滑动
                                    subType:"from_right",       //动画子类型（详见动画子类型常量），从左到右，从右到左
                                    duration:300                //动画过渡时间，默认300毫秒
                },*/
                "pageParam" : {
                    "id":"xxxx",
                    "param1":"bbbbb",
                    tid:tid
                },
                "url" : 'html/'+ type +'.html'
            },null,null);
        }

        if(prevPid){
            // api.setFrameAttr({
            //    name: prevPid,
            //    hidden: true
            // });
            
            summer.setFrameAttr({
                id: "frame1"+prevPid,
                hidden: true
            },null,null);
        }

        if(!isOpened(type)){
            //save frame name
            frameArr.push(type);
        }
        
    }
    
}

function changeCityTab(str){
    if(str){
        var title = $summer.dom('#header .activity .city span');
        $summer.text(title, str);
    }
}

function changeTypeTab(str){
    if(str){
        var title = $summer.dom('#header .activity .hot span');
        $summer.text(title, str);
    }
}

//search activity
var searchActOpened = false;

function closeFramGroup(){
    api.closeFrameGroup({
        name: 'searchAct'
    });

    var actLi = $summer.dom('#header .activity li.active');
    $summer.removeCls(actLi,'active');
    searchActOpened = false;
}

//search activity
function searchAct(el,type){
    if(!el || !type){return;}

    var header = $summer.byId('header');
    var pos = $summer.offset(header);

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
    if($summer.hasCls(curLi,'active')){
        
        api.setFrameGroupAttr({
            name: 'searchAct',
            hidden: true
        });
        
    }
    $summer.toggleCls(curLi,'active');

    var lis = $summer.domAll('#header .activity li');
    var i = 0, len = lis.length;

    for(i; i<len; i++){
        var thisLi = lis[i];
        if(thisLi === curLi){
            continue;
        }else{
            if($summer.hasCls(thisLi,'active')){
                $summer.removeCls(thisLi,'active');
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
	var nav = $summer.dom('#header .news .submenu');
	var actNav = $summer.dom(nav, '.light');
	$summer.removeCls(actNav, 'light');
	$summer.addCls(event.target, 'light');
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

function abc(){
    alert("came");
    var img = $ctx.getString("image");
    alert(img);

}
function scan(){
	
	/*
    $camera.open({
        bindfield : "image",
        callback : "abc()"
    });
*//*
	navigator.contacts.pickContact(function(contact){
        $summer.alert('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
    	$summer.alert('Error: ' + err);
    });
	
	return;
	*/
	cordova.plugins.barcodeScanner.scan(
			function (result) {
			      alert("We got a barcode\n" +
			        "Result: " + result.text + "\n" +
			        "Format: " + result.format + "\n" +
			        "Cancelled: " + result.cancelled);
			  }, 
			  function (error) {
			      alert("Scanning failed: " + error);
			  },
			  {
			      "preferFrontCamera" : true, // iOS and Android 
			  "showFlipCameraButton" : true, // iOS and Android 
			  "prompt" : "Place a barcode inside the scan area", // supported on Android only 
			  "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
			  "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
			  }
		);
    return;

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
        "param1":"bbbbb"
    };

    var params = {
        "id":"frame1",
        "position":position,
        "animation":{},
        "pageParam":pageParam,
        "url":"newwindow.html"
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
    extraInfo.openFrame("frame"+type, postion, {}, "html/"+page, function() {
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
    extraInfo.openFrame("frame"+type,postion,anim,page,function() {
        //if(prv!=type){
                closeFrame2(prv);
                prv = type;
           //}
    },null);

}


function openCamera() {
     var invoker = $summer.require('summer-plugin-service.XService');
//     invoker.call("UMDevice.openCamera",{
//         bindfield : "image",
//         callback : "mycb()"
//    });
    invoker.call("UMTest.showMessage",{
         "text" : "Hello , callback",
         "callback" : "mycb()"
    });
}

function mycb(){
    //var img = $ctx.getString("image");
    alert("hello");
}

/////////////////////////////// client script /////////////////////////////////////////////////////


/*保留API代码以便对比*/
/*
apiready = function(){
    var header = $summer.byId('header');
    $summer.fixIos7Bar(header);

    //status bar style
    api.setStatusBarStyle({
        style: 'light'
    });
    openTab('main','548ec1e708d4718e7d771bbe');
};
*/


summerready = function(){
    // openTab define in index.js line 30
    openTab('main','548ec1e708d4718e7d771bbe'); 
}

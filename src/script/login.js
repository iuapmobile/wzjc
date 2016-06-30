function delWord(el) {
    var input = $api.prev(el, '.txt');
    input.value = '';
}

function login() {
    summer.openWin({
        name: 'userRegister',
        url: 'html/userRegister.html',
        opaque: true,
        vScrollBarEnabled: false
    });
}

function ensure() {
//    api.showProgress({
//        title: '正在登录...',
//        modal: false
//    });
    var name = $api.byId('username').value;
    var pwd = $api.byId('password').value;

    var loginUlr = '/user/login';
    var bodyParam = {
        username: name,
        password: pwd
    }
    ajaxRequest(loginUlr, 'post', JSON.stringify(bodyParam), function (ret, err) {
        if (ret) {
//            $api.setStorage('uid', ret.userId);
//            $api.setStorage('token', ret.id);
            setTimeout(function () {
                summer.closeWin();
            }, 100);
        } else {
            summer.alert({
                msg: err.msg
            });
        }
//        api.hideProgress();
    })
}

summerready = function () {
//    var header = $api.byId('header');
//    $api.fixIos7Bar(header);
//
//    var info = $api.byId("info");
//    var cur = 0;
//    for(var i=0,len=1000;i<len;i++){
//     for(var j=0,len2=100;j<len2;j++){
//    	cur++;
//    	info.innerHTML = "";
//    	var e =document.createElement("input");
//        e.type = "button";
//        e.value = "已经运行" + cur + "次";
//        var object = info.appendChild(e);
//    }
//    }
//
//    var btnlogin = $api.byId("btnlogin");
//    btnlogin.innerHTML += "---" + cur;
    
};



/*

var info2 = $api.byId("info2");
    var cur = 0;
    for(var i=0,len=1000;i<len;i++){
	     for(var j=0,len2=100;j<len2;j++){
	    	cur++;
	    	info2.innerHTML = "";
	    	var e =document.createElement("input");
	    	e.style = "border:solid red 1px";
	        e.type = "button";
	        e.value = "已经运行" + cur + "次";
	        var object = info2.appendChild(e);
	     }
    }
    
    
    var btnlogin = $api.byId("btnlogin");
    btnlogin.innerHTML += "***" + cur;
*/
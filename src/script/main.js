function initSlide() {
    var slide = $api.byId('slide');
    var pointer = $api.domAll('#pointer a');
    window.mySlide = Swipe(slide, {
        // startSlide: 2,
        auto: 5000,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {
            var actPoint = $api.dom('#pointer a.active');
            $api.removeCls(actPoint, 'active');
            $api.addCls(pointer[index], 'active');
        },
        transitionEnd: function (index, element) {

        }
    });
}

//点击热门活动列表行的事件
function openActDetail(did) {
    summer.openWin({
        id: 'actDetail',
        url: 'html/actDetail.html',
        pageParam: {dataId: did}
    });
}

function openLifeDetail(title,type){
    //alert("open life-list.html...openwin未实现")
    //alert(title +"||"+type);
    summer.openWin({
        name: 'life-list',
        url: 'html/life-list.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam:{title:title,type:type}
    });//success和error可以不写，或者为null
}

function getData(id) {
    var getTabBarActivityUrl = '/tabBar?filter=';
    var urlParam = {
        include: ["activity"],
        where: {
            id: id
        }
    };
    ajaxRequest(getTabBarActivityUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        //$summer.alert(ret);
        
    	if (ret) {
            var content = $api.byId('act-content');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret[0].activity);
        } else {
            api.alert({
                msg: err.msg
            });
        }
        //api.hideProgress();
        summer.hideProgress();



    })
}

function getBanner(id) {
    summer.showProgress();
    var getTabBarBannerUrl = '/tabBar?filter=';
    var urlParam = {
        include: ["banner"],
        where: {
            id: id
        }
    };
    ajaxRequest(getTabBarBannerUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
        	//$summer.alert(ret);
            var content = $api.byId('banner-content');
            var tpl = $api.byId('banner-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret[0].banner);
            initSlide();
        } else {
            api.alert({
                msg: err.msg
            });
        }
    })
}

summerready = function () {
    //getBanner(api.pageParam.tid);
    //getBanner("548ec1e708d4718e7d771bbe");
    getBanner("548ec1e708d4718e7d771bbe");
    getData("548ec1e708d4718e7d771bbe");



    //pulldown to refresh
    summer.setRefreshHeaderInfo({
        visible: true,
        // bgColor: '#F5F5F5',//不写bgColor意味着透明
        textColor: '#4d4d4d',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        textDo:"正在加载",
        showTime: true
    }, function (ret, err) {
        //getBanner(api.pageParam.tid);
        //getData(api.pageParam.tid);
        getBanner("548ec1e708d4718e7d771bbe");
        getData("548ec1e708d4718e7d771bbe");
        setTimeout(function(){
            summer.hideProgress();
            summer.refreshHeaderLoadDone();
        },2000);
   });
    

    //pullup to refresh
    summer.setRefreshFooterInfo({
        visible: true,
        // bgColor: '#F5F5F5',
        textColor: '#4d4d4d',
        textDown: '加载更多...',
        textUp: '松开加载更多...',
        textDo:"正在加载",
        showTime: false
    }, function (ret, err) {
        //getBanner(api.pageParam.tid);
        //getData(api.pageParam.tid);
        getBanner("548ec1e708d4718e7d771bbe");
        getData("548ec1e708d4718e7d771bbe");
        setTimeout(function(){
           summer.refreshFooterLoadDone();
        },3000);
    });


//
//
//    summer.addEventListener({
//        name: 'scrolltobottom'
//    }, function (ret, err) {
//        //getBanner(api.pageParam.tid);
//       // getData(api.pageParam.tid);
//    });

};
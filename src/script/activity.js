function initSlide() {
    var slide = $api.byId('slide');
    var pointer = $api.domAll('#pointer a');
    window.mySlide = Swipe(slide, {
        // startSlide: 4,
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

function getBanner() {
   summer.showProgress({
       title: '加载中...',
       modal: false
   });

    var getActivityUrl = '/activity';
    ajaxRequest(getActivityUrl, 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('banner-content');
            var tpl = $api.byId('banner-template').text;
            var tempFn = doT.template(tpl);

            //轮播图只显示3张
            var result = [];
            for(var i=0, len=3; i<len; i++){
                result.push(ret[i]);
            }
            content.innerHTML = tempFn(result);
            initSlide();
        } else {
            alert(JSON.stringify(err))
        }
       summer.hideProgress();
    })
}

function getData() {

//   summer.showProgress({
//       title: '加载中...',
//       modal: false
//   });
    var getActivityUrl = '/activity';
    ajaxRequest(getActivityUrl, 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('act-content');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
//            api.parseTapmode();
        } else {
            alert({msg: err.msg, location: 'middle'})
        }
       summer.hideProgress();
    })

}

//filter data
function getDataByFilter(filter, id) {
    if (!id || !filter) {
        return;
    }
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    var urlParam = {}, whereParam = {};
    whereParam[filter] = id;
    whereParam['category'] = 4;
    urlParam['where'] = whereParam;
    var getActivityByIdUrl = '/activity?filter=';
    ajaxRequest(getActivityByIdUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('act-content');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
            //init tapmode
            api.parseTapmode();
        } else {
            api.toast({msg: err.msg, location: 'middle'})
        }
        api.hideProgress();
    })

}


function openActDetail(did) {
    summer.openWin({
        name: 'actDetail',
        url: 'html/actDetail.html',
//		delay: 200,
        pageParam: {dataId: did}
    });
}

summerReady = function () {
    getBanner();
    getData();
    //pull to refresh
    summer.setRefreshHeaderInfo({
        visible: true,
        // loadingImgae: 'wgt://image/refresh-white.png',
        bgColor: '#f2f2f2',
        textColor: '#4d4d4d',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function (ret, err) {
        getBanner();
        getData();
        summer.refreshHeaderLoadDone();
    });
//
//
//    api.addEventListener({
//        name: 'scrolltobottom'
//    }, function (ret, err) {
//        //getBanner();
//        //getData();
//    });
};
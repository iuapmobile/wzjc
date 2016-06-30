function initSlide() {
    var slide = $summer.byId('slide');
    var pointer = $summer.domAll('#pointer a');
    window.mySlide = Swipe(slide, {
        // startSlide: 4,
        auto: 5000,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {
            var actPoint = $summer.dom('#pointer a.active');
            $summer.removeCls(actPoint, 'active');
            $summer.addCls(pointer[index], 'active');
        },
        transitionEnd: function (index, element) {

        }
    });
}

function getBanner(id) {
   summer.showProgress({
       title: '加载中...',
       modal: false
   });
    var getTabBarBannerUrl = '/tabBar?filter=';
    var urlParam = {
        include: ["banner"],
        where: {
            id: id
        }
    };
    ajaxRequest(getTabBarBannerUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
            var content = $summer.byId('banner-content');
            var tpl = $summer.byId('banner-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret[0].banner);
            initSlide();
        } else {
            $summer.alert({msg: err.msg, location: 'middle'})
        }
    })
}

function openNews(el, type) {
    type = type || 't';

    var newsId = $summer.attr(el, 'newsId');
    //text news
    if (type === 't') {
        summer.openWin({
            name: 'news-text',
            url: 'html/news-text.html',
            pageParam: {newsId: newsId},
            opaque: true,
            vScrollBarEnabled: false
        });
    } else if (type === 'p') {	//picture news
        summer.openWin({
            name: 'news-pic',
            url: 'html/news-pic.html',
            pageParam: {newsId: newsId},
            opaque: true,
            vScrollBarEnabled: false
        });

    } else if (type === 'v') {	//video news

        summer.openWin({
            name: 'news-video',
            url: 'html/news-video.html',
            opaque: true,
            vScrollBarEnabled: false,
            pageParam: {newsId: newsId}
        });

        event.preventDefault();
    }

}

function initPage(id) {
    var getTabBarActivityUrl = '/tabBar?filter=';
    var urlParam = {
        include: ["news"],
        where: {
            id: id
        }
    };
    //alert("begin request")
    ajaxRequest(getTabBarActivityUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
      //alert("end request")
        if (ret) {
            var obj = $api.byId('txtNewsList');
            var html = '';
            for (var i = 0, len = ret[0].news.length; i < len; i++) {
                var thisItem = ret[0].news[i];
                var nType = thisItem.type;
                if (nType === 'p') {
                    var pic = thisItem.pics;
                    var picArr = pic.split(',');
                    html += '<li class="pic"><h2>' + thisItem.title + '</h2><div class="p">';
                    for (var j = 0; j < 3; j++) {
                        html += '<a tapmode="" style="background-image:url(' + picArr[j] + ')" newsId="' + thisItem.id + '" onclick="openNews(this, \'p\');">';
                        html += '</a>';
                    }
                    html += '</div></li>';
                } else {
                    html += '<li class="' + nType + '"><a tapmode="active" newsId="' + thisItem.id + '" onclick="openNews(this, \'' + nType + '\');"><img src="' + thisItem.img.url + '" />';
                    html += '<div class="content"><h2>' + thisItem.title + '</h2><p>' + thisItem.summary + '</p></div></a></li>';
                }
            }
            $api.html(obj, html);
            summer.hideProgress();
//            //init tapmode
//            api.parseTapmode();
        } else {
            alert("没有callback数据")
            alert({msg: err.msg, location: 'middle'})
        }
       summer.hideProgress();
    })
}

summerReady = function(){
    //alert(summer.pageParam.tid);
    getBanner(api.pageParam.tid);
    initPage(api.pageParam.tid);
    //等价于如下代码
    //getBanner('548ec1f272c60e937d21c8cf');
    //initPage('548ec1f272c60e937d21c8cf');
    
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
        getBanner(summer.pageParam.tid);
        initPage(summer.pageParam.tid);
        summer.refreshHeaderLoadDone();
    });
}
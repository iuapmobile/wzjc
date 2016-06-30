function getRestData(type) {

    api.showProgress({
        title: '加载中...',
        modal: false
    });
    var getMerchantUrl = '/merchant?filter=';
    var urlParam = {
        include: ["pics", "cityPointer", "typePointer"],
        where:{category:type}
    };
    ajaxRequest(getMerchantUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('lifeList');
            var tpl = $api.byId('act-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
            // api.refreshHeaderLoadDone();
            summer.refreshHeaderLoadDone();
            // api.parseTapmode();
        } else {
            api.toast({msg: err.msg, location: 'middle'})
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
    urlParam['where'] = whereParam;
    urlParam['include'] = ["pics", "cityPointer", "typePointer"];
    var getMerchantByCityIdUrl = '/merchant?filter=';
    ajaxRequest(getMerchantByCityIdUrl + JSON.stringify(urlParam), 'GET', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('lifeList');
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


function call(el) {
    event.stopPropagation();
    event.preventDefault();
    var num = $api.attr(el, 'rel');
    api.call({
        type: 'tel_prompt',
        number: num
    });
}

function openRest(el) {
    //alert("openRest"+el);
    //var dataId = $summer.attr(el, 'data-id');
    var dataId=el;
    summer.openWin({
        name: 'restaurant',
        url: 'html/restaurant.html',
        opaque: true,
        pageParam: {dataId: dataId},
        vScrollBarEnabled: false
    });

}

summerready = function () {
    //'快递',1
     getRestData(summer.pageParam.type);
     
     summer.setRefreshHeaderInfo({
         visible: true,
         //bgColor: '#f2f2f2',
         textColor: '#4d4d4d',
         textDown: '下拉刷新...',
         textUp: '松开刷新...',
         showTime: true
     }, function (ret, err) {
         getRestData();
     });

}


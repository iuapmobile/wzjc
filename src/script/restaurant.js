summerready = function(){
    var header = $summer.byId('header');
    $summer.fixIos7Bar(header);
    var pos = $summer.offset(header);
    
    var dataId = summer.pageParam.dataId;
    summer.openFrame({
        name: 'restaurant-con',
        url: 'html/restaurant-con.html',
        pageParam:{dataId: dataId},
        rect:{
          x: 0,
          y: pos.h,
          w: 'auto',
          h: 'auto'
        },
        bounces: false,
        opaque: true,
        vScrollBarEnabled: false
    });

};
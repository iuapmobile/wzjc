summerready = function(){
    var header = $api.byId('header');
    //$api.fixIos7Bar(header);
    var pos = $api.offset(header);
    //alert(pos.h);//44
    api.openFrame({
        name: 'checkin-con',
        url: 'html/checkin-con.html',
        rect:{
            x: 0,
            y: pos.h,
            w: 'auto',
            h: 'auto'
        },
        bounces: true,
        vScrollBarEnabled: false
    });
};
summerready = function(){
    var header = $api.byId('header');
//    if(header){
//        $api.fixIos7Bar(header);
//    }
    var pos = $api.offset(header);



    var width=$summer.offset($summer.byId("body0")).w;
    var height=$summer.offset($summer.byId("body0")).h - pos.h;
    //alert(width+"|"+height)
                summer.window.openFrame({
                    "id":"tel-con",
                    "position":{
                        "left":0,
                        "top":pos.h,
                        "width":width,
                        "height":height
                     },
                    "animation":{},
                    "pageParam":{},
                    "url": 'html/tel-con.html'
                },null,null);

//    api.openFrame({
//        name: 'tel-con',
//        url: 'tel-con.html',
//        rect:{
//            x: 0,
//            y: pos.h,
//            w: 'auto',
//            h: 'auto'
//        },
//        bounces: true,
//        vScrollBarEnabled: false
//    });
};
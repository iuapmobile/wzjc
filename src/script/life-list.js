var opened = false;

function closeFramGroup(){
    api.closeFrameGroup({
        name: 'searchMer'
    });

    var actLi = $summer.dom('#main .submenu li.active');
    $summer.removeCls(actLi,'active');
    opened = false;
}

function searchMer(el,type){
    if(!el || !type){return;}

    var header = $summer.byId('main');
    var pos = $summer.offset(header);

    var index = 0;  //frame group index
    if(type === "type"){
        index = 1;
    }

    if(!opened){
        api.openFrameGroup ({
            name: 'searchMer',
            scrollEnabled: false,
            rect:{x: 0, y: pos.h, w: 'auto', h: 'auto'},
            index: index,
            frames:[{
                name: 'searchMerBy-city',
                url: 'searchMerBy-city.html',
                bounces: false,
                opaque: false,
                bgColor: 'rgba(51,51,51,0.6)',
                vScrollBarEnabled: false
            },{
                name: 'searchMerBy-type',
                url: 'searchMerBy-type.html',
                bounces: false,
                opaque: false,
                bgColor: 'rgba(51,51,51,0.6)',
                vScrollBarEnabled:false,
                pageParam:{type:api.pageParam.type}
            }]
        }, function(ret, err){
            
        });

        opened = true;
    }else{
        api.setFrameGroupIndex ({
            name: 'searchMer',
            index: index
            // ,scroll: true
        });
        api.setFrameGroupAttr({
            name: 'searchMer',
            hidden: false
        });
    }

    //toggle active style
    var curLi = el.parentNode;
    //close frame group
    if($summer.hasCls(curLi,'active')){
        
        api.setFrameGroupAttr({
            name: 'searchMer',
            hidden: true
        });
        
    }
    $summer.toggleCls(curLi,'active');

    var lis = $summer.domAll('#main .submenu li');
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

function changeCityTab(str){
    if(str){
        var title = $summer.dom('#submenu .city span');
        $summer.text(title, str);
    }
}

function changeTypeTab(str){
    if(str){
        var title = $summer.dom('#submenu .type span');
        $summer.text(title, str);
    }
}

summerready = function(){
    var header = $summer.byId('main');
    // $summer.fixIos7Bar(header);
    var pos = $summer.offset(header);
    var h1=$summer.dom(header,'h1');
    


    //$api.html(h1,summer.pageParam.title);
    $summer.html(h1,summer.pageParam.title);//获取前一个win传递过来的参数

    var width=$summer.offset($summer.byId("body0")).w;
    var height=$summer.offset($summer.byId("body0")).h - pos.h;
    //alert("width:"+width+"    height:"+height);
   summer.openFrame({
        id:"life-listCon",
        url: 'html/life-listCon.html',
        "position":{
            left: 0,
            top: pos.h + 4,
            width: $summer.offset($summer.byId("body0")).w,
            height: $summer.offset($summer.byId("body0")).h - pos.h
        },
        "animation":{},
        "pageParam": {
            type:summer.pageParam.type//获取前一个win传递过来的参数
        }
    },null,null);



    // api.openFrame({
    //     name: 'life-listCon',
    //     url: 'life-listCon.html',
    //     rect:{
    //       x: 0,
    //       y: pos.h + 4,
    //       w: 'auto',
    //       h: 'auto'
    //     },
    //     bounces: true,
    //     opaque: true,
    //     vScrollBarEnabled: false,
    //     pageParam:{
    //         type:api.pageParam.type
    //     }
    // });
};
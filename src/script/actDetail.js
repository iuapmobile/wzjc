summerready = function() {
	var height = 44;
    var dataId = summer.pageParam.dataId; //活动id
    summer.openFrame({
        name: 'actDetail-con',
        url: 'html/actDetail-con.html',
        pageParam:{dataId: dataId},
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        }
    });
    
    
/*
    //for iOS7 +
    var sys, ver, height = 44;
    sys = summer.systemType;
    if (sys === 'ios') {
        ver = summer.systemVersion;
        ver = parseInt(ver, 10);
        if (ver >= 7) {
            height += 20;
        }
    }
*/
    summer.openFrame({
        name: 'actDetail-head',
        url: 'html/actDetail-head.html',
        rect: {
            x: 0,
            y: 0,
            w: $summer.winWidth(),
            h: height
        },
        opaque: false
    });

};

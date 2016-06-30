
summerready = function(){
    var header = $summer.byId('header');
    $summer.fixIos7Bar(header);
	
	var newsId = summer.pageParam.newsId;
    var pos = $summer.offset(header);
    summer.openFrame({
        name: 'news-textCon',
        url: 'html/news-textCon.html',
        pageParam: {newsId: newsId},
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
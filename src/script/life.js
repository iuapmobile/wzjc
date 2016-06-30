function openLifeDetail(title,type){
    api.openWin({
        name: 'life-list',
        url: 'html/life-list.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam:{title:title,type:type}
    });
}

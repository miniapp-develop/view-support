const be = require('../DemoBehavior');

Page({
    data: {
        __name__: 'main'
    },
    behaviors: [be],
    onLoad(query) {
        console.log('Page.onLoad');
    },
    onShow() {
        console.log('Page.onShow');
    },
    onReady() {
        console.log('Page.onReady');
    },
    onHide() {
        console.log('Page.onHide');
    },
    onUnload() {
        console.log('Page.onUnload');
    },
    onResize() {
        console.log('Page.onResize');
    },
    log() {
        console.log('Page.log', this.data);
        this.__log__();
    },
    onTap(e) {
        this.log();
        const name = e.currentTarget.dataset.name;
        if (name === 'preset') {
            wx.navigateTo({
                url: '/pages/preset/main/index'
            });
        } else if (name === 'relation') {
            wx.navigateTo({
                url: '/pages/relation/main/index'
            });
        }
    }
});

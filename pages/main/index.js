const be = require('../DemoBehavior');

Page({
    data: {
        __name__: 'index'
    },
    behaviors: [be],
    onLoad(query) {
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

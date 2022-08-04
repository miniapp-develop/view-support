Page({
    onLoad(query) {
    },
    onTap(e) {
        const name = e.currentTarget.dataset.name;
        console.log(name)
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

const be = require('../../DemoBehavior');
Page({
    data: {
        __name__: 'relation',
        current: '1',
        current2: '1',
        miniData3: {
            active: 0
        }
    },
    behaviors: [be],
    onTapShowChild1(e) {
        this.setData({
            current: '1'
        });
    },
    onTapShowChild2(e) {
        this.setData({
            current: '2'
        });
    },
    onTap2(e) {
        const name = parseInt(e.currentTarget.dataset.name)
        this.setData({
            current2: name
        });
    }
});

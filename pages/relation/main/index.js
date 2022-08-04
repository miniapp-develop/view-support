Page({
    data: {
        active: 't1',
        active2: 0,
        miniData3: {
            active: 0
        }
    },
    onLoad() {

    },
    onTapShowChild1(e) {
        this.setData({
            active: 't1'
        });
    },
    onTapShowChild2(e) {
        this.setData({
            active: 't2'
        });
    },
    onTap2(e) {
        const name = parseInt(e.currentTarget.dataset.name)
        this.setData({
            active2: name
        });
    },
    onTap3(e) {
        const name = parseInt(e.currentTarget.dataset.name)
        this.setData({
            miniData3: {
                active: name
            }
        });
    }
});

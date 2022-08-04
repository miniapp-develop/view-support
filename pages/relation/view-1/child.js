const {MiniComponent} = require("../../../lib/index");

import {child} from './pc';

child({
    data: {
        active: false
    },
    methods: {
        onMiniChanged(newValue) {
            this.setData({
                childIndex: this.getMiniIndex(),
                active: newValue === this.data.miniData
            });
        },
        onTapCancel(e) {
            const parent = this.getMiniRelative();
            parent.notifyMiniChanged(this.data.miniData === 't1' ? 't2' : 't1');
        }
    }
}, MiniComponent);

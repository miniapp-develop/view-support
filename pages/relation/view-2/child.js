const {MiniComponent} = require("../../../lib/index");

import {child} from './pc';

child({
    data: {
        active: false
    },
    methods: {
        onMiniChanged(newValue) {
            const childIndex = this.getMiniIndex();
            this.setData({
                childIndex: childIndex,
                active: newValue === childIndex
            });
        }
    }
}, MiniComponent);

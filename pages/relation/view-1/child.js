const DemoComponent = require("../../DemoComponent");

import {child} from './pc';

child({
    properties: {
        current: {
            type: String,
            value: null
        }
    },
    data: {
        active: false
    },
    methods: {
        onRelationChanged(event, parent) {
            if (event === 'linked') {
                console.log('parent', parent.data.current);
            }
        },
        onParentDataChanged(current) {
            this.setData({
                active: this.data.current === current
            });
        }
    }
}, DemoComponent);

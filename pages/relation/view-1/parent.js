const DemoComponent = require("../../DemoComponent");

import {parent} from './pc';

parent({
    options: {virtualHost: true},
    properties: {
        current: {
            type: String,
            value: ''
        }
    },
    observers: {
        current(newValue) {
            const children = this.getRelationChildren();
            for (const child of children) {
                child.onParentDataChanged(newValue);
            }
        }
    },
    methods: {
        onRelationChanged(event, child) {
            if (event === 'linked') {
                child.setData({
                    text: event
                });
            }
        }
    }
}, DemoComponent);

const DemoComponent = require("../../DemoComponent");

import {parent} from './pc';

parent({
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

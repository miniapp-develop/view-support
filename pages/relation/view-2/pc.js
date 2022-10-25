const {Component} = require("../../../lib/presets");
const {createParentChild} = require("../../../lib/relations");
const defaults = require("../../../lib/defaults");
export const {parent, child} = createParentChild({debug: true});

export const ParentView = Component(
    defaults.MiniComponent,
    {
        properties: {
            current2: {
                type: String,
                value: ''
            }
        },
        observers: {
            current2(newValue) {
                const children = this.getRelationChildren();
                for (const child of children) {
                    child.onParentDataChanged(newValue);
                }
            }
        },
        methods: {
            onRelationChanged(event, child) {
                console.log('ParentView', this.data, event, child);
                if (event === 'linked') {
                    child.onParentDataChanged(this.data.current2);
                }
            }
        }
    },
    parent
);

export const ChildView = Component(
    defaults.MiniComponent,
    {
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
            onRelationChanged(event, target) {
                console.log('ChildBehavior', event, target);
                this.setData({
                    text: event
                })
            },
            onParentDataChanged(current) {
                console.log('onParentDataChanged', this.data.current, current)
                this.setData({
                    active: this.data.current === current
                });
            }
        }
    },
    child
);
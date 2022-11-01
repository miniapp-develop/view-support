const {Component} = require("../../../lib/presets");
const {PresetParentChild} = require("../../../lib/relations");
const defaults = require("../../../lib/defaults");
const {parent, children: [BaseChildView]} = PresetParentChild({name: 'parent-2'}, [{name: 'child-2-1'}]);

export const ParentView = Component(
    parent,
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
    }
);

export const ChildView = Component(
    BaseChildView,
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
    }
);
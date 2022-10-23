const {Component} = require("../../../lib/presets");
const {createParentChild} = require("../../../lib/relations");
export const {parent, child} = createParentChild({debug: true});

export const ParentView = Component({
    options: {virtualHost: true},
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
        onRelationChanged(event, target) {
            console.log('ParentView', event, target);
        }
    }
}, parent);

const ChildBehavior = Behavior({
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
            this.setData({
                active: this.data.current === current
            });
        }
    }
});

export const ChildView = Component({
    options: {virtualHost: true},
    behaviors: [ChildBehavior]
}, child);
const {Component} = require("../../../lib/presets");
const {createParentChild} = require("../../../lib/relations");
const DemoComponent = require("../../DemoComponent");
export const {parent, child} = createParentChild({debug: true});

export const ParentView = Component({
    options: {virtualHost: true}
}, DemoComponent, parent);

const ChildBehavior = Behavior({
    properties: {
        state: {
            type: String,
            value: ''
        },
        mode: {
            type: String,
            value: 'normal'
        }
    },
    methods: {
        onRelationChanged(event, target) {
        }
    }
});

export const ChildView = Component({
    options: {virtualHost: true},
    data: {
        active: false
    },
    behaviors: [ChildBehavior]
}, DemoComponent, child);
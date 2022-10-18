const {Component} = require("../../../lib/presets");
const {createParentChild} = require("../../../lib/relations");
export const {parent, child} = createParentChild({debug: true});

export const ParentView = Component({
    options: {virtualHost: true},
    methods: {
        onRelationChanged(event, target) {
            console.log('ParentView', event, target);
        }
    }
}, parent);

const ChildBehavior = Behavior({
    properties: {
        state: {
            type: String,
            value: ''
        }
    },
    methods: {
        onRelationChanged(event, target) {
            console.log('ChildBehavior', event, target);
        }
    }
});

export const ChildView = Component({
    options: {virtualHost: true},
    data: {
        active: false
    },
    behaviors: [ChildBehavior]
}, child);
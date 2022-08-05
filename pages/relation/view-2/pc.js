const {connectParentChildren, createPresetComponent, MiniComponent} = require("../../../lib/index");
export const {parent, child} = connectParentChildren({debug: true});

const Parent = createPresetComponent({
    options: {virtualHost: true}
});

export const ParentView = function (option, f = MiniComponent) {
    Parent(option, parent, f);
}

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
        onMiniChanged(newValue) {
            const childIndex = this.getMiniIndex();
            this.setData({
                childIndex: childIndex,
                active: newValue === childIndex
            });
        }
    }
});

const Child = createPresetComponent({
    options: {virtualHost: true},
    data: {
        active: false
    },
    behaviors: [ChildBehavior]
});

export const ChildView = function (option, f = MiniComponent) {
    Child(option, child, f);
}

const {connectParentChildren, createPresetComponent, MiniComponent} = require("../../../lib/index");
export const {parent, child} = connectParentChildren();

const Parent = createPresetComponent({
    options: {virtualHost: true}
});

export const ParentView = function (option, f = MiniComponent) {
    Parent(option, function (o) {
        parent(o, f)
    })
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
            console.log('changed')
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
    Child(option, function (o) {
        child(o, f)
    })
}

const b = Behavior({
    data: {
        BehaviorDataName: "BehaviorDataValue"
    },
    created() {
        console.log('Behavior.created');
    },
    attached() {
        console.log('Behavior.attached');
    },
    ready() {
        console.log('Behavior.ready');
    },
    moved() {
        console.log('Behavior.moved');
    },
    detached() {
        console.log('Behavior.detached');
    },
    error() {
        console.log('Behavior.error');
    },
    pageLifetimes: {
        show() {
            console.log('lifetimes.show');
        },
        hide() {
            console.log('lifetimes.hide');
        },
        resize(size) {
            console.log('lifetimes.resize');
        }
    },
    lifetimes: {
        created() {
            console.log('lifetimes.created');
        },
        attached() {
            console.log('lifetimes.attached');
        },
        ready() {
            console.log('lifetimes.ready');
        },
        moved() {
            console.log('lifetimes.moved');
        },
        detached() {
            console.log('lifetimes.detached');
        },
        error() {
            console.log('lifetimes.error');
        }
    },
    methods: {
        log() {
            console.log('Behavior.methods.log', this.data);
        },
        __log__() {
            console.log('Behavior.methods.__log__', this.data);
        }
    }
});

module.exports = b;
import {createPresetComponent} from "./helper";

function connect(master, slave, propertyName = 'miniData') {
    const randKey = Math.random().toString();
    const masterKey = 'master$' + randKey;
    const slaveKey = 'slave$' + randKey;

    const commonBehavior = Behavior({
        properties: {
            [propertyName]: {
                type: Object,
                optionalTypes: [String, Number],
                value: {}
            }
        }
    });

    const masterBehavior = Behavior({
        behaviors: [commonBehavior],
        properties: {
            _miniCount: {
                type: Number,
                value: 0
            },
            debug: {
                type: Boolean,
                value: false
            }
        },
        observers: {
            [propertyName](value) {
                this.handleMiniChanged(value);
            }
        },
        methods: {
            getMiniRelatives() {
                return this.getRelationNodes(slaveKey);
            },
            handleMiniChanged(value) {
                const slaveNodes = this.getMiniRelatives();
                for (const slaveNode of slaveNodes) {
                    slaveNode._onMiniChanged(value);
                }
            },
            notifyMiniChanged(value) {
                this.setData({
                    [propertyName]: value
                });
            }
        }
    });

    const slaveBehavior = Behavior({
        behaviors: [commonBehavior],
        methods: {
            _onMiniChanged(value) {
                if (this.data.debug) {
                    console.log('slaveBehavior#_onMiniChanged', value);
                }
                this.onMiniChanged(value);
            },
            getMiniIndex() {
                return this.data._miniIndex;
            },
            onMiniChanged(value) {
                if (this.data.debug) {
                    console.log('slaveBehavior#onMiniChanged', value);
                }
            },
            getMiniRelative() {
                return this.getRelationNodes(masterKey)[0];
            }
        }
    });

    const masterComponent = createPresetComponent({
        behaviors: [masterBehavior],
        relations: {
            [slaveKey]: {
                type: slave,
                target: slaveBehavior,
                linked(child) {
                    child.setData({
                        _miniIndex: this.data._miniCount
                    });
                    this.data._miniCount++;
                    child._onMiniChanged(this.data[propertyName]);
                }
            }
        }
    });

    const slaveComponent = createPresetComponent({
        behaviors: [slaveBehavior],
        data: {
            _miniIndex: -1
        },
        relations: {
            [masterKey]: {
                type: master,
                target: masterBehavior
            }
        }
    });

    return {
        masterComponent,
        slaveComponent
    }
}

export function connectParentChildren(propertyName) {
    const {masterComponent, slaveComponent} = connect('parent', 'child', propertyName);
    return {
        parent: masterComponent,
        child: slaveComponent
    }
}

export function connectAncestorDescendant(propertyName) {
    const {masterComponent, slaveComponent} = connect('ancestor', 'descendant', propertyName);
    return {
        ancestor: masterComponent,
        descendant: slaveComponent
    }
}
const {createPresetComponent} = require("./helper");

const DEFAULT_PROPERTY_NAME = 'miniData';

function connect(master, slave, option = {}) {
    let propertyName = 'miniData';
    let debug = false;
    if (typeof option === 'string') {
        propertyName = option;
    } else {
        propertyName = option.name || DEFAULT_PROPERTY_NAME;
        debug = !!option.debug;
    }
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
            }
        },
        observers: {
            [propertyName](value) {
                this._handleMiniChanged(value);
            }
        },
        methods: {
            _handleMiniChanged(value) {
                if (debug) {
                    console.log('master#_handleMiniChanged', masterKey, value);
                }
                const slaveNodes = this.getMiniRelatives();
                for (const slaveNode of slaveNodes) {
                    slaveNode._onMiniChanged(value);
                }
            },
            getMiniRelatives() {
                return this.getRelationNodes(slaveKey);
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
                if (debug) {
                    console.log('slave#_onMiniChanged', slaveKey, value);
                }
                if (this.onMiniChanged) {
                    this.onMiniChanged(value);
                }
            },
            getMiniIndex() {
                return this.data._miniIndex;
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

function connectParentChildren(option) {
    const {masterComponent, slaveComponent} = connect('parent', 'child', option);
    return {
        parent: masterComponent,
        child: slaveComponent
    }
}

function connectAncestorDescendant(option) {
    const {masterComponent, slaveComponent} = connect('ancestor', 'descendant', option);
    return {
        ancestor: masterComponent,
        descendant: slaveComponent
    }
}

exports.connectParentChildren = connectParentChildren;
exports.connectAncestorDescendant = connectAncestorDescendant;
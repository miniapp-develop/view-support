const presets = require('./presets')

function createRelation(masterType, slaveType) {
    const name = Math.random().toString() + '_' + Date.now();
    const slave = Behavior({});
    const masterWrapper = Behavior({
        relations: {
            [name]: {
                type: slaveType,
                target: slave,
                linked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linked', target);
                    }
                },
                linkChanged(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linkChanged', target);
                    }
                },
                unlinked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('unlinked', target);
                    }
                }
            }
        },
        methods: {
            getRelationChildren() {
                return this.getRelationNodes(name);
            }
        }
    });

    const slaveWrapper = Behavior({
        behaviors: [slave],
        relations: {
            [name]: {
                type: masterType,
                target: masterWrapper,
                linked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linked', target);
                    }
                },
                linkChanged(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linkChanged', target);
                    }
                },
                unlinked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('unlinked', target);
                    }
                }
            }
        },
        methods: {
            getRelationParent() {
                return this.getRelationNodes(name)[0];
            }
        }
    });
    return {
        master: masterWrapper,
        slave: slaveWrapper
    }
}

function createParentChild() {
    const {master, slave} = createRelation('parent', 'child');
    return {
        parent: presets.Component({behaviors: [master]}),
        child: presets.Component({behaviors: [slave]})
    }
}

function createAncestorDescendant() {
    const {master, slave} = createRelation('ancestor', 'descendant');
    return {
        ancestor: presets.Component({behaviors: [master]}),
        descendant: presets.Component({behaviors: [slave]})
    }
}

function _createRelation(parent, children) {
    const baseParentBehavior = Behavior({});
    const baseSlaveBehavior = Behavior({
        relations: {
            [parent]: {
                type: 'parent',
                target: baseParentBehavior,
                linked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linked', target);
                    }
                },
                linkChanged(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('linkChanged', target);
                    }
                },
                unlinked(target) {
                    if (this.onRelationChanged) {
                        this.onRelationChanged('unlinked', target);
                    }
                }
            }
        },
        methods: {
            getRelationParent() {
                return this.getRelationNodes(parent)[0];
            }
        }
    });

    const childrenBehaviors = [];
    for (const childName of children) {
        const childBehavior = Behavior({
            behaviors: [baseSlaveBehavior]
        });
        childrenBehaviors.push({
            name: childName,
            behavior: childBehavior
        });
    }

    const parentRelations = {
        __all__: {
            type: 'child',
            target: baseSlaveBehavior,
            linked(target) {
                if (this.onRelationChanged) {
                    this.onRelationChanged('linked', target);
                }
            },
            linkChanged(target) {
                if (this.onRelationChanged) {
                    this.onRelationChanged('linkChanged', target);
                }
            },
            unlinked(target) {
                if (this.onRelationChanged) {
                    this.onRelationChanged('unlinked', target);
                }
            }
        }
    };
    for (const childBehavior of childrenBehaviors) {
        parentRelations[childBehavior.name] = {
            type: 'child',
            target: childBehavior.behavior
        }
    }

    const parentBehavior = Behavior({
        relations: parentRelations,
        methods: {
            getRelationChildren(childName) {
                return this.getRelationNodes(childName || '__all__');
            }
        }
    });

    return {
        parent: parentBehavior,
        children: childrenBehaviors.map(ele => ele.behavior)
    }
}

exports.createRelation = _createRelation;

exports.createParentChild = createParentChild;
exports.createAncestorDescendant = createAncestorDescendant;

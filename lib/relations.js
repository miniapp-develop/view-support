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

function _getMasterRelationPair(masterRelation) {
    if (masterRelation === 'parent') {
        return 'child';
    } else if (masterRelation === 'ancestor') {
        return 'descendant';
    } else {
        throw Error(masterRelation + ' is not supported');
    }
}

function _createRelationBehaviors(master, slaves) {
    const baseMasterBehavior = Behavior({});
    const baseSlaveBehavior = Behavior({
        relations: {
            [master.name]: {
                type: master.relation,
                target: baseMasterBehavior,
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
                return this.getRelationNodes(master.name)[0];
            }
        }
    });

    const __all__ = '__all__' + Date.now();
    const masterRelations = {
        [__all__]: {
            type: _getMasterRelationPair(master.relation),
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

    for (const slave of slaves) {
        slave.behavior = Behavior({
            behaviors: [baseSlaveBehavior]
        });
        masterRelations[slave.name] = {
            type: slave.relation,
            target: slave.behavior
        }
    }

    const masterBehavior = Behavior({
        behaviors: [baseMasterBehavior],
        relations: masterRelations,
        methods: {
            getRelationChildren(childName) {
                return this.getRelationNodes(childName || __all__);
            }
        }
    });

    return {
        parent: masterBehavior,
        children: slaves.map(ele => ele.behavior)
    }
}

function ParentChild(parent, children) {
    return _createRelationBehaviors(
        {
            name: parent.name,
            relation: 'parent'
        },
        children.map(child => {
            return {
                name: child.name,
                relation: 'child'
            }
        })
    )
}

function AncestorDescendant(ancestor, descendants) {
    return _createRelationBehaviors(
        {
            name: ancestor.name,
            relation: 'ancestor'
        },
        descendants.map(child => {
            return {
                name: child.name,
                relation: 'descendant'
            }
        })
    )
}

function PresetParentChild(parentOption, childrenOptions) {
    const {parent, children} = ParentChild(parentOption, childrenOptions);
    return {
        parent: presets.Component({behaviors: [parent]}),
        children: children.map(child => {
            return presets.Component({behaviors: [child]});
        })
    };
}

function PresetAncestorDescendant(ancestorOption, descendantOptions) {
    const {parent, children} = AncestorDescendant(ancestorOption, descendantOptions);
    return {
        parent: presets.Component({behaviors: [parent]}),
        children: children.map(child => {
            return presets.Component({behaviors: [child]});
        })
    };
}

exports.ParentChild = ParentChild;
exports.AncestorDescendant = AncestorDescendant;
exports.PresetParentChild = PresetParentChild;
exports.PresetAncestorDescendant = PresetAncestorDescendant;
exports.createParentChild = createParentChild;
exports.createAncestorDescendant = createAncestorDescendant;

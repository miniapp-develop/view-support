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

function _createRelationBehaviors(master, slaves) {
    const baseParentBehavior = Behavior({});
    const baseSlaveBehavior = Behavior({
        relations: {
            [master.name]: {
                type: master.relation,
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
                return this.getRelationNodes(master)[0];
            }
        }
    });

    for (const slave of slaves) {
        slave.behavior = Behavior({
            behaviors: [baseSlaveBehavior]
        });
    }

    const __all__ = '__all__.' + Date.now();
    const parentRelations = {
        [__all__]: {
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

    for (const slave of slaves) {
        parentRelations[slave.name] = {
            type: slave.relation,
            target: slave.behavior
        }
    }

    const masterBehavior = Behavior({
        relations: parentRelations,
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

exports.ParentChild = function (parent, children) {
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
};
exports.AncestorDescendant = function (ancestor, descendants) {
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
};

exports.PresetedParentChild = function (parentOption, childrenOptions) {
    const {parent, children} = ParentChild(parentOption, childrenOptions);
    return {
        parent: presets.Component({behaviors: [parent]}),
        children: children.map(child => {
            return presets.Component({behaviors: [child]});
        })
    };
}

exports.PresetedAncestorDescendant = function (ancestorOption, descendantOptions) {
    const {parent, children} = AncestorDescendant(ancestorOption, descendantOptions);
    return {
        parent: presets.Component({behaviors: [parent]}),
        children: children.map(child => {
            return presets.Component({behaviors: [child]});
        })
    };
}
exports.createParentChild = createParentChild;
exports.createAncestorDescendant = createAncestorDescendant;

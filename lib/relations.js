const presets = require('./presets');

function createRelation(masterType, slaveType) {
    const name = Math.random().toString() + '_' + Date.now();
    const master = Behavior({});
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
    });
    const slaveWrapper = Behavior({
        behaviors: [slave],
        relations: {
            [name]: {
                type: masterType,
                target: master,
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
    });
    return {
        outer: masterWrapper,
        inner: slaveWrapper
    }
}

function createParentChild() {
    const {outer, inner} = createRelation('parent', 'child');
    return {
        parent: presets.Component(outer),
        child: presets.Component(inner),
    }
}

function createAncestorDescendant() {
    const {outer, inner} = createRelation('ancestor', 'descendant');
    return {
        ancestor: presets.Component(outer),
        descendant: presets.Component(inner),
    }
}

exports.createParentChild = createParentChild;
exports.createAncestorDescendant = createAncestorDescendant;

const presets = require('./presets');

function createParentChild() {
    const masterType = 'parent';
    const slaveType = 'child';
    const name = Math.random().toString() + '_' + Date.now();
    const master = Behavior({});
    const slave = Behavior({});
    const masterWrapper = Behavior({
        behaviors: [master],
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
        }
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
        }
    });
    return {
        parent: presets.Component({behaviors: [masterWrapper]}),
        child: presets.Component({behaviors: [slaveWrapper]})
    }
}

function createAncestorDescendant() {
    const masterType = 'ancestor';
    const slaveType = 'descendant';
    const name = Math.random().toString() + '_' + Date.now();
    const master = Behavior({});
    const slave = Behavior({});
    const masterWrapper = Behavior({
        behaviors: [master],
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
        ancestor: presets.Component({behaviors: [masterWrapper]}),
        descendant: presets.Component({behaviors: [slaveWrapper]})
    }
}

exports.createParentChild = createParentChild;
exports.createAncestorDescendant = createAncestorDescendant;

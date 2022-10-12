function createRelation(masterType, slaveType) {
    const name = Math.random().toString();
    const master = Behavior({});
    const slave = Behavior({});
    const masterWrapper = Behavior({
        relations: {
            [name]: {
                type: slaveType,
                target: slave,
                linked(target) {
                    if (this.onRelationLinked) {
                        this.onRelationLinked(target);
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
                target: master
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
        parent: outer,
        child: inner,
    }
}

function connectAncestorDescendant() {
    const {outer, inner} = createRelation('ancestor', 'descendant');
    return {
        parent: outer,
        child: inner,
    }
}

function mixin(...mixins) {
    return function (option, ...constructors) {

    }
}

exports.createParentChild = createParentChild;
exports.connectAncestorDescendant = connectAncestorDescendant;
exports.mixin = mixin;

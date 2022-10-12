const relation = require('../lib/relations');

global.Behavior = jest.fn();

describe('relation', () => {
    test('simple check', () => {
        const {parent, child} = relation.createParentChild();
        expect(parent).not.toBeNull();
        expect(child).not.toBeNull();
    });
});

// const ParentView = relation.mixin();
// const ChildView = relation.mixin();
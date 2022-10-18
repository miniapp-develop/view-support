const relation = require('../lib/relations');

global.Behavior = jest.fn();

describe('relation', () => {
    test('simple check createParentChild', () => {
        const {parent, child} = relation.createParentChild();
        expect(parent).not.toBeNull();
        expect(child).not.toBeNull();
    });
    test('simple check createAncestorDescendant', () => {
        const {ancestor, descendant} = relation.createAncestorDescendant();
        expect(ancestor).not.toBeNull();
        expect(descendant).not.toBeNull();
    });
});
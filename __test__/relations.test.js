const relation = require('../lib/relations');

global.Behavior = jest.fn();
global.Component = jest.fn();

describe('relation', () => {
    test('simple check createParentChild', () => {
        const {parent, child} = relation.createParentChild();
        expect(parent).toBeInstanceOf(Function);
        expect(child).toBeInstanceOf(Function);
    });
    test('simple check createAncestorDescendant', () => {
        const {ancestor, descendant} = relation.createAncestorDescendant();
        expect(ancestor).toBeInstanceOf(Function);
        expect(descendant).toBeInstanceOf(Function);
    });
});
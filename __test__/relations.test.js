const relation = require('../lib/relations');

describe('relation', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Component = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('1');
    });
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
    test('when create with config then return relation-behaviors', () => {
        const {parent, children} = relation.createRelation('form', ['input', "button", "picker"]);
        expect(parent).toEqual('1');
        expect(children).toEqual(['1', '1', '1']);
    });
});
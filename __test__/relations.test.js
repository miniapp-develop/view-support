const relation = require('../lib/relations');

describe('relation', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Component = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('1');
    });
    test('when create with parent and children then return relation-behaviors', () => {
        const {parent, children} = relation.ParentChild('form', ['input', "button", "picker"]);
        expect(parent).toEqual('1');
        expect(children).toEqual(['1', '1', '1']);
    });
    test('when create with ancestor and descendant then return relation-behaviors', () => {
        const {parent, children} = relation.AncestorDescendant('form', ['input', "button", "picker"]);
        expect(parent).toEqual('1');
        expect(children).toEqual(['1', '1', '1']);
    });
});
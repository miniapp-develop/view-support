const presets = require('../lib/presets');

describe('presets Page', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = () => {
            const fn = jest.fn();
            fn.mockReturnValue('/a/bcdef')
            return fn();
        };
    });
    test('when preset with nothing then apply undefined', () => {
        const NewPage = presets.Page();
        NewPage();
        expect(Page).toBeCalledTimes(1);
        expect(Page.mock.calls[0][0].name).toBeUndefined();
    });
    test('when preset with option then apply preset option', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage();
        expect(Page.mock.calls[0][0].name).toEqual('preset-value');
    });
    test('when preset with option then merge option.data', () => {
        const NewPage = presets.Page({
            data: {
                name1: 'preset-value'
            }
        });
        NewPage({
            data: {
                name2: 'newest-value'
            }
        });
        expect(Page.mock.calls[0][0].data).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('when preset with option then merge option.options', () => {
        const NewPage = presets.Page({
            options: {
                name1: 'preset-value'
            }
        });
        NewPage({
            options: {
                name2: 'newest-value'
            }
        });
        expect(Page.mock.calls[0][0].options).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('when preset with option then concat option.behaviors', () => {
        const NewPage = presets.Page({
            behaviors: [1]
        });
        NewPage({
            behaviors: [2]
        });
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([1, 2]);
    });
    test('when preset with option then merge different keys', () => {
        const NewPage = presets.Page({
            name1: 'preset-value'
        });
        NewPage({
            name2: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name1).toEqual('preset-value');
        expect(Page.mock.calls[0][0].name2).toEqual('newest-value');
    });
    test('when preset with option then override same key', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage({
            name: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name).toEqual('newest-value');
    });
    test('when preset with behavior then concat behavior', () => {
        const mockBehavior = Behavior({});
        const NewPage = presets.Page(mockBehavior);
        NewPage();
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([mockBehavior]);
    });
    test('when preset with factory then merge different keys', () => {
        const aOldPageFactory = presets.Page({
            presetName: 'old-factory-value'
        });
        const NewPage = presets.Page(aOldPageFactory);
        NewPage({
            newName: 'new-value'
        });
        expect(Page.mock.calls[0][0].presetName).toEqual('old-factory-value');
        expect(Page.mock.calls[0][0].newName).toEqual('new-value');
    });
    test('when preset with factory then override same keys', () => {
        const aOldPageFactory = presets.Page({
            presetName: 'old-factory-value',
            sameName: 'same-old-factory-value'
        });
        const NewPage = presets.Page(aOldPageFactory);
        NewPage({
            newName: 'new-value',
            sameName: 'same-new-value'
        });
        expect(Page.mock.calls[0][0].sameName).toEqual('same-new-value');
    });
    test('when preset with factory then merge option.data', () => {
        const aOldPageFactory = presets.Page({
            data: {
                presetName: 'old-factory-value',
                sameName: 'same-old-factory-value'
            }
        });
        const NewPage = presets.Page(aOldPageFactory);
        NewPage({
            data: {
                newName: 'new-value',
                sameName: 'same-new-value'
            }
        });
        expect(Page.mock.calls[0][0].data).toStrictEqual({
            presetName: 'old-factory-value',
            newName: 'new-value',
            sameName: 'same-new-value'
        });
    });
});
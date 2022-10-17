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
    test('when preset with options then merge different keys', () => {
        const option1 = {
            presetName1: 'preset-value-1'
        };
        const option2 = {
            presetName2: 'preset-value-2'
        };
        const NewPage = presets.Page(option1, option2);
        NewPage({
            newName: 'newest-value'
        });
        expect(Page.mock.calls[0][0].presetName1).toEqual('preset-value-1');
        expect(Page.mock.calls[0][0].presetName2).toEqual('preset-value-2');
        expect(Page.mock.calls[0][0].newName).toEqual('newest-value');
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
    test('when preset with multi options then override same keys', () => {
        const option1 = {
            presetName1: 'option1-value-1',
            sameName1: 'option1-same-name-1',
            sameName3: 'option1-same-name-3'
        };
        const option2 = {
            presetName2: 'option2-value-2',
            sameName1: 'option2-same-name-2',
            sameName2: 'option2-same-name-2'
        };
        const NewPage = presets.Page(option1, option2);
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
        expect(Page.mock.calls[0][0].presetName1).toEqual('option1-value-1');
        expect(Page.mock.calls[0][0].presetName2).toEqual('option2-value-2');
        expect(Page.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Page.mock.calls[0][0].sameName1).toEqual('option2-same-name-2');
        expect(Page.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Page.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
    test('when preset with behavior then concat behavior', () => {
        const mockBehavior = Behavior({});
        const NewPage = presets.Page(mockBehavior);
        NewPage();
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([mockBehavior]);
    });
    test('when preset with multi behaviors then concat behaviors', () => {
        const behavior1 = Behavior({});
        const behavior2 = Behavior({});
        const behavior3 = Behavior({});
        const NewPage = presets.Page(behavior1, behavior2, behavior3);
        NewPage();
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([behavior1, behavior2, behavior3]);
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
    test('when preset with multi factories then merge different keys', () => {
        const factory1 = presets.Page({
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        });
        const factory2 = presets.Page({
            presetName2: 'factory2-value-2',
            sameName1: 'factory2-same-name-2',
            sameName2: 'factory2-same-name-2'
        });
        const NewPage = presets.Page(factory1, factory2);
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
        expect(Page.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(Page.mock.calls[0][0].presetName2).toEqual('factory2-value-2');
        expect(Page.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Page.mock.calls[0][0].sameName1).toEqual('factory2-same-name-2');
        expect(Page.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Page.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
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
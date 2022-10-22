const presets = require('../lib/presets');

describe('Page with config-option', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('/bcdef');
    });
    test('when preset with nothing then do nothing', () => {
        const NewPage = presets.Page();
        NewPage({name: 'NewPage'});
        expect(Page).toBeCalledTimes(1);
        expect(Page.mock.calls[0][0].name).toEqual('NewPage');
    });

    test('when call with nothing then apply preset-option', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage();
        expect(Page.mock.calls[0][0].name).toEqual('preset-value');
    });

    test('when config-options have custom-properties then merge custom-properties', () => {
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

    test('when config-option has data-property then merge option.data', () => {
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

    test('when config-option has options-property then merge option.options', () => {
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

    test('when config-option has behaviors-property then concat option.behaviors', () => {
        const NewPage = presets.Page({
            behaviors: [1]
        });
        NewPage({
            behaviors: [2]
        });
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([1, 2]);
    });
});

describe('Page with factory-option', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('/bcdef');
    });
    test('when factory-option has custom-properties then merge custom-properties', () => {
        const aOldPageFactory = presets.Page({
            presetName: 'old-factory-value',
            sameName: 'same-old-factory-value'
        });
        const NewPage = presets.Page(aOldPageFactory);
        NewPage({
            newName: 'new-value',
            sameName: 'same-new-value'
        });
        expect(Page.mock.calls[0][0].presetName).toEqual('old-factory-value');
        expect(Page.mock.calls[0][0].newName).toEqual('new-value');
        expect(Page.mock.calls[0][0].sameName).toEqual('same-new-value');
    });
    test('when factory-options have custom-properties then merge custom-properties', () => {
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
    test('when config-option has data-property then merge option.data', () => {
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
    test('when config-options have data-property then merge option.data', () => {
        const factory1 = presets.Page({
            data: {
                presetName1: 'factory1-value-1',
                sameName1: 'factory1-same-name-1',
                sameName3: 'factory1-same-name-3'
            }
        });
        const factory2 = presets.Page({
            data: {
                presetName2: 'factory2-value-2',
                sameName1: 'factory2-same-name-2',
                sameName2: 'factory2-same-name-2'
            }
        });
        const factory3 = presets.Page({
            data: {
                presetName3: 'factory3-value-3',
                sameName1: 'factory3-same-name-3',
                sameName2: 'factory3-same-name-3'
            }
        });
        const NewPage = presets.Page(factory1, factory2, factory3);
        NewPage({
            data: {
                newName: 'newest-value',
                sameName2: 'newest-same-name-2',
                sameName3: 'newest-same-name-3'
            }
        });
        expect(Page.mock.calls[0][0].data).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName2: 'factory2-value-2',
            presetName3: 'factory3-value-3',
            newName: 'newest-value',
            sameName1: 'factory3-same-name-3',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
});

describe('Page with factory-option and config-option', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('/bcdef');
    });
    test('when config-option and factory-option have custom-properties then merge custom-properties', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        };
        const option2 = presets.Page({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3'
        });
        const NewPage = presets.Page(option1, option2);
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });

        expect(Page.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(Page.mock.calls[0][0].presetName3).toEqual('factory3-value-3');
        expect(Page.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Page.mock.calls[0][0].sameName1).toEqual('factory3-same-name-3');
        expect(Page.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Page.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
    test('when config-option and factory-option have custom-properties then merge custom-properties', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        };
        const option2 = presets.Page({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3'
        });
        const NewPage = presets.Page(option2, option1);
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });

        expect(Page.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(Page.mock.calls[0][0].presetName3).toEqual('factory3-value-3');
        expect(Page.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Page.mock.calls[0][0].sameName1).toEqual('factory1-same-name-1');
        expect(Page.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Page.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
});

describe('Page with added Constructor', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('/bcdef');
    });
    test('when constructor is provided then use the arg-constructor', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        };
        const option2 = presets.Page({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3'
        });
        const NewPage = presets.Page(option1, option2);
        const constructor = jest.fn();
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        }, constructor);

        expect(constructor.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(constructor.mock.calls[0][0].presetName3).toEqual('factory3-value-3');
        expect(constructor.mock.calls[0][0].newName).toEqual('newest-value');
        expect(constructor.mock.calls[0][0].sameName1).toEqual('factory3-same-name-3');
        expect(constructor.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(constructor.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
});
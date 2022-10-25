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

    test('when config-option has data-property then wrap with Behavior', () => {
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
        expect(Page.mock.calls[0][0]).toStrictEqual({
            data: {
                name2: 'newest-value'
            },
            behaviors: ['/bcdef']
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
        expect(Page.mock.calls[0][0]).toStrictEqual({
            options: {
                name1: 'preset-value',
                name2: 'newest-value'
            }
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
        global.Behavior = jest.fn()
            .mockReturnValueOnce('1')
            .mockReturnValueOnce('2')
            .mockReturnValueOnce('3')
            .mockReturnValueOnce('4')
            .mockReturnValueOnce('x');
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
        expect(Page.mock.calls[0][0]).toEqual({
            presetName: 'old-factory-value',
            newName: 'new-value',
            sameName: 'same-new-value'
        });
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
        expect(Page.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName2: 'factory2-value-2',
            sameName1: 'factory2-same-name-2',
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
    test('when config-option has data-property then wrap with Behavior', () => {
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
            },
            behaviors: ['/bcdef']
        });
    });
    test('when config-options have data-property then wrap with Behavior', () => {
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
        expect(Page.mock.calls[0][0]).toStrictEqual({
            data: {
                newName: 'newest-value',
                sameName2: 'newest-same-name-2',
                sameName3: 'newest-same-name-3'
            },
            behaviors: ['3', '2', '1']
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
            sameName3: 'factory1-same-name-31'
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
        expect(Page.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName3: 'factory3-value-3',
            newName: 'newest-value',
            sameName1: 'factory3-same-name-3',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
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
        })

        expect(Page.mock.calls[0][0]).toStrictEqual({
            presetName3: 'factory3-value-3',
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
});

describe('Page with added Constructor', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn()
            .mockReturnValueOnce('1')
            .mockReturnValueOnce('2')
            .mockReturnValue('x');
    });
    test('when constructor is provided then use the arg-constructor', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3',
            data: {}
        };
        const option2 = presets.Page({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3',
            data: {}
        });
        const NewPage = presets.Page(option1, option2);
        const constructor = jest.fn();
        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {}
        }, constructor);

        expect(constructor.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['2', '1']
        });
    });
});

describe('Page with compounded', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = jest.fn()
            .mockReturnValueOnce('1')
            .mockReturnValueOnce('2')
            .mockReturnValueOnce('3')
            .mockReturnValueOnce('4')
            .mockReturnValueOnce('5')
            .mockReturnValue('x');
    });
    test('when factory-option is compounded then treat compound-factory as a simple factory', () => {
        const option1 = presets.Page({
            presetName1: 'factory1-name-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3',
            data: {},
            behaviors: ['option1']
        });
        const option2 = presets.Page({
            presetName2: 'factory2-name-2',
            sameName1: 'factory2-same-name-3',
            sameName2: 'factory2-same-name-3',
            data: {},
            behaviors: ['option2']
        });
        const option3 = presets.Page({
            presetName3: 'factory3-name-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3',
            data: {},
            behaviors: ['option3']
        });
        const CompoundPage = presets.Page(option1, option2);
        const NewPage = presets.Page(CompoundPage, option3);

        NewPage({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['option4']
        });

        expect(Page.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-name-1',
            presetName2: 'factory2-name-2',
            presetName3: 'factory3-name-3',

            sameName1: 'factory3-same-name-3',

            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},

            behaviors: ['option1', '3', 'option2', '2', 'option3', '1', 'option4']
        });
    });
});
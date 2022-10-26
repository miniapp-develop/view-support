const presets = require('../lib/presets');

describe('presets Component', () => {
    beforeEach(() => {
        global.Component = jest.fn();
        global.Behavior = jest.fn().mockReturnValue('x');
    });
    test('when config-options have custom-properties then merge custom-properties', () => {
        const NewComponent = presets.Component({
            name1: 'preset-value'
        });
        NewComponent({
            name2: 'newest-value'
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('when config-option has data-property then wrap with Behavior', () => {
        const NewComponent = presets.Component({
            data: {
                name1: 'preset-value'
            }
        });
        NewComponent({
            data: {
                name2: 'newest-value'
            }
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            data: {
                name2: 'newest-value'
            },
            behaviors: ['x']
        });
    });
    test('when config-option has options-property then merge option.options', () => {
        const NewComponent = presets.Component({
            options: {
                name1: 'preset-value'
            }
        });
        NewComponent({
            options: {
                name2: 'newest-value'
            }
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            options: {
                name1: 'preset-value',
                name2: 'newest-value'
            }
        });
    });
    test('when config-option has behaviors-property then concat option.behaviors', () => {
        const NewComponent = presets.Component({
            behaviors: [1]
        });
        NewComponent({
            behaviors: [2]
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            behaviors: [1, 2]
        });
    });
    test('when config-option has externalClasses-property then concat option.externalClasses', () => {
        const NewComponent = presets.Component({
            externalClasses: [1]
        });
        NewComponent({
            externalClasses: [2]
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            externalClasses: [1, 2]
        });
    });
    test('when config-option has behavior-property then wrap with Behavior', () => {
        const NewComponent = presets.Component({
            properties: {
                name1: {
                    type: Array,
                    value: []
                }
            }
        });
        const observer2 = jest.fn();
        const observer3 = jest.fn();
        NewComponent({
            properties: {
                name2: {
                    type: Array,
                    value: []
                },
                name3: {
                    type: Array,
                    value: []
                }
            },
            observers: {
                'name2': observer2,
                'name3': observer3,
            },
            relations: {
                "name2": {
                    type: "parent_c",
                    target: "child_c",
                },
                "name3": {
                    type: "parent_d",
                    target: "child_d",
                }
            }
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            properties: {
                name2: {
                    type: Array,
                    value: []
                },
                name3: {
                    type: Array,
                    value: []
                }
            },
            observers: {
                'name2': observer2,
                'name3': observer3,
            },
            relations: {
                "name2": {
                    type: "parent_c",
                    target: "child_c",
                },
                "name3": {
                    type: "parent_d",
                    target: "child_d",
                }
            },
            behaviors: ['x']
        });
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
        const NewComponent = presets.Component(option1, option2);
        NewComponent({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            presetName1: 'option1-value-1',
            presetName2: 'option2-value-2',
            sameName1: 'option2-same-name-2',
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });

    test('when factory-option has custom-properties then merge custom-properties', () => {
        const aOldPageFactory = presets.Component({
            presetName: 'old-factory-value',
            sameName: 'same-old-factory-value'
        });
        const NewComponent = presets.Component(aOldPageFactory);
        NewComponent({
            newName: 'new-value',
            sameName: 'same-new-value'
        });
        expect(Component.mock.calls[0][0]).toEqual({
            presetName: 'old-factory-value',
            newName: 'new-value',
            sameName: 'same-new-value'
        });
    });
    test('when factory-options have custom-properties then merge custom-properties', () => {
        const factory1 = presets.Component({
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        });
        const factory2 = presets.Component({
            presetName2: 'factory2-value-2',
            sameName1: 'factory2-same-name-2',
            sameName2: 'factory2-same-name-2'
        });
        const NewComponent = presets.Component(factory1, factory2);
        NewComponent({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName2: 'factory2-value-2',
            sameName1: 'factory2-same-name-2',
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
    test('when factory-option has data-property then wrap with Behavior', () => {
        const aOldPageFactory = presets.Component({
            data: {
                presetName: 'old-factory-value',
                sameName: 'same-old-factory-value'
            }
        });
        const NewComponent = presets.Component(aOldPageFactory);
        NewComponent({
            data: {
                newName: 'new-value',
                sameName: 'same-new-value'
            }
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            data: {
                newName: 'new-value',
                sameName: 'same-new-value'
            },
            behaviors: ['x']
        });
    });
    test('when factory-options have data-property then wrap with Behavior', () => {
        const factory1 = presets.Component({
            data: {
                presetName1: 'factory1-value-1',
                sameName1: 'factory1-same-name-1',
                sameName3: 'factory1-same-name-3'
            }
        });
        const factory2 = presets.Component({
            data: {
                presetName2: 'factory2-value-2',
                sameName1: 'factory2-same-name-2',
                sameName2: 'factory2-same-name-2'
            }
        });
        const factory3 = presets.Component({
            data: {
                presetName3: 'factory3-value-3',
                sameName1: 'factory3-same-name-3',
                sameName2: 'factory3-same-name-3'
            }
        });
        const NewComponent = presets.Component(factory1, factory2, factory3);
        NewComponent({
            data: {
                newName: 'newest-value',
                sameName2: 'newest-same-name-2',
                sameName3: 'newest-same-name-3'
            }
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            data: {
                newName: 'newest-value',
                sameName2: 'newest-same-name-2',
                sameName3: 'newest-same-name-3'
            },
            behaviors: ['x', 'x', 'x']
        });
    });
    test('when config-option and factory-option have custom-properties then merge custom-properties', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3'
        };
        const option2 = presets.Component({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3'
        });
        const NewComponent = presets.Component(option1, option2);
        NewComponent({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
        expect(Component.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName3: 'factory3-value-3',
            newName: 'newest-value',
            sameName1: 'factory3-same-name-3',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
});

describe('Component with added Constructor', () => {
    beforeEach(() => {
        global.Component = jest.fn();
        global.Behavior = jest.fn()
            .mockReturnValueOnce('1')
            .mockReturnValueOnce('2')
            .mockReturnValue('x');
    });
    test('when constructor is provided then apply constructor', () => {
        const option1 = {
            presetName1: 'factory1-value-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3',
            data: {}
        };
        const option2 = presets.Component({
            presetName3: 'factory3-value-3',
            sameName1: 'factory3-same-name-3',
            sameName2: 'factory3-same-name-3',
            data: {}
        });
        const NewComponent = presets.Component(option1, option2);
        const constructor = jest.fn();
        NewComponent({
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
})

describe('Component with compounded', () => {
    let option1;
    let option2;
    let option3;
    let option4;
    beforeEach(() => {
        global.Component = jest.fn();
        global.Behavior = jest.fn()
            .mockReturnValueOnce('1')
            .mockReturnValueOnce('2')
            .mockReturnValueOnce('3')
            .mockReturnValueOnce('4')
            .mockReturnValueOnce('5')
            .mockReturnValueOnce('6')
            .mockReturnValue('x');
        option1 = presets.Component({
            presetName1: 'factory1-name-1',
            sameName1: 'factory1-same-name-1',
            sameName3: 'factory1-same-name-3',
            data: {},
            behaviors: ['option1']
        });

        option2 = presets.Component({
            presetName2: 'factory2-name-2',
            sameName1: 'factory2-same-name-1',
            sameName2: 'factory2-same-name-2',
            data: {},
            behaviors: ['option2']
        });

        option3 = presets.Component({
            presetName3: 'factory3-name-3',
            sameName1: 'factory3-same-name-1',
            sameName2: 'factory3-same-name-2',
            data: {},
            behaviors: ['option3']
        });

        option4 = presets.Component({
            presetName4: 'factory4-name-4',
            sameName1: 'factory4-same-name-1',
            sameName2: 'factory4-same-name-2',
            data: {},
            behaviors: ['option4']
        });
    });
    test('when factory-option is compounded then treat compound-factory as a simple factory', () => {
        const CompoundComponent = presets.Component(option1, option2);
        const NewComponent1 = presets.Component(CompoundComponent, option3);
        const NewComponent2 = presets.Component(CompoundComponent, option4);
        NewComponent1({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['option5']
        });
        NewComponent2({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['option5']
        });

        expect(Component.mock.calls[0][0]).toStrictEqual({
            presetName1: 'factory1-name-1',
            presetName2: 'factory2-name-2',
            presetName3: 'factory3-name-3',

            sameName1: 'factory3-same-name-1',

            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},

            behaviors: ['option1', '3', 'option2', '2', 'option3', '1', 'option5']
        });
    });
    test('when factory-option is compounded then treat compound-factory as a simple factory', () => {
        const CompoundComponent = presets.Component(option1, option2);
        const NewComponent1 = presets.Component(CompoundComponent, option3);
        const NewComponent2 = presets.Component(CompoundComponent, option4);
        NewComponent1({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['option5']
        });
        NewComponent2({
            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},
            behaviors: ['option5']
        });

        expect(Component.mock.calls[1][0]).toStrictEqual({
            presetName1: 'factory1-name-1',
            presetName2: 'factory2-name-2',
            presetName4: 'factory4-name-4',

            sameName1: 'factory4-same-name-1',

            newName: 'newest-value',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3',
            data: {},

            behaviors: ['option1', '6', 'option2', '5', 'option4', '4', 'option5']
        });
    });
});
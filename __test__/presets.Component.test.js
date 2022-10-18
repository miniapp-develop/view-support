const presets = require('../lib/presets');

describe('presets Component', () => {
    beforeEach(() => {
        global.Component = jest.fn();
    });
    test('when preset with option then merge keys', () => {
        const NewComponent = presets.Component({
            name1: 'preset-value'
        });
        NewComponent({
            name2: 'newest-value'
        });
        expect(Component.mock.calls[0][0].name1).toEqual('preset-value');
        expect(Component.mock.calls[0][0].name2).toEqual('newest-value');
    });
    test('when preset with option then merge option.data', () => {
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
        expect(Component.mock.calls[0][0].data).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('when preset with option then merge option.options', () => {
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
        expect(Component.mock.calls[0][0].options).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('when preset with option then concat option.behaviors', () => {
        const NewComponent = presets.Component({
            behaviors: [1]
        });
        NewComponent({
            behaviors: [2]
        });
        expect(Component.mock.calls[0][0].behaviors).toStrictEqual([1, 2]);
    });
    test('when preset with option then concat option.externalClasses', () => {
        const NewComponent = presets.Component({
            externalClasses: [1]
        });
        NewComponent({
            externalClasses: [2]
        });
        expect(Component.mock.calls[0][0].externalClasses).toStrictEqual([1, 2]);
    });
    test('when preset with option then merge option.properties', () => {
        const NewComponent = presets.Component({
            properties: {
                name1: {
                    type: Array,
                    value: []
                },
                name2: {
                    type: String,
                    value: ''
                }
            }
        });
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
            }
        });
        expect(Component.mock.calls[0][0].properties).toStrictEqual({
            name1: {
                type: Array,
                value: []
            },
            name2: {
                type: Array,
                value: []
            },
            name3: {
                type: Array,
                value: []
            }
        });
    });
    test('when preset with option then merge option.observers', () => {
        const observer1 = jest.fn();
        const observer2 = jest.fn();
        const observer3 = jest.fn();
        const observer4 = jest.fn();
        const NewComponent = presets.Component({
            observers: {
                'name1': observer1,
                'name2': observer2,
            }
        });
        NewComponent({
            observers: {
                'name2': observer3,
                'name3': observer4,
            }
        });
        expect(Component.mock.calls[0][0].observers).toStrictEqual({
            'name1': observer1,
            'name2': observer3,
            'name3': observer4,
        });
    });
    test('when preset with option then merge option.relations', () => {
        const NewComponent = presets.Component({
            relations: {
                "name1": {
                    type: "parent_a",
                    target: "child_a",
                },
                "name2": {
                    type: "parent_b",
                    target: "child_b",
                }
            }
        });
        NewComponent({
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
        expect(Component.mock.calls[0][0].relations).toStrictEqual({
            "name1": {
                type: "parent_a",
                target: "child_a",
            },
            "name2": {
                type: "parent_c",
                target: "child_c",
            },
            "name3": {
                type: "parent_d",
                target: "child_d",
            }
        });
    });
    test('when preset with multi options then merge keys', () => {
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
        expect(Component.mock.calls[0][0].presetName1).toEqual('option1-value-1');
        expect(Component.mock.calls[0][0].presetName2).toEqual('option2-value-2');
        expect(Component.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Component.mock.calls[0][0].sameName1).toEqual('option2-same-name-2');
        expect(Component.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Component.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
    test('when preset with a single factory then merge keys', () => {
        const aOldPageFactory = presets.Component({
            presetName: 'old-factory-value',
            sameName: 'same-old-factory-value'
        });
        const NewComponent = presets.Component(aOldPageFactory);
        NewComponent({
            newName: 'new-value',
            sameName: 'same-new-value'
        });
        expect(Component.mock.calls[0][0].sameName).toEqual('same-new-value');
    });
    test('when preset with multi factories then merge keys', () => {
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
        expect(Component.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(Component.mock.calls[0][0].presetName2).toEqual('factory2-value-2');
        expect(Component.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Component.mock.calls[0][0].sameName1).toEqual('factory2-same-name-2');
        expect(Component.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Component.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
    test('when preset with factory then merge option.data', () => {
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
        expect(Component.mock.calls[0][0].data).toStrictEqual({
            presetName: 'old-factory-value',
            newName: 'new-value',
            sameName: 'same-new-value'
        });
    });
    test('when preset with multi factories then merge option.data', () => {
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
        expect(Component.mock.calls[0][0].data).toStrictEqual({
            presetName1: 'factory1-value-1',
            presetName2: 'factory2-value-2',
            presetName3: 'factory3-value-3',
            newName: 'newest-value',
            sameName1: 'factory3-same-name-3',
            sameName2: 'newest-same-name-2',
            sameName3: 'newest-same-name-3'
        });
    });
    test('when preset with option&factory then merge keys', () => {
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

        expect(Component.mock.calls[0][0].presetName1).toEqual('factory1-value-1');
        expect(Component.mock.calls[0][0].presetName3).toEqual('factory3-value-3');
        expect(Component.mock.calls[0][0].newName).toEqual('newest-value');
        expect(Component.mock.calls[0][0].sameName1).toEqual('factory3-same-name-3');
        expect(Component.mock.calls[0][0].sameName2).toEqual('newest-same-name-2');
        expect(Component.mock.calls[0][0].sameName3).toEqual('newest-same-name-3');
    });
    test('when constructor is provided then apply constructor', () => {
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
        const constructor = jest.fn();
        NewComponent({
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
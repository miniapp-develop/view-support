const merges = require('../lib/merges');

describe('mergePageOption', () => {
    beforeEach(() => {
        global.Behavior = jest.fn();
        global.Behavior.mockReturnValue('xyz');
    });
    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption).toStrictEqual({});
    });

    test('when presetOption has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const presetOption = {
            __attr__: 'presetOption.__attr__',
            options: {
                'options-key': 'presetOption.options.value'
            },
            data: {
                'data-key': 'presetOption.data.value'
            },
            behaviors: ['presetOption.behavior.1'],
            onLoad(query) {
            },
            onShow() {
            },
            onReady() {
            },
            onHide() {
            },
            onUnload() {
            },
            onResize() {
            },
            pageMethod() {
            }
        };
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);

        expect(global.Behavior).toBeCalledTimes(1);

        expect(mergedOption.__attr__).toBe('presetOption.__attr__');
        expect(mergedOption.options).toStrictEqual({'options-key': 'presetOption.options.value'});

        expect(mergedOption.behaviors).toStrictEqual(['presetOption.behavior.1', 'xyz']);

        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({'data-key': 'presetOption.data.value'});
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show', 'hide', 'resize']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'onUnload', 'pageMethod']);
    });

    test('when inputOption has BehaviorOwnProperty then change nothing', () => {
        const presetOption = null;
        const inputOption = {
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value'
            },
            behaviors: ['inputOption.behavior.1'],
            onLoad(query) {
            },
            onShow() {
            },
            onReady() {
            },
            onHide() {
            },
            onUnload() {
            },
            onResize() {
            },
            pageMethod() {
            }
        };
        const mergedOption = merges.mergePageOption(presetOption, inputOption);

        expect(global.Behavior).toBeCalledTimes(0);

        expect(mergedOption.__attr__).toBe('inputOption.__attr__');
        expect(mergedOption.options).toStrictEqual({'options-key': 'inputOption.options.value'});
        expect(mergedOption.data).toStrictEqual({'data-key': 'inputOption.data.value'});
        expect(mergedOption.behaviors).toStrictEqual(['inputOption.behavior.1']);
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const presetOption = {
            __attr__: 'presetOption.__attr__',
            options: {
                'preset-options-key': 'presetOption.options.value'
            },
            data: {
                'preset-data-key': 'presetOption.data.value'
            },
            behaviors: ['presetOption.behavior.1'],
            onLoad(query) {
            },
            onShow() {
            },
            onReady() {
            },
            pageMethod() {
            }
        };
        const inputOption = {
            __attr__: 'inputOption.__attr__',
            options: {
                'input-options-key': 'inputOption.options.value'
            },
            data: {
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['inputOption.behavior.1'],
            onShow() {
            },
            onUnload() {
            },
            pageMethod() {
            }
        };
        const mergedOption = merges.mergePageOption(presetOption, inputOption);

        expect(global.Behavior).toBeCalledTimes(1);

        expect(mergedOption.__attr__).toBe('inputOption.__attr__');
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'presetOption.options.value',
            'input-options-key': 'inputOption.options.value'
        });
        expect(mergedOption.data).toStrictEqual({
            'input-data-key': 'inputOption.data.value'
        });

        expect(mergedOption.behaviors).toStrictEqual(['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1']);

        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({'preset-data-key': 'presetOption.data.value'});
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'pageMethod']);
    });
});

describe('mergeComponentOption', () => {
    beforeEach(() => {
        global.Behavior = jest.fn().mockReturnValue('xyz');
    });
    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption).toStrictEqual({});
    });

    test('when presetOption has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const presetOption = {
            __attr__: 'presetOption.__attr__',
            options: {
                'preset-options-key': 'presetOption.options.value'
            },
            data: {
                'preset-data-key': 'presetOption.data.value'
            },
            behaviors: ['presetOption.behavior.1'],
            externalClasses: ['presetOption-class-1'],
            properties: {},
            observers: {},
            relations: {},
            methods: {},
            created() {
            },
            attached() {
            },
            ready() {
            },
            moved() {
            },
            detached() {
            },
            lifetimes() {
            },
            pageLifetimes() {
            }
        };
        const inputOption = null;
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);

        expect(global.Behavior).toBeCalledTimes(1);
        expect(mergedOption.__attr__).toBe('presetOption.__attr__');
        expect(mergedOption.options).toStrictEqual({'preset-options-key': 'presetOption.options.value'});
        expect(mergedOption.externalClasses).toStrictEqual(['presetOption-class-1']);

        expect(mergedOption.behaviors).toStrictEqual(['presetOption.behavior.1', 'xyz']);

        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(theFirstBehaviorCall[0].data).toStrictEqual({'preset-data-key': 'presetOption.data.value'});
        const expectedArray = expect.arrayContaining([
            'data',
            'properties',
            'observers',
            'relations',
            'methods',
            'created', 'attached', 'ready', 'moved', 'detached',
            'lifetimes', 'pageLifetimes'
        ]);
        expect(Object.keys(theFirstBehaviorCall[0])).toEqual(expectedArray);
        expect(expectedArray).toEqual(Object.keys(theFirstBehaviorCall[0]));
    })

    test('when inputOption has BehaviorOwnProperty then change nothing', () => {
        const presetOption = null;
        const inputOption = {
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value'
            },
            behaviors: ['inputOption.behavior.1'],
            externalClasses: ['inputOption-class-1'],
            properties: {},
            observers: {},
            relations: {},
            methods: {},
            created() {
            },
            attached() {
            },
            ready() {
            },
            moved() {
            },
            detached() {
            },
            lifetimes() {
            },
            pageLifetimes() {
            }
        };
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(global.Behavior).toBeCalledTimes(0)

        expect(mergedOption.__attr__).toBe('inputOption.__attr__');
        expect(mergedOption.options).toStrictEqual({'options-key': 'inputOption.options.value'});
        expect(mergedOption.externalClasses).toStrictEqual(['inputOption-class-1']);

        expect(mergedOption.behaviors).toStrictEqual(['inputOption.behavior.1']);
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const presetOption = {
            __attr__1: 'presetOption.__attr__',
            options: {
                'presetOption-options-key': 'presetOption-options-value'
            },
            externalClasses: ['presetOption-class-1'],
            data: {
                'presetOption-data-key': 'presetOption-data-value'
            },
            properties: {},
            behaviors: ['presetOption.behavior.1'],
            created() {
            },
            attached() {
            },
            ready() {
            },
            moved() {
            },
            detached() {
            },
            lifetimes() {
            },
            pageLifetimes() {
            }
        };

        const inputOption = {
            __attr__2: 'inputOption.__attr__',
            options: {
                'inputOption-options-key': 'inputOption-options-value'
            },
            externalClasses: ['inputOption-class-1'],
            data: {
                'inputOption-data-key': 'inputOption-data-value'
            },
            properties: {},
            behaviors: ['inputOption.behavior.1'],
            observers: {},
            relations: {},
            methods: {}
        };
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption.__attr__1).toBe('presetOption.__attr__');
        expect(mergedOption.__attr__2).toBe('inputOption.__attr__');
        expect(mergedOption.options).toStrictEqual({
            'presetOption-options-key': 'presetOption-options-value',
            'inputOption-options-key': 'inputOption-options-value'
        });
        expect(mergedOption.externalClasses).toStrictEqual(['presetOption-class-1', "inputOption-class-1"]);
        expect(mergedOption.behaviors).toStrictEqual(['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1']);

        expect(global.Behavior).toBeCalledTimes(1);

        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(theFirstBehaviorCall[0].data).toStrictEqual({'presetOption-data-key': 'presetOption-data-value'});
        const expectedFirstArray = expect.arrayContaining([
            'data',
            'properties',
            'created', 'attached', 'ready', 'moved', 'detached',
            'lifetimes', 'pageLifetimes'
        ]);
        expect(Object.keys(theFirstBehaviorCall[0])).toEqual(expectedFirstArray);
        expect(expectedFirstArray).toEqual(Object.keys(theFirstBehaviorCall[0]));
    });
});
const merges = require('../lib/merges');

describe('mergePageOption', () => {
    beforeEach(() => {
        global.Behavior = jest.fn();
        global.Behavior.mockReturnValue('/a/b/c/d/e/f');
    });
    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({});
        expect(mergedOption.behaviors).toStrictEqual([]);
    });

    test('when presetOption has BehaviorOwnProperty then wrap a new Behavior', () => {
        const presetOption = {
            options: {
                'preset-options-key': 'preset-options-value'
            },
            data: {
                'preset-data-key': 'preset-data-value'
            },
            behaviors: ['a'],
            onLoad(query) {
                console.log('Page.onLoad');
            },
            onShow() {
                console.log('Page.onShow');
            },
            onReady() {
                console.log('Page.onReady');
            },
            onHide() {
                console.log('Page.onHide');
            },
            onUnload() {
                console.log('Page.onUnload');
            },
            onResize() {
                console.log('Page.onResize');
            },
            pageMethod() {
                console.log('Page.pageMethod');
            },
            __attr__: 'a-string'
        };
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'preset-options-value'
        });
        expect(mergedOption.__attr__).toBe('a-string');
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);

        expect(global.Behavior).toBeCalledTimes(1);
        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({
            'preset-data-key': 'preset-data-value'
        });
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show', 'hide', 'resize']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'onUnload', 'pageMethod']);
    });

    test('when inputOption has BehaviorOwnProperty then wrap a new Behavior', () => {
        const presetOption = null;
        const inputOption = {
            options: {
                'preset-options-key': 'preset-options-value'
            },
            data: {
                'preset-data-key': 'preset-data-value'
            },
            behaviors: ['a'],
            onLoad(query) {
                console.log('Page.onLoad');
            },
            onShow() {
                console.log('Page.onShow');
            },
            onReady() {
                console.log('Page.onReady');
            },
            onHide() {
                console.log('Page.onHide');
            },
            onUnload() {
                console.log('Page.onUnload');
            },
            onResize() {
                console.log('Page.onResize');
            },
            pageMethod() {
                console.log('Page.pageMethod');
            },
            __attr__: 'a-string'
        };
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'preset-options-value'
        });
        expect(mergedOption.__attr__).toBe('a-string');
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);

        expect(global.Behavior).toBeCalledTimes(1);
        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({
            'preset-data-key': 'preset-data-value'
        });
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show', 'hide', 'resize']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'onUnload', 'pageMethod']);
    });
    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap two Behavior', () => {
        const presetOption = {
            options: {
                'preset-options-key': 'preset-options-value'
            },
            data: {
                'preset-data-key': 'preset-data-value'
            },
            behaviors: ['preset-1'],
            onLoad(query) {
                console.log('Page.onLoad');
            },
            onShow() {
                console.log('Page.onShow');
            },
            onReady() {
                console.log('Page.onReady');
            },
            pageMethod() {
                console.log('Page.pageMethod');
            },
            __attr__: 'a-preset-string'
        };
        const inputOption = {
            options: {
                'input-options-key': 'input-options-value'
            },
            data: {
                'input-data-key': 'input-data-value'
            },
            behaviors: ['input-1'],
            onShow() {
                console.log('Page.onShow');
            },
            onUnload() {
                console.log('Page.onUnload');
            },
            pageMethod() {
                console.log('Page.pageMethod');
            },
            __attr__: 'a-input-string'
        };
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'preset-options-value',
            'input-options-key': 'input-options-value'
        });
        expect(mergedOption.__attr__).toBe('a-input-string');
        expect(mergedOption.behaviors).toStrictEqual(['preset-1', '/a/b/c/d/e/f', 'input-1', "/a/b/c/d/e/f"]);

        expect(global.Behavior).toBeCalledTimes(2);

        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({
            'preset-data-key': 'preset-data-value'
        });
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'pageMethod']);

        expect(global.Behavior.mock.calls[1][0].data).toStrictEqual({
            'input-data-key': 'input-data-value'
        });
        expect(Object.keys(global.Behavior.mock.calls[1][0].pageLifetimes)).toEqual(['show']);
        expect(global.Behavior.mock.calls[1][0].lifetimes).toBeUndefined();
        expect(Object.keys(global.Behavior.mock.calls[1][0].methods)).toEqual(['onUnload', 'pageMethod']);
    });
});

describe('mergeComponentOption', () => {
    beforeEach(() => {
        global.Behavior = jest.fn().mockReturnValue('/a/b/c/d/e/f');
    });
    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({});
        expect(mergedOption.externalClasses).toStrictEqual([]);
        expect(mergedOption.behaviors).toStrictEqual([]);
        expect(mergedOption.data).toBeUndefined();
        expect(mergedOption.properties).toBeUndefined();
        expect(mergedOption.observers).toBeUndefined();
        expect(mergedOption.relations).toBeUndefined();
        expect(mergedOption.methods).toBeUndefined();
    });

    test('when presetOption has BehaviorOwnProperty then wrap a new Behavior', () => {
        const presetOption = {
            __attr__: '__attr__.value',
            options: {
                'preset-options-key': 'preset-options-value'
            },
            externalClasses: ['class-1'],
            data: {
                'preset-data-key': 'preset-data-value'
            },
            properties: {},
            behaviors: ['a'],
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
        expect(mergedOption.__attr__).toBe('__attr__.value');
        expect(mergedOption.options).toStrictEqual({'preset-options-key': 'preset-options-value'});
        expect(mergedOption.externalClasses).toStrictEqual(['class-1']);
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);

        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(global.Behavior).toBeCalledTimes(1);
        expect(theFirstBehaviorCall[0].data).toStrictEqual({'preset-data-key': 'preset-data-value'});
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
    });
    test('when inputOption has BehaviorOwnProperty then wrap a new Behavior', () => {
        const presetOption = null;
        const inputOption = {
            __attr__: '__attr__.value',
            options: {
                'preset-options-key': 'preset-options-value'
            },
            externalClasses: ['class-1'],
            data: {
                'preset-data-key': 'preset-data-value'
            },
            properties: {},
            behaviors: ['a'],
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
        expect(mergedOption.__attr__).toBe('__attr__.value');
        expect(mergedOption.options).toStrictEqual({'preset-options-key': 'preset-options-value'});
        expect(mergedOption.externalClasses).toStrictEqual(['class-1']);
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);

        expect(global.Behavior).toBeCalledTimes(1);
        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(theFirstBehaviorCall[0].data).toStrictEqual({'preset-data-key': 'preset-data-value'});
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
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap two new Behavior', () => {
        const presetOption = {
            __attr__1: '__attr__1.value',
            options: {
                'presetOption-options-key': 'presetOption-options-value'
            },
            externalClasses: ['class-1'],
            data: {
                'presetOption-data-key': 'presetOption-data-value'
            },
            properties: {},
            behaviors: ['a'],
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
            __attr__2: '__attr__2.value',
            options: {
                'inputOption-options-key': 'inputOption-options-value'
            },
            externalClasses: ['class-2'],
            data: {
                'inputOption-data-key': 'inputOption-data-value'
            },
            properties: {},
            behaviors: ['b'],
            observers: {},
            relations: {},
            methods: {}
        };
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption.__attr__1).toBe('__attr__1.value');
        expect(mergedOption.__attr__2).toBe('__attr__2.value');
        expect(mergedOption.options).toStrictEqual({
            'presetOption-options-key': 'presetOption-options-value',
            'inputOption-options-key': 'inputOption-options-value'
        });
        expect(mergedOption.externalClasses).toStrictEqual(['class-1', "class-2"]);
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f', 'b', '/a/b/c/d/e/f']);

        expect(global.Behavior).toBeCalledTimes(2);

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

        const theSecondBehaviorCall = global.Behavior.mock.calls[1];
        expect(theSecondBehaviorCall[0].data).toStrictEqual({'inputOption-data-key': 'inputOption-data-value'});
        const expectedSecondArray = expect.arrayContaining([
            'data',
            'properties',
            'observers',
            'relations',
            'methods'
        ]);
        expect(Object.keys(theSecondBehaviorCall[0])).toEqual(expectedSecondArray);
        expect(expectedSecondArray).toEqual(Object.keys(theSecondBehaviorCall[0]));
    });
});
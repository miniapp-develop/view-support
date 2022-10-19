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
        expect(global.Behavior).toBeCalled();
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'preset-options-value'
        });
        expect(mergedOption.__attr__).toBe('a-string');
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);
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
        expect(global.Behavior).toBeCalled();
        expect(mergedOption.options).toStrictEqual({
            'preset-options-key': 'preset-options-value'
        });
        expect(mergedOption.__attr__).toBe('a-string');
        expect(mergedOption.behaviors).toStrictEqual(['a', '/a/b/c/d/e/f']);
        expect(global.Behavior.mock.calls[0][0].data).toStrictEqual({
            'preset-data-key': 'preset-data-value'
        });
        expect(Object.keys(global.Behavior.mock.calls[0][0].pageLifetimes)).toEqual(['show', 'hide', 'resize']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].lifetimes)).toEqual(['ready']);
        expect(Object.keys(global.Behavior.mock.calls[0][0].methods)).toEqual(['onLoad', 'onUnload', 'pageMethod']);
    });
});

describe('mergeComponentOption', () => {
    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({});
        expect(mergedOption.behaviors).toStrictEqual([]);
        expect(mergedOption.data).toStrictEqual({});
        expect(mergedOption.externalClasses).toStrictEqual([]);
        expect(mergedOption.properties).toStrictEqual({});
        expect(mergedOption.observers).toStrictEqual({});
        expect(mergedOption.relations).toStrictEqual({});
    });
});
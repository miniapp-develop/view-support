const merges = require('../lib/merges');

describe('mergePageOption', () => {
    let onLoad;
    let onShow;
    let onReady;
    let onHide;
    let onUnload;
    let onResize;
    let pageMethod;

    let presetOption;
    let inputOption;
    let createPresetOption;
    let createInputOption;
    beforeEach(() => {
        global.Behavior = jest.fn();
        global.Behavior.mockReturnValue('xyz');
        onLoad = jest.fn();
        onShow = jest.fn();
        onReady = jest.fn();
        onHide = jest.fn();
        onUnload = jest.fn();
        onResize = jest.fn();
        pageMethod = jest.fn();
        createPresetOption = function () {
            return {
                __attr__: 'presetOption.__attr__',
                options: {
                    'options-key': 'presetOption.options.value',
                    'presetOption-options-key': 'presetOption.options.value'
                },
                data: {
                    'data-key': 'presetOption.data.value',
                    'presetOption-data-key': 'presetOption.data.value'
                },
                behaviors: ['presetOption.behavior.1'],
                onLoad: onLoad,
                onShow: onShow,
                onReady: onReady,
                onHide: onHide,
                onUnload: onUnload,
                onResize: onResize,
                pageMethod: pageMethod
            };
        }
        createInputOption = function () {
            return {
                __attr__: 'inputOption.__attr__',
                options: {
                    'options-key': 'inputOption.options.value',
                    'input-options-key': 'inputOption.options.value'
                },
                data: {
                    'data-key': 'inputOption.data.value',
                    'input-data-key': 'inputOption.data.value'
                },
                behaviors: ['inputOption.behavior.1'],
                onShow: onShow,
                onUnload: onUnload,
                pageMethod: pageMethod
            };
        }

        presetOption = createPresetOption();
        inputOption = createInputOption();

    });

    test('when presetOption and inputOption are all null then get empty', () => {
        const mergedOption = merges.mergePageOption(null, null);
        expect(mergedOption).toStrictEqual({});
    });

    test('when inputOption is falsy then inputOption keep null', () => {
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(inputOption).toBeNull();
    });

    test('when inputOption is empty then inputOption keep empty', () => {
        const inputOption = {};
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(inputOption).toEqual({});
    });

    test('when presetOption has BehaviorOwnProperty then clone presetOption with Behavior', () => {
        const mergedOption = merges.mergePageOption(presetOption, null);

        expect(global.Behavior).toBeCalledTimes(1);

        expect(mergedOption).toStrictEqual({
            __attr__: 'presetOption.__attr__',
            options: {
                'options-key': 'presetOption.options.value',
                'presetOption-options-key': 'presetOption.options.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz']
        });

        expect(global.Behavior.mock.calls[0][0]).toEqual({
            data: {
                'data-key': 'presetOption.data.value',
                'presetOption-data-key': 'presetOption.data.value'
            },
            pageLifetimes: {
                show: onShow,
                hide: onHide,
                resize: onResize
            },
            lifetimes: {
                ready: onReady
            },
            methods: {
                onLoad: onLoad,
                onUnload: onUnload,
                pageMethod: pageMethod
            }
        });
    });

    test('when presetOption has BehaviorOwnProperty and merge twice then presetOption keep unchanged', () => {
        const mergedOption1 = merges.mergePageOption(presetOption, null);
        const mergedOption2 = merges.mergePageOption(presetOption, null);

        expect(mergedOption1).toStrictEqual({
            __attr__: 'presetOption.__attr__',
            options: {
                'options-key': 'presetOption.options.value',
                'presetOption-options-key': 'presetOption.options.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz']
        });

        expect(mergedOption2).toStrictEqual(mergedOption1);
        expect(presetOption).toStrictEqual(createPresetOption());
    });

    test('when inputOption has BehaviorOwnProperty then clone inputOption', () => {
        const mergedOption = merges.mergePageOption(null, inputOption);

        expect(global.Behavior).toBeCalledTimes(0);

        expect(mergedOption).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value',
                'input-options-key': 'inputOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value',
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['inputOption.behavior.1'],
            onShow: onShow,
            onUnload: onUnload,
            pageMethod: pageMethod
        });

        expect(inputOption).toStrictEqual(mergedOption);
        expect(inputOption).toStrictEqual(createInputOption());
    });

    test('when inputOption has BehaviorOwnProperty and merge twice then inputOption keep unchanged', () => {
        const mergedOption1 = merges.mergePageOption(null, inputOption);
        const mergedOption2 = merges.mergePageOption(null, inputOption);
        expect(mergedOption1).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value',
                'input-options-key': 'inputOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value',
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['inputOption.behavior.1'],
            onShow: onShow,
            onUnload: onUnload,
            pageMethod: pageMethod
        });
        expect(mergedOption1).toStrictEqual(mergedOption2);
        expect(inputOption).toStrictEqual(createInputOption());
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then clone presetOption with Behavior', () => {
        const mergedOption = merges.mergePageOption(presetOption, inputOption);

        expect(global.Behavior).toBeCalledTimes(1);
        expect(mergedOption).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value',
                'input-options-key': 'inputOption.options.value',
                'presetOption-options-key': 'presetOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value',
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1'],
            onShow: onShow,
            onUnload: onUnload,
            pageMethod: pageMethod
        });

        expect(global.Behavior.mock.calls[0][0]).toEqual({
            data: {
                'data-key': 'presetOption.data.value',
                'presetOption-data-key': 'presetOption.data.value'
            },
            pageLifetimes: {
                show: onShow,
                hide: onHide,
                resize: onResize
            },
            lifetimes: {
                ready: onReady
            },
            methods: {
                onLoad: onLoad,
                onUnload: onUnload,
                pageMethod: pageMethod
            }
        });
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then inputOption keep unchanged', () => {
        const mergedOption1 = merges.mergePageOption(presetOption, inputOption);
        const mergedOption2 = merges.mergePageOption(mergedOption1, inputOption);

        expect(inputOption).toStrictEqual(createInputOption());

        expect(mergedOption1).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value',
                'input-options-key': 'inputOption.options.value',
                'presetOption-options-key': 'presetOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value',
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1'],
            onShow: onShow,
            onUnload: onUnload,
            pageMethod: pageMethod
        });

        expect(mergedOption2).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'options-key': 'inputOption.options.value',
                'input-options-key': 'inputOption.options.value',
                'presetOption-options-key': 'presetOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value',
                'input-data-key': 'inputOption.data.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1', 'xyz', 'inputOption.behavior.1'],
            onShow: onShow,
            onUnload: onUnload,
            pageMethod: pageMethod
        });
    });
});

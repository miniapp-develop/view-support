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

    test('when presetOption and inputOption are all empty then get empty', () => {
        const mergedOption1 = merges.mergePageOption(null, null);
        const mergedOption2 = merges.mergePageOption(null, {});
        const mergedOption3 = merges.mergePageOption({}, null);
        const mergedOption4 = merges.mergePageOption({}, {});
        expect(mergedOption1).toStrictEqual({});
        expect(mergedOption2).toStrictEqual({});
        expect(mergedOption3).toStrictEqual({});
        expect(mergedOption4).toStrictEqual({});
    });

    test('when presetOption is not null then presetOption keep unchanged', () => {
        merges.mergePageOption(presetOption, null);
        merges.mergePageOption(presetOption, {});
        merges.mergePageOption(presetOption, {data: {}});
        merges.mergePageOption(presetOption, createPresetOption());
        merges.mergePageOption(presetOption, createInputOption());
        expect(presetOption).toStrictEqual(createPresetOption());
    })

    test('when inputOption is not null then inputOption keep unchanged', () => {
        merges.mergePageOption(null, inputOption);
        merges.mergePageOption({}, inputOption);
        merges.mergePageOption(createPresetOption(), inputOption);
        merges.mergePageOption(presetOption, inputOption);
        merges.mergePageOption(createInputOption(), inputOption);
        merges.mergePageOption(inputOption, inputOption);
        expect(inputOption).toStrictEqual(createInputOption());
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

    test('when inputOption has BehaviorOwnProperty then clone inputOption', () => {
        const mergedOption = merges.mergePageOption(null, inputOption);

        expect(global.Behavior).toBeCalledTimes(0);
        expect(mergedOption).toStrictEqual(inputOption);
        mergedOption.__attr__ = 'mergedOption.__attr__';
        expect(mergedOption).not.toStrictEqual(inputOption);
    });

    test('when presetOption and inputOption all have BehaviorOwnProperty then clone presetOption with Behavior', () => {
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
});

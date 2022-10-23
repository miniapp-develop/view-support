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

        presetOption = {
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

        inputOption = {
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

    });

    test('when presetOption and inputOption are all null then get empty', () => {
        const mergedOption = merges.mergePageOption(null, null);
        expect(mergedOption).toStrictEqual({});
    });

    test('when presetOption has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
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

    test('when inputOption has BehaviorOwnProperty then change nothing', () => {
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
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
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

describe('mergeComponentOption', () => {
    let created;
    let attached;
    let ready;
    let moved;
    let detached;
    let createdOfLifetimes;
    let attachedOfLifetimes;
    let readyOfLifetimes;
    let movedOfLifetimes;
    let detachedOfLifetimes;
    let showOfPageLifetimes;
    let hideOfPageLifetimes;
    let resizeOfPageLifetimes;

    let presetOption;
    let inputOption;

    beforeEach(() => {
        global.Behavior = jest.fn().mockReturnValue('xyz');
        created = jest.fn();
        attached = jest.fn();
        ready = jest.fn();
        moved = jest.fn();
        detached = jest.fn();
        createdOfLifetimes = jest.fn();
        attachedOfLifetimes = jest.fn();
        readyOfLifetimes = jest.fn();
        movedOfLifetimes = jest.fn();
        detachedOfLifetimes = jest.fn();
        showOfPageLifetimes = jest.fn();
        hideOfPageLifetimes = jest.fn();
        resizeOfPageLifetimes = jest.fn();

        presetOption = {
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
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        };

        inputOption = {
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
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        };
    });

    test('when presetOption and inputOption are all null then get empty', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption).toStrictEqual({});
    });

    test('when presetOption has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const mergedOption = merges.mergeComponentOption(presetOption, null);

        expect(global.Behavior).toBeCalledTimes(1);

        expect(mergedOption).toStrictEqual({
            __attr__: 'presetOption.__attr__',
            options: {
                'preset-options-key': 'presetOption.options.value'
            },
            behaviors: ['presetOption.behavior.1', 'xyz'],
            externalClasses: ['presetOption-class-1']
        });

        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(theFirstBehaviorCall[0].data).toStrictEqual({'preset-data-key': 'presetOption.data.value'});
        expect(theFirstBehaviorCall[0]).toStrictEqual({
            data: {'preset-data-key': 'presetOption.data.value'},
            properties: {},
            observers: {},
            relations: {},
            methods: {},
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        });
    })

    test('when inputOption has BehaviorOwnProperty then change nothing', () => {
        const mergedOption = merges.mergeComponentOption(null, inputOption);
        expect(global.Behavior).toBeCalledTimes(0)

        expect(mergedOption).toStrictEqual({
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
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        });
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then wrap presetOption with Behavior', () => {
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(mergedOption).toStrictEqual({
            __attr__: 'inputOption.__attr__',
            options: {
                'preset-options-key': 'presetOption.options.value',
                'options-key': 'inputOption.options.value'
            },
            data: {
                'data-key': 'inputOption.data.value'
            },
            externalClasses: ['presetOption-class-1', "inputOption-class-1"],
            behaviors: ['presetOption.behavior.1', 'xyz', 'inputOption.behavior.1'],
            properties: {},
            observers: {},
            relations: {},
            methods: {},
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        });

        expect(global.Behavior).toBeCalledTimes(1);

        const theFirstBehaviorCall = global.Behavior.mock.calls[0];
        expect(theFirstBehaviorCall[0]).toStrictEqual({
            data: {'preset-data-key': 'presetOption.data.value'},
            properties: {},
            observers: {},
            relations: {},
            methods: {},
            created: created,
            attached: attached,
            ready: ready,
            moved: moved,
            detached: detached,
            lifetimes: {
                created: created,
                attached: attached,
                ready: ready,
                moved: moved,
                detached: detached
            },
            pageLifetimes: {
                show: showOfPageLifetimes,
                hide: hideOfPageLifetimes,
                resize: resizeOfPageLifetimes
            }
        });
    });
});
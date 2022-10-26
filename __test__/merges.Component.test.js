const merges = require('../lib/merges');

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

    let createPresetOption;
    let createInputOption;

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
        createPresetOption = function () {
            return {
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
        }

        createInputOption = function () {
            return {
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
        }

        presetOption = createPresetOption();
        inputOption = createInputOption();
    });

    test('when presetOption and inputOption are all empty then get empty', () => {
        const mergedOption1 = merges.mergeComponentOption(null, null);
        const mergedOption2 = merges.mergeComponentOption(null, {});
        const mergedOption3 = merges.mergeComponentOption({}, null);
        const mergedOption4 = merges.mergeComponentOption({}, {});
        expect(mergedOption1).toStrictEqual({});
        expect(mergedOption2).toStrictEqual({});
        expect(mergedOption3).toStrictEqual({});
        expect(mergedOption4).toStrictEqual({});
    });

    test('when presetOption is not null then presetOption keep unchanged', () => {
        merges.mergeComponentOption(presetOption, null);
        merges.mergeComponentOption(presetOption, {});
        merges.mergeComponentOption(presetOption, {data: {}});
        merges.mergeComponentOption(presetOption, createPresetOption());
        merges.mergeComponentOption(presetOption, createInputOption());
        expect(presetOption).toStrictEqual(createPresetOption());
    })

    test('when inputOption is not null then inputOption keep unchanged', () => {
        merges.mergeComponentOption(null, inputOption);
        merges.mergeComponentOption({}, inputOption);
        merges.mergeComponentOption(createPresetOption(), inputOption);
        merges.mergeComponentOption(presetOption, inputOption);
        merges.mergeComponentOption(createInputOption(), inputOption);
        merges.mergeComponentOption(inputOption, inputOption);
        expect(inputOption).toStrictEqual(createInputOption());
    });

    test('when presetOption has BehaviorOwnProperty then clone presetOption with Behavior', () => {
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

    test('when inputOption has BehaviorOwnProperty then clone inputOption', () => {
        const mergedOption = merges.mergeComponentOption(null, inputOption);
        expect(global.Behavior).toBeCalledTimes(0)
        expect(mergedOption).toStrictEqual(inputOption);
        mergedOption.__attr__ = 'mergedOption.__attr__';
        expect(mergedOption).not.toStrictEqual(inputOption);
    });

    test('when presetOption and inputOption all has BehaviorOwnProperty then clone presetOption with Behavior', () => {
        const mergedOption = merges.mergeComponentOption(presetOption, inputOption);
        expect(inputOption).toStrictEqual(createInputOption());
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
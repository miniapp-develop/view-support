const merges = require('../lib/merges');

describe('mergePageOption', () => {
    test('when presetOption and inputOption are all null then ', () => {
        const presetOption = null;
        const inputOption = null;
        const mergedOption = merges.mergePageOption(presetOption, inputOption);
        expect(mergedOption.options).toStrictEqual({});
        expect(mergedOption.behaviors).toStrictEqual([]);
        expect(mergedOption.data).toStrictEqual({});
    });
});

describe('mergeComponentOption', () => {
    test('simple check', () => {
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
const presets = require('../lib/presets');

describe('presets', () => {
    beforeEach(() => {
        global.Page = jest.fn();
        global.Behavior = () => {
            const fn = jest.fn();
            fn.mockReturnValue('/a/bcdef')
            return fn();
        };
    });
    test('preset Page with nothing', () => {
        const NewPage = presets.Page();
        NewPage();
        expect(Page).toBeCalledTimes(1);
    });
    test('preset Page with option', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage();
        expect(Page.mock.calls[0][0].name).toEqual('preset-value');
    });
    test('preset Page with option then merge option.data', () => {
        const NewPage = presets.Page({
            data: {
                name1: 'preset-value'
            }
        });
        NewPage({
            data: {
                name2: 'newest-value'
            }
        });
        expect(Page.mock.calls[0][0].data).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('preset Page with option then merge option.options', () => {
        const NewPage = presets.Page({
            options: {
                name1: 'preset-value'
            }
        });
        NewPage({
            options: {
                name2: 'newest-value'
            }
        });
        expect(Page.mock.calls[0][0].options).toStrictEqual({
            name1: 'preset-value',
            name2: 'newest-value'
        });
    });
    test('preset Page with option then concat option.behaviors', () => {
        const NewPage = presets.Page({
            behaviors: [1]
        });
        NewPage({
            behaviors: [2]
        });
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([1, 2]);
    });
    test('preset Page with option then merge option different keys', () => {
        const NewPage = presets.Page({
            name1: 'preset-value'
        });
        NewPage({
            name2: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name1).toEqual('preset-value');
        expect(Page.mock.calls[0][0].name2).toEqual('newest-value');
    });
    test('preset Page with option then override same key', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage({
            name: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name).toEqual('newest-value');
    });
    test('preset Page with behavior then concat behavior', () => {
        const mockBehavior = Behavior({});
        const NewPage = presets.Page(mockBehavior);
        NewPage();
        expect(Page.mock.calls[0][0].behaviors).toStrictEqual([mockBehavior]);
    });
    test('preset Page with factory', () => {
        const fn = function (option, constructor = Page) {
            constructor({
                factoryName: 'factory-value'
            });
        }
        const NewPage = presets.Page(fn);
        NewPage();
        expect(Page.mock.calls[0][0].factoryName).toEqual('factory-value');
    });
});
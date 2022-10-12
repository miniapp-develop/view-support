const presets = require('../lib/presets');

describe('presets', () => {
    beforeEach(() => {
        global.Page = jest.fn();
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
        expect(Page).toBeCalledTimes(1);
    });
    test('preset Page with option then merge option attrs', () => {
        const NewPage = presets.Page({
            name1: 'preset-value'
        });
        NewPage({
            name2: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name1).toEqual('preset-value');
        expect(Page.mock.calls[0][0].name2).toEqual('newest-value');
    });
    test('preset Page with option then override same key value', () => {
        const NewPage = presets.Page({
            name: 'preset-value'
        });
        NewPage({
            name: 'newest-value'
        });
        expect(Page.mock.calls[0][0].name).toEqual('newest-value');
    });
});
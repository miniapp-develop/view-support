const {createPresetComponent, createPresetPage} = require("./helper");

const MiniComponent = createPresetComponent({
    externalClasses: ['mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_mini/
    }
});

const MiniPage = createPresetPage({
    options: {
        pureDataPattern: /^_mini/
    }
});

exports.MiniComponent = MiniComponent;
exports.MiniPage = MiniPage;
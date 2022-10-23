const presets = require("./presets");

const MiniPage = presets.Page({
    options: {
        pureDataPattern: /^__mini__/
    }
});

const MiniComponent = presets.Component({
    externalClasses: ['mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^__mini__/
    }
});

exports.MiniPage = MiniPage;
exports.MiniComponent = MiniComponent;

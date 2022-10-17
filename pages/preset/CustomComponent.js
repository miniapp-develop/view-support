const {Component} = require("../../lib/presets");

const CustomComponent = Component({
    externalClasses: ['custom-class'],
    properties: {
        customName: {
            type: String,
            value: 'defaultCustomName'
        }
    }
});

module.exports = CustomComponent;
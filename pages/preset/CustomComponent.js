const {Component} = require("../../lib/presets");

const CustomComponent = Component({
    externalClasses: ['custom-class'],
    properties: {
        customName: {
            type: String,
            value: 'defaultCustomName'
        }
    },
    methods: {
        onTap(e) {
            wx.showModal({
                content: 'this is CustomComponent.onTap'
            });
        }
    }
});

module.exports = CustomComponent;
const presets = require("../../lib/presets");
const defaults = require("../../lib/defaults");

const CustomComponent = presets.Component(
    defaults.MiniComponent,
    {
        externalClasses: ['custom-class'],
        properties: {
            customName: {
                type: String,
                value: 'defaultCustomName'
            }
        },
        methods: {
            onTap(e) {
                console.log('CustomComponent.onTap', e)
                wx.showModal({
                    content: 'this is CustomComponent.onTap'
                });
            }
        }
    }
);

module.exports = CustomComponent;
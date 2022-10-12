const DemoComponent = require('../../DemoComponent');
const {createPresetComponent, MiniComponent} = require("../../../lib/index");

const CustomComponent = createPresetComponent({
    externalClasses: ['custom-class'],
    properties: {
        miniName: {
            type: String,
            value: 'defaultName'
        }
    }
});

CustomComponent({
    properties: {},
    data: {},
    methods: {}
}, MiniComponent);

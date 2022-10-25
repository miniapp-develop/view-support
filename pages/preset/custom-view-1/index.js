const presets = require("../../../lib/presets");
const CustomComponent = require('../CustomComponent');
const DemoComponent = require('../../DemoComponent');

const FinalComponent = presets.Component(
    CustomComponent,
    {
        externalClasses: ['final-class'],
        properties: {
            finalName: {
                type: String,
                value: 'defaultFinalName'
            }
        }
    }
);

FinalComponent({
    properties: {},
    data: {},
    methods: {}
}, DemoComponent);

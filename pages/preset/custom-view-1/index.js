const {Component} = require("../../../lib/presets");
const CustomComponent = require('../CustomComponent');
const DemoComponent = require('../../DemoComponent');

const FinalComponent = Component({
    externalClasses: ['final-class'],
    properties: {
        finalName: {
            type: String,
            value: 'defaultFinalName'
        }
    }
}, CustomComponent);

FinalComponent({
    properties: {},
    data: {},
    methods: {}
}, DemoComponent);

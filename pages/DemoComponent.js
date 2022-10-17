function DemoComponent(option) {
    Component({
        ...option,
        externalClasses: ['demo-class', ...(option.externalClasses || [])],
        properties: {
            ...option.properties,
            demoName: {
                type: String,
                value: 'defaultDemoName'
            }
        },
        methods: {
            inspectDemo() {
                console.log('this is demo');
            }
        }
    });
}

module.exports = DemoComponent;
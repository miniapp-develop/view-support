function DemoComponent(option) {
    const appliedOption = {
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
    };
    Component(appliedOption);
}

module.exports = DemoComponent;
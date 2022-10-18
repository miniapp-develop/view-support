function DemoComponent(option) {
    const appliedOption = {
        ...option,
        behaviors: [...(option.behaviors || [])],
        externalClasses: ['demo-class', ...(option.externalClasses || [])],
        properties: {
            ...(option.properties || {}),
            demoName: {
                type: String,
                value: 'defaultDemoName'
            }
        },
        relations: {
            ...(option.relations || {})
        },
        methods: {
            inspectDemo() {
                console.log('this is demo');
            },
            ...(option.methods || {})
        }
    };
    Component(appliedOption);
}

module.exports = DemoComponent;
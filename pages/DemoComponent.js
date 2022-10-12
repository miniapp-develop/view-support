function DemoComponent(option) {
    Component({
        ...option,
        externalClasses: ['demo-class', ...(option.externalClasses || [])],
        properties: {
            ...option.properties,
            demo: {
                type: String,
                value: 'demo'
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
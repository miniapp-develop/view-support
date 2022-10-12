const pageBehavior = Behavior({});

function DemoPage(option) {
    Page({
        ...option,
        behaviors: [pageBehavior, ...(option.behaviors || [])],
        options: {
            ...option.options
        },
        data: {
            ...option.data,
            demo: 'demo-page'
        }
    });
}

module.exports = DemoPage;
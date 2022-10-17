const CustomPage = require("../CustomPage");
const DemoPage = require("../../DemoPage");

CustomPage({
    data: {
        dataFromPageOption: 'dataFromPageOption'
    },
    onLoad(query) {
    }
}, DemoPage);

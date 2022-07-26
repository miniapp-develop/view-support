import {MiniComponent, createPresetComponent} from "../../lib/index";

const CustomComponent = createPresetComponent({externalClasses: ['custom-class']});

CustomComponent({
    properties: {},
    data: {},
    methods: {}
}, MiniComponent);

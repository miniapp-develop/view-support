import {createPresetComponent} from "./helper";

export const MiniComponent = createPresetComponent({
    externalClasses: ['mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_mini/
    }
});
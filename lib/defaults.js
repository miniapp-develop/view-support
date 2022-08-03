import {createPresetComponent, createPresetPage} from "./helper";

export const MiniComponent = createPresetComponent({
    externalClasses: ['mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_mini/
    }
});

export const MiniPage = createPresetPage({
    options: {
        pureDataPattern: /^_mini/
    }
});
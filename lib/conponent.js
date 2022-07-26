import {preset} from "./helper";

export const MiniComponent = preset({
    externalClasses: ['mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_mini/
    }
});
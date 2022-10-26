import {Input} from "../index";

Input({
    properties: {},
    data: {
        __name__:'__input__'
    },
    methods: {
        onTap(e) {
            this.emitAction();
        }
    }
});

function _array(val) {
    return val || [];
}

function _object(val) {
    return val || {};
}

function _concat(a, b) {
    return [].concat(_array(a)).concat(_array(b))
}

function _assign(a, b) {
    return Object.assign({}, _object(a), _object(b));
}

export function presetOption(option, preset) {
    option.externalClasses = _concat(preset.externalClasses, option.externalClasses);
    option.behaviors = _concat(preset.behaviors, option.behaviors);
    option.options = _assign(_object(preset.options), _object(option.options));
    option.relations = _assign(_object(preset.relations), _object(option.relations));
    return option;
}

export function createPresetComponent(preset) {
    return function (option = {}, factory = Component) {
        option = presetOption(option, preset);
        return factory(option);
    }
}
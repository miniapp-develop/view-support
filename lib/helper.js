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

function presetPageOption(option, preset) {
    option.options = _assign(_object(preset.options), _object(option.options));
    option.behaviors = _concat(preset.behaviors, option.behaviors);
    return option;
}

function createPresetPage(preset, ...defaultConstructors) {
    return function (option = {}, ...applyConstructors) {
        option = presetPageOption(option, preset);
        if (applyConstructors.length) {
            const constructor = applyConstructors.shift();
            return constructor(option, ...applyConstructors);
        } else if (defaultConstructors.length) {
            const constructor = defaultConstructors.shift();
            return constructor(option, ...defaultConstructors);
        } else {
            return Page(option);
        }
    }
}

function presetComponentOption(option, preset) {
    option.externalClasses = _concat(preset.externalClasses, option.externalClasses);
    option.behaviors = _concat(preset.behaviors, option.behaviors);
    option.properties = _assign(preset.properties, option.properties);
    option.data = _assign(preset.data, option.data);
    option.observers = _assign(preset.observers, option.observers);
    option.options = _assign(_object(preset.options), _object(option.options));
    option.relations = _assign(_object(preset.relations), _object(option.relations));
    return option;
}

function createPresetComponent(preset, ...defaultConstructors) {
    return function (option = {}, ...applyConstructors) {
        option = presetComponentOption(option, preset);
        if (applyConstructors.length) {
            const constructor = applyConstructors.shift();
            return constructor(option, ...applyConstructors);
        } else if (defaultConstructors.length) {
            const constructor = defaultConstructors.shift();
            return constructor(option, ...defaultConstructors);
        } else {
            return Component(option);
        }
    }
}

exports.createPresetPage = createPresetPage;
exports.createPresetComponent = createPresetComponent;
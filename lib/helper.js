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

function createPresetPage(preset, defaultFactory = Page) {
    return function (option = {}, factory = defaultFactory) {
        option = presetPageOption(option, preset);
        return factory(option);
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

function createPresetComponent(preset, defaultFactory = Component) {
    return function (option = {}, factory = defaultFactory) {
        option = presetComponentOption(option, preset);
        return factory(option);
    }
}

exports.createPresetPage = createPresetPage;
exports.createPresetComponent = createPresetComponent;
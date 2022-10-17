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

function isFactory(element) {
    return typeof element === 'function';
}

function mergeOption(presetOption, inputOption) {
    presetOption = presetOption || {};
    const mergedOption = _assign(presetOption, inputOption);
    mergedOption.options = _assign(presetOption.options, inputOption.options);
    mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    mergedOption.data = _assign(presetOption.data, inputOption.data);
    return mergedOption;
}

function createPresetPage(...presetOptions) {
    return function (inputOption = {}, constructor = Page) {
        if (isFactory(presetOptions[0])) {
            const last = presetOptions.pop();
            last(inputOption, createPresetPage(...presetOptions));
        } else {
            let mergedOption = {};
            for (const presetOption of presetOptions.reverse()) {
                mergedOption = mergeOption(presetOption, mergedOption);
            }
            const appliedOption = mergeOption(mergedOption, inputOption);
            constructor(appliedOption);
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

exports.Page = createPresetPage;
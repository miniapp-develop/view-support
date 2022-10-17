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

function mergePageOption(presetOption, inputOption) {
    presetOption = presetOption || {};
    const mergedOption = _assign(presetOption, inputOption);
    mergedOption.options = _assign(presetOption.options, inputOption.options);
    mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    mergedOption.data = _assign(presetOption.data, inputOption.data);
    return mergedOption;
}

function wrapPageOptionFactory(presetOption) {
    return function OptionFactory(inputOption = {}, constructor) {
        const appliedOption = mergePageOption(presetOption, inputOption);
        constructor(appliedOption);
    }
}

function createPresetPage(...presetOptions) {
    const preparedFactories = presetOptions.map(option => {
        return isFactory(option) ? option : wrapPageOptionFactory(option);
    });
    return function PresetPage(inputOption = {}, constructor = Page) {
        if (preparedFactories.length === 0) {
            constructor(inputOption);
        } else if (preparedFactories.length === 1) {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, constructor);
        } else {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, createPresetPage(...preparedFactories));
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
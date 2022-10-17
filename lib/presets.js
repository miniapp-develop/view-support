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

function mergeComponentOption(presetOption, inputOption) {
    presetOption = presetOption || {};
    const mergedOption = _assign(presetOption, inputOption);
    mergedOption.externalClasses = _concat(presetOption.externalClasses, inputOption.externalClasses);
    mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    mergedOption.properties = _assign(presetOption.properties, inputOption.properties);
    mergedOption.data = _assign(presetOption.data, inputOption.data);
    mergedOption.observers = _assign(presetOption.observers, inputOption.observers);
    mergedOption.options = _assign(_object(presetOption.options), _object(inputOption.options));
    mergedOption.relations = _assign(_object(presetOption.relations), _object(inputOption.relations));
    return mergedOption;
}

function wrapComponentOptionFactory(presetOption) {
    return function OptionFactory(inputOption = {}, constructor) {
        const appliedOption = mergeComponentOption(presetOption, inputOption);
        constructor(appliedOption);
    }
}

function createPresetComponent(...presetOptions) {
    const preparedFactories = presetOptions.map(option => {
        return isFactory(option) ? option : wrapComponentOptionFactory(option);
    });
    return function PresetComponent(inputOption = {}, constructor = Component) {
        if (preparedFactories.length === 0) {
            constructor(inputOption);
        } else if (preparedFactories.length === 1) {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, constructor);
        } else {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, createPresetComponent(...preparedFactories));
        }
    }
}

exports.Page = createPresetPage;
exports.Component = createPresetComponent;
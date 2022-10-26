const {mergePageOption, mergeComponentOption} = require('./merges');

function isFactory(element) {
    return typeof element === 'function';
}

function wrapPageOptionFactory(presetOption) {
    return function OptionFactory(inputOption = {}, constructor) {
        const appliedOption = mergePageOption(presetOption, inputOption);
        constructor(appliedOption);
    }
}

function _createPresetPage(ascentPriorityOptions, presetConstructor) {
    const preparedFactories = ascentPriorityOptions.map(option => {
        return isFactory(option) ? option : wrapPageOptionFactory(option);
    });
    return function PresetPage(inputOption = {}, constructor = presetConstructor) {
        if (preparedFactories.length === 0) {
            constructor(inputOption);
        } else if (preparedFactories.length === 1) {
            preparedFactories[0](inputOption, constructor);
        } else {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, _createPresetPage(preparedFactories, constructor));
        }
    }
}

function createPresetPage(...ascentPriorityOptions) {
    return _createPresetPage(ascentPriorityOptions, Page);
}

function wrapComponentOptionFactory(presetOption) {
    return function OptionFactory(inputOption = {}, constructor) {
        const appliedOption = mergeComponentOption(presetOption, inputOption);
        constructor(appliedOption);
    }
}

function _createPresetComponent(ascentPriorityOptions, presetConstructor) {
    const preparedFactories = ascentPriorityOptions.map(option => {
        return isFactory(option) ? option : wrapComponentOptionFactory(option);
    });
    return function PresetComponent(inputOption = {}, constructor = presetConstructor) {
        if (preparedFactories.length === 0) {
            constructor(inputOption);
        } else if (preparedFactories.length === 1) {
            preparedFactories[0](inputOption, constructor);
        } else {
            const highPriority = preparedFactories.pop();
            highPriority(inputOption, _createPresetComponent(preparedFactories, constructor));
        }
    }
}

function createPresetComponent(...ascentPriorityOptions) {
    return _createPresetComponent(ascentPriorityOptions, Component);
}

exports.Page = createPresetPage;
exports.Component = createPresetComponent;
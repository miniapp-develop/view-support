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
        const preparedLength = preparedFactories.length;
        if (preparedLength === 0) {
            constructor(inputOption);
        } else if (preparedLength === 1) {
            preparedFactories[0](inputOption, constructor);
        } else {
            const highestPriority = preparedFactories[preparedLength - 1];
            highestPriority(inputOption, _createPresetPage(preparedFactories.slice(0, preparedLength - 1), constructor));
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
        const preparedLength = preparedFactories.length;
        if (preparedLength === 0) {
            constructor(inputOption);
        } else if (preparedLength === 1) {
            preparedFactories[0](inputOption, constructor);
        } else {
            const highestPriority = preparedFactories[preparedLength - 1];
            highestPriority(inputOption, _createPresetComponent(preparedFactories.slice(0, preparedLength - 1), constructor));
        }
    }
}

function createPresetComponent(...ascentPriorityOptions) {
    return _createPresetComponent(ascentPriorityOptions, Component);
}

exports.Page = createPresetPage;
exports.Component = createPresetComponent;
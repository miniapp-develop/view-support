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

function mergePageOption(presetOption, inputOption ) {
    presetOption = presetOption || {};
    inputOption = inputOption || {};
    const mergedOption = _assign(presetOption, inputOption);
    mergedOption.options = _assign(presetOption.options, inputOption.options);
    mergedOption.data = _assign(presetOption.data, inputOption.data);
    mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    return mergedOption;
}

function mergeComponentOption(presetOption, inputOption) {
    presetOption = presetOption || {};
    inputOption = inputOption || {};
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

exports.mergePageOption = mergePageOption;
exports.mergeComponentOption = mergeComponentOption;

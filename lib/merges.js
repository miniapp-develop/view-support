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

function normalizePageOption(option) {
    option = option || {};
    const targetOption = {};
    const behaviorOption = {};
    for (const key of Object.keys(option)) {
        if (['onShow', 'onHide', 'onResize'].includes(key)) {
            if (!behaviorOption.pageLifetimes) {
                behaviorOption.pageLifetimes = {};
            }
            if (key === 'onShow') {
                behaviorOption.pageLifetimes.show = option[key];
            } else if (key === 'onHide') {
                behaviorOption.pageLifetimes.hide = option[key];
            } else if (key === 'onResize') {
                behaviorOption.pageLifetimes.resize = option[key];
            }
        } else if (['onReady'].includes(key)) {
            if (!behaviorOption.lifetimes) {
                behaviorOption.lifetimes = {};
            }
            behaviorOption.lifetimes.ready = option[key];
        } else if (key === 'data') {
            behaviorOption.data = option[key];
        } else {
            if (typeof option[key] === "function") {
                if (!behaviorOption.methods) {
                    behaviorOption.methods = {};
                }
                behaviorOption.methods[key] = option[key];
            } else {
                targetOption[key] = option[key];
            }
        }
    }
    if (Object.keys(behaviorOption).length){
        const behavior = Behavior(behaviorOption);
        if (!targetOption.behaviors) {
            targetOption.behaviors = [];
        }
        targetOption.behaviors.push(behavior);
    }
    return targetOption;
}

function mergePageOption(presetOption, inputOption) {
    presetOption = normalizePageOption(presetOption || {});
    inputOption = normalizePageOption(inputOption || {});

    const mergedOption = _assign(presetOption, inputOption);
    mergedOption.options = _assign(presetOption.options, inputOption.options);
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

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
    const returnedOption = {};
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
        } else if (['behaviors'].includes(key)) {
            returnedOption[key] = [...option[key]];
        } else {
            if (typeof option[key] === "function") {
                if (!behaviorOption.methods) {
                    behaviorOption.methods = {};
                }
                behaviorOption.methods[key] = option[key];
            } else {
                returnedOption[key] = option[key];
            }
        }
    }
    if (Object.keys(behaviorOption).length) {
        const behavior = Behavior(behaviorOption);
        if (!returnedOption.behaviors) {
            returnedOption.behaviors = [];
        }
        returnedOption.behaviors.push(behavior);
    }
    return returnedOption;
}

function mergePageOption(presetOption, inputOption) {
    presetOption = normalizePageOption(presetOption || {});
    inputOption = inputOption || {};

    const mergedOption = _assign(presetOption, inputOption);
    if (presetOption.options || inputOption.options) {
        mergedOption.options = _assign(presetOption.options, inputOption.options);
    }
    if (presetOption.behaviors || inputOption.behaviors) {
        mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    }
    return mergedOption;
}


function normalizeComponentOption(option) {
    option = option || {};
    const returnedOption = {};
    const behaviorOption = {};
    for (const key of Object.keys(option)) {
        if (['created', 'attached', 'ready', 'moved', 'detached'].includes(key)) {
            behaviorOption[key] = option[key];
        } else if (['properties', 'data', 'observers', 'relations', 'methods', 'lifetimes', 'pageLifetimes'].includes(key)) {
            behaviorOption[key] = option[key];
        } else if (['behaviors'].includes(key)) {
            returnedOption[key] = [...option[key]];
        } else {
            returnedOption[key] = option[key];
        }
    }
    if (Object.keys(behaviorOption).length) {
        const behavior = Behavior(behaviorOption);
        if (!returnedOption.behaviors) {
            returnedOption.behaviors = [];
        }
        returnedOption.behaviors.push(behavior);
    }
    return returnedOption;
}

function mergeComponentOption(presetOption, inputOption) {
    presetOption = normalizeComponentOption(presetOption || {});
    inputOption = inputOption || {};

    const mergedOption = _assign(presetOption, inputOption);
    if (presetOption.options || inputOption.options) {
        mergedOption.options = _assign(presetOption.options, inputOption.options);
    }
    if (presetOption.externalClasses || inputOption.externalClasses) {
        mergedOption.externalClasses = _concat(presetOption.externalClasses, inputOption.externalClasses);
    }
    if (presetOption.behaviors || inputOption.behaviors) {
        mergedOption.behaviors = _concat(presetOption.behaviors, inputOption.behaviors);
    }
    return mergedOption;
}

exports.mergePageOption = mergePageOption;
exports.mergeComponentOption = mergeComponentOption;

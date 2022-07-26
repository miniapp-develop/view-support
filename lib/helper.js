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

export function preset(extra) {
    return function (options = {}, factory) {
        options.externalClasses = _concat(extra.externalClasses, options.externalClasses);
        options.behaviors = _concat(extra.behaviors, options.behaviors);
        options.options = _assign(_object(extra.options), _object(options.options));
        options.relations = _assign(_object(extra.relations), _object(options.relations));
        return factory(options);
    }
}


import {defaults, presets, relations} from '../../../lib/index';

const {parent: BaseFormView, children: [BaseFormItemView, BaseActionView]} = relations.PresetAncestorDescendant(
    {name: 'form'},
    [{name: 'input'}, {name: 'action'}]
);

export const Form = presets.extendComponent(BaseFormView, defaults.MiniComponent, {
    options: {
        virtualHost: true
    },
    properties: {
        model: {
            type: Object,
            value: {}
        }
    },
    observers: {
        model(newModel) {
            const children = this.getRelationChildren('input');
            for (const child of children) {
                this.__notify__children(child, newModel);
            }
        }
    },
    methods: {
        onRelationChanged(event, child) {
            if (event === 'linked') {
                this.__notify__children(child, this.data.model);
            }
        },
        __notify__children(child, value) {
            if (child.onModelChanged) {
                child.onModelChanged(value);
            }
        },
        commitModelChange(name, value) {
            this.data.model[name].value = value;
            this.setData({
                model: this.data.model
            });
            this.triggerEvent('change', this.data.model);
        },
        handleFormAction(actionType) {
            this.triggerEvent('submit', this.data.model);
        }
    }
});

export const FormItem = presets.extendComponent(BaseFormItemView, defaults.MiniComponent, {
    properties: {
        modelName: {
            type: String,
            value: ''
        },
        disabled: {
            type: Boolean,
            value: false
        }
    },
    data: {
        item: {}
    },
    methods: {
        getValueView(modelItem) {
            return modelItem.value;
        },
        getTypedValue(value, type) {
            if (type === Number) {
                return value ? Number(value) : value;
            } else if (type === Boolean) {
                return value !== 'false'; //组件的问题，value 没法直接转成 bool
            }
            return value;
        },
        onModelChanged(model) {
            const modelItem = model[this.data.modelName];
            const getValueView = modelItem.getValueView ? modelItem.getValueView : this.getValueView;
            const valueView = getValueView.call(this, modelItem, this);
            this.setData({
                item: modelItem,
                valueView
            });
        },
        commitChange(value) {
            this.getRelationParent().commitModelChange(this.data.modelName, value);
        },
        onChanged(e) {
            const value = e.detail.value;
            const typedValue = this.getTypedValue(value, this.data.item.valueType);
            this.commitChange(typedValue);
        },
        emitAction() {
            this.triggerEvent('emit', {
                callback: value => {
                    this.commitChange(value);
                }
            });
        }
    }
});

export const Input = presets.extendComponent(FormItem);
export const Textarea = presets.extendComponent(FormItem);
export const FormAction = presets.extendComponent(
    BaseActionView,
    defaults.MiniComponent,
    {
        methods: {
            onTap(e) {
                this.getRelationParent().handleFormAction(this.data.type)
            }
        }
    }
);
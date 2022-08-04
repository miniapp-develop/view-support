# ViewSupport

为自定义小程序组件提供的辅助方法，包含功能支持：

1. 创建预设构造方法。
2. 管理组件间关系

## 安装

```shell script
npm install @mini-dev/view-support
```

## Usage

### 创建预设构造方法

1、 安装

```shell script
npm install @mini-dev/view-support
```

2、 创建预设组件

```javascript
const {createPresetComponent} = require("@mini-dev/view-support");

export const MyComponent = createPresetComponent({
    externalClasses: ['xxx-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_mini/
    }
});
```

3、 调用预设组件

````javascript
MyComponent({
    properties: {},
    data: {},
    methods: {}
});
````

默认使用小程序框架的 Component 来创建组件。

4、 组合调用

如果想使用其他已封装的 Component 构造方法，也可以通过参数显式指定，以预置的 MiniComponent 为例：

```javascript
const {MiniComponent} = require("@mini-dev/view-support");

MyComponent({
    properties: {},
    data: {},
    methods: {}
}, MiniComponent);

```

或者在创建的时候直接绑定：

```javascript
const {createPresetComponent, MiniComponent} = require("@mini-dev/view-support");

const MyComponent = createPresetComponent({
    ...
}, MiniComponent);

MyComponent({
    ...
});

```

### 管理组件间关系

1、创建一个关系

```javascript
const {connectParentChildren} = require("@mini-dev/view-support");

export const {parent, child} = connectParentChildren();

```

2、配置关系节点

父节点(parent.wxml, parent.js)

```javascript

parent({});

```

子节点(child.wxml, child.js)

```javascript

child({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        tag: {
            type: String,
            value: ''
        }
    },
    methods: {
        onMiniChanged({active}) {
            console.log('child onRelativeStateChanged', active);
            this.setData({
                show: active === this.data.tag
            });
        }
    }
});

```

3、正常使用组件
```html
<parent mini-data="{{active}}">
    <child mini-data="t1" />
    <child mini-data="t2" />
</parent>
```
也可以直接导入查看 demo

## ChangeLog

### 0.0.4
1. 增加日志。

### 0.0.3
1. 增加 Page 相关方法。
2. 合并组件关系库。
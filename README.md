# ViewSupport

为自定义小程序组件提供的辅助方法，主要包含两类功能：

1. 创建预设构造器；
2. 管理组件间关系。

## 安装

```shell script
npm install @mini-dev/view-support
```

### 创建预设构造方法

小程序只提供了基于 Behavior 的复用机制，因此，本库提供了基于 option 和 Function 的复用方式。

重要说明：由于 Behavior 本身有自己的优先级定义，因此，对于 Behavior 自身已经支持的属性，
建议使用 Behavior 来定义，只有 Behavior 不支持的属性，才考虑使用 Option 的方式进行复用。

Behavior 自身已经支持的属性包括：

    properties
    data
    observers
    methods
    behaviors
    created
    attached
    ready
    moved
    detached
    relations
    lifetimes
    pageLifetimes
    definitionFilter

更新更详细的文档参见官方文档：[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html)

1、 创建预设组件

```javascript
const {presets} = require("@mini-dev/view-support");

export const MyComponent = presets.Component({
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
const {defaults} = require("@mini-dev/view-support");

MyComponent({
    properties: {},
    data: {},
    methods: {}
}, defaults.MiniComponent);

```

或者在创建的时候直接绑定：

```javascript
const {presets, defaults} = require("@mini-dev/view-support");

const MyComponent = presets.Component({
    ...
}, defaults.MiniComponent);

MyComponent({
    ...
});

```

但是这两种方式有一个重大差异：presets.Component 的参数是作为预设值参与合并的，因此优先级比调用时传值要低。

### 管理组件间关系

1、创建一个关系

```javascript
const {relations} = require("@mini-dev/view-support");

export const {parent, child} = relations.createParentChild();

```

2、配置关系节点

父节点(parent.wxml, parent.js)

```javascript

parent({
    methods: {
        onRelationChanged(event, child) {
            //...
        }
    }
});
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
        onRelationChanged(event, parent) {
            //...
        }
    }
});

```

父级组件可以通过 getRelationChildren 获取子级组件（Node List）。
子级组件可以通过 getRelationParent 获取父级组件（A Node）。

3、正常使用组件
```html
<parent mini-data="{{active}}">
    <child tag="t1" />
    <child tag="t2" />
</parent>
```


也可以直接导入查看 demo

## ChangeLog

### 0.1.1
1. relations 增加一对多的关系。
2. presets 增加。
3. defaults.MiniComponent 增加 virtualHost: true 默认配置。

### 0.1.0
1. API 不兼容调整。

### 0.0.5
1. 支持多个构造器。

### 0.0.4
1. 增加日志。

### 0.0.3
1. 增加 Page 相关方法。
2. 合并组件关系库。
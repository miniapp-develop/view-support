# ViewSupport

为自定义小程序组件提供的辅助方法。

## Usage
1、 安装

```shell script
npm install @mini-dev/view-support
```

2、 创建预设组件

```javascript
import {createPresetComponent} from "@mini-dev/view-support";

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
import {MiniComponent} from "@mini-dev/view-support";

MyComponent({
    properties: {},
    data: {},
    methods: {}
}, MiniComponent);

```

或者在创建的时候直接绑定：

```javascript
import {createPresetComponent, MiniComponent} from "@mini-dev/view-support";

const MyComponent = createPresetComponent({
    ...
}, MiniComponent);

MyComponent({
    ...
});

```

## ChangeLog

### 0.0.3
1. 增加 Page 相关方法；
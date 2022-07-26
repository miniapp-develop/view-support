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

如果想使用其他已封装的 Component，也可以显式指定，以默认的 MiniComponent 为例：

```javascript
import {MiniComponent} from "@mini-dev/view-support";

MyComponent({
    properties: {},
    data: {},
    methods: {}
}, MiniComponent);

```

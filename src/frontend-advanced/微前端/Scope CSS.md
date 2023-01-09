# Scope CSS

在 qiankun 中有如下配置可以设置子应用的样式隔离

```js
// 启动应用
start({
  sandbox: {
    strictStyleIsolation: true
    experimentalStyleIsolation: true
  }
})
```

- **strictStyleIsolation：** 这种模式下 qiankun 会为每个微应用的容器包裹上一个 [shadow dom](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM) 节点，从而确保微应用的样式不会对全局造成影响。
- **experimentalStyleIsolation：** 当 experimentalStyleIsolation 被设置为 true 时，qiankun 会改写子应用所添加的样式为所有样式规则增加一个特殊的选择器规则来限定其影响范围

## ShadowDOM

```js
function createElement(
  appContent: string,
  strictStyleIsolation: boolean,
  scopedCSS: boolean,
  appName: string,
): HTMLElement {

  // ...
  const containerElement = document.createElement('div');
  containerElement.innerHTML = appContent;
  // appContent always wrapped with a singular div
  const appElement = containerElement.firstChild as HTMLElement;
  if (strictStyleIsolation) {
    if (!supportShadowDOM) {
      console.warn(
        '[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!',
      );
    } else {
      const { innerHTML } = appElement;
      appElement.innerHTML = '';
      let shadow: ShadowRoot;

      if (appElement.attachShadow) {
        shadow = appElement.attachShadow({ mode: 'open' });
      } else {
        // createShadowRoot was proposed in initial spec, which has then been deprecated
        shadow = (appElement as any).createShadowRoot();
      }
      shadow.innerHTML = innerHTML;
    }
  }
  // ...
  return appElement;
}
```

`qiankun`在这方面的实现就比较简单了，当为子应用创建根结点时（配置 strictStyleIsolation）, 就会为这个节点创建`ShadowDOM`。
我们可以发现，有两种创建`ShadowDOM`的方式，`attachShadow`和`createShadowRoot`，`createShadowRoot`已经被废弃，可以作为降级的方案。

`attachShadow`有两种模式分别为：

- open: 可以用 js 获取 dom 节点
- closed：不能用 js 获取 dom 节点

## 实验性的功能

1. 替换 html, body 为 div[data-qiankun="appName"]
2. 所有选择器前面加上 div[data-qiankun="appName"]
3. @media 和@support 里面的选择器前面也全部加上 div[data-qiankun="appName"]

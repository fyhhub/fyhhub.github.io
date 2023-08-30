# 只用一套代码运行Vue2 和 Vue3的组件库？原来是这么做的


大家好，今天分享的是关于如何实现Vue 2.7 与 Vue 3.x 同时兼容的组件库。为什么需要这种组件库呢？原因很简单：

1.  公司内部很多项目需要接入新的UI标准，并且项目的Vue版本较低，且大部分都是 Vue 2.6的版本，而Vue 2.7可以做到向下兼容，同时向上可以兼容绝大多数Vue 3.x的特性。
2.  未来很多新项目肯定都会使用 Vue 3.x来开发，如果再实现一套 Vue 2.6版本的组件库，又无法满足未来需求。

基于此，如果能实现上述能力，可以节省大量的重复代码开发，而且方便了项目迁移。

同时在写这篇文章时，组件库已经成功在公司内部上线，并且接入了多个项目，目前整体来看方案还是非常可行的，但是还不够通用，后续也考虑开发一套脚手架。

## 1. 业内方案

其实在开发这套组件库之前，在网上也搜索了很多组件库，并没有可以借鉴的脚手架或者组件库。整体方案也是经过不断迭代才完善的。

直到最近才看见，其实华为云已经开源一款组件库[TinyVue组件库](https://github.com/opentiny/tiny-vue) , 看了下其实实现也大同小异:

*   Vue不同版本之间运行时的适配层，例如Teleport、Fragment在Vue3有，但是在Vue2并没有，所以需要进行适配，可以看到下方的是 `TinyVue` 的实现，很多Vue Api通过适配层统一导入，就可以做到多个版本适配。

    <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8a0c138d6e748b49ba92310f37964dd~tplv-k3u1fbpfcp-watermark.image?" alt="" width="30%">

*   项目存在多个Vue版本，可以通过npm别名来安装： <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515185cc1e1a4741bdb796246f1a1f95~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%">

*   ...等等

那么开发出这么一套组件库，需要做哪些处理呢，下面我们来看看具体差异

## 2. Vue 2.7 与 Vue 3.x的差异

虽然 Vue 2.7 的发布日志看起来与Vue3.x的区别不大，但是实际差异只有在开发时才会体现出来。下面从几个角度来看看，到底差别在哪。

### 2.1 类型导出

以下类型，在 Vue 2.7是没有导出的：

```ts
import {
   App,
   StyleValue,
   Slot,
   Slots,
   VNodeTypes,
   RenderFunction,
   ...
} from 'vue'
```

既然在Vue2中没有，那么我们其实可以自己实现类型声明，并导出`vue`模块:

```js
declare module 'vue' {
  import * as CSS from 'csstype';
  export * from 'vue2';

  export interface CSSProperties
    extends CSS.Properties<string | number>,
      CSS.PropertiesHyphen<string | number> {
    [v: `--${string}`]: string | number | undefined;
  }

  export type ComponentInternalInstance = any;

  export type VNodeNormalizedChildren = any;

  export type App = any;

  export type createApp = any;

  export type StyleValue = string | CSSProperties | Array<StyleValue>;
  
  // ...其他
}
```

可以看到，重新声明了`vue`模块，并且在内部导入了Vue2的类型。实现了那些没有的类型定义。

### 2.2 API差异

同样的，Vue 2.7 相比 Vue3还缺少一些API, 如：

```js
import {
  cloneVNode,
  createVNode,
  Fragment,
  render,
  Teleport,
  Transition,
  TransitionGroup,
  ...
} from 'vue'
```

以上API都是在Vue3中存在，但是Vue 2.7缺少的。

| API             | Vue 3.x | Vue 2.7 |
| --------------- | ------- | ------- |
| cloneVNode      | ✅       | ❌       |
| createVNode     | ✅       | ❌       |
| Fragment        | ✅       | ❌       |
| render          | ✅       | ❌       |
| Teleport        | ✅       | ❌       |
| Transition      | ✅       | ❌       |
| TransitionGroup | ✅       | ❌       |
| ...             | ✅       | ❌       |

当然 还不止这些API..

### 2.3 模板编译

我们先来看下 Vue 2.7和Vue3的模板编译有什么不一样

| Vue 3.x                                                                                                                                             | Vue 2.7                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5c43677e763440dbd0bc6a3296a16d0~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%"> | <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a155615b32f422695de2d21f90c837c~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%"> |

可以看到仅仅是VNode的创建，实现方式都是不一样的。那么还有哪些呢？

| 模板编译           | Vue 3.x     | Vue 2.7     |
| -------------- | ----------- | ----------- |
| v-model:xxx 写法 | ✅           | ❌           |
| 创建VNode方式      | createVNode | vm.\_c      |
| v-slots写法（jsx） | v-slots     | scopedSlots |
| ...            | ...         | ...         |

## 3. 为什么不兼容 Vue 2.6

如果想要用Vue 2.6 去实现 Vue 3.x的代码，那么我觉的大可不必，收益并不大。

我们知道Vue 2.7是完全向下兼容的，一个Vue 2.6 项目想要升级 Vue 2.7，只需要升级一下编译工具版本 和 Vue版本即可。

但是，如果升级Vue 3.x的代价就太大了，先不说一些 `break change`, 一旦你的项目依赖了一些外部npm组件，它本身是已经编译好的代码，并且是Vue 2.6的产物，项目是绝对运行不起来的。而Vue 2.7则完全不用考虑这些。

由此可以得出，升级Vue 2.7的成本其实并不高。何必还要单独考虑去实现Vue 2.6的适配呢？

## 4. 编译兼容方案

### 4.1 Vue 版本兼容

如果你想切换不同的Vue版本，首先项目得安装两个版本的Vue

```js
npm i vue2@npm:vue@^2.7.14 vue3@npm:vue@^3.2.45
```

然后在Vite配置中加入，alias解析，根据当前构建的Vue版本，去选择对应的产物路径：

```js
resolve: {
   alias: {
      vue: isVue3() ? path.resolve(
        path.dirname(require.resolve('vue3')),
        'dist/vue.runtime.esm-bundler.js'
      ) : path.resolve(path.dirname(require.resolve('vue2')), 'vue.runtime.esm.js');
   }
}
```

编译后:

```js
// Vue 2.7
import { reactive } from '/xxx/node_modules/vue2/vue.runtime.esm.js'

// Vue 3.x
import { reactive } from '/xxx/node_modules/vue3/dist/vue.runtime.esm-bundler.js'
```

### 4.2 模板编译兼容

以Vite为例，如果想要编译vue, 那么正常需要`@vitejs/plugin-vue`插件的，但是它支持Vue3的模板编译，所以还要安装两个sfc编译插件：

    npm i @vitejs/plugin-vue@2.0.0
    npm i @vitejs/plugin-vue2@2.2.0

然后配置一下：

```js
{
    plugins: [
      isVue3()
        ? vitePluginVue({
            include: [/\.vue$/, /\.md$/],
          })
        : vitePluginVue2({
            include: [/\.vue$/, /\.md$/],
          }),
    ]
}
```

但是这样肯定是不行的，为什么呢？

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bc41f1696c34ccd99b9d939f9674183~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%">

翻一下源码就能看到，它依赖了`vue/compiler-sfc`, 两个插件都是依赖了相同的sfc编译器。那结果显而易见，产物最后肯定还是一样的。

所以它也需要安装不同的版本：

```bash
npm i @vue/compiler-sfc-vue2@npm:@vue/compiler-sfc@^2.7.14
npm i @vue/compiler-sfc-vue3@npm:@vue/compiler-sfc@^3.2.45
```

然后通过设置compiler，可以指定使用哪个编译器编译。

```js
{
    plugins: [
      isVue3()
        ? vitePluginVue({
            include: [/\.vue$/, /\.md$/],
            compiler: vue3Compiler as any
          })
        : vitePluginVue2({
            include: [/\.vue$/, /\.md$/],
            compiler: vue2Compiler as any
          }),
    ]
}
```

### 4.3  jsx编译兼容

在组件库开发中，难免会使用到jsx的语法，我们同样要做切换。就不多废话了，直接安装：

    npm i @vitejs/plugin-vue-jsx @vitejs/plugin-vue2-jsx

然后配置vite插件:

```js
{
  plugins: [
      isVue3()
        ? vitePluginJsx({
            include: [/\.[jt]sx$/]
          })
        : vitePluginJsx2({
            include: [/\.[jt]sx$/]
          })
  ]
}
```

## 5. 运行时兼容方案

我们知道Vue 2.7 和 Vue 3.x或多或少API上存在差异，上面也详细说过，那么怎么做到兼容两个版本API呢？

很简单，没有的API就自己实现，从而抹平差异，所以需要一层`适配器`。用下面这个图来表示，再适合不过了：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/094f3de22e4142108d8d594317aad477~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%">

在适配器中，我们区分了两套代码，分别对应 Vue 3.x 和 Vue 2.7

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e88918170f24c53a0842a6f90ef610b~tplv-k3u1fbpfcp-watermark.image?)

如果是Vue3的代码，直接export导出就可以了，不用做polyfill

如果是Vue 2.7就需要单独实现代码了。

最后直接导出:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c838cb373d3241e0999b97bcda6b59c7~tplv-k3u1fbpfcp-watermark.image?)

为什么这里，只导出vue3呢？ 其实这里，在编译层面我们做了一些处理，如果是Vue 2.7版本，会自动修改为：

```js
export * from './v2'
```

## 6. 构建产物切换

最后打包出如下目录结构：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dc9848b61fb483e94bc3d844a620171~tplv-k3u1fbpfcp-watermark.image?)

那么如何做到，Vue3的时候使用 `v3`里面的产物，而Vue 2.7时使用 `v2`里的产物呢

其实很简单，利用`postinstall`的机制, 在安装完组件库后，会获取当前Vue的版本，手动修改`package.json`里面的`module`, `main`等字段。

| Vue 3                                                                                                                             | Vue 2.7                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d34230d8d024f1f9c8554ad8035fc2b~tplv-k3u1fbpfcp-watermark.image?) | ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aafd0fea6c54a31a197af339a6d9852~tplv-k3u1fbpfcp-watermark.image?) |

```js
// 修改package.json module等
function switchVersion(version) {
  const pkg = require('../package.json');
  Object.assign(pkg, moduleMap[version]);

  const pkgStr = JSON.stringify(pkg, null, 2);

  fs.writeFileSync(path.resolve(__dirname, '../package.json'), pkgStr, 'utf-8');
}


const version =
  process.env.npm_config_vueVersion || (Vue ? Vue.version : '2.7.');
if (!Vue || typeof version !== 'string') {
  console.warn(
    'Vue is not found. Please run "npm install vue" to install.'
  );
} else if (version.startsWith('2.7.')) {
  switchVersion(2.7);
} else if (version.startsWith('2.')) {
  switchVersion(2);
} else if (version.startsWith('3.')) {
  switchVersion(3);
} else {
  console.warn(`Vue version v${version} is not suppported.`);
}
```
以上就是自动切换vue版本对应产物的方案
# 总结

由于是用于公司内部代码，所以并未开源，相关代码就不放出来了，以上只列出了核心代码和逻辑。其中需要处理的细节非常多，例如：

*   vue2 和 vue3的类型在同一套代码中怎么兼容
*   API适配，怎么实现？
*   组件打包后的产物怎么区分两种版本代码
*   组件库如何自动识别当前项目vue版本，做自动切换
*   ...

当然，这些问题其实方案都已经完善了，后续有空会考虑开发一套兼容2.7和3.x的组件库框架（如果有时间\~。。）

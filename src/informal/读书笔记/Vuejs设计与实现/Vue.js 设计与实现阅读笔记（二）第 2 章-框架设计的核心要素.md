---
index: 2
---
# Vue.js 设计与实现阅读笔记（二）第 2 章-框架设计的核心要素
## 2.1 提升用户的开发体验

### Vue 对 warn 的处理

提供友好的报错信息至关重要, 在 Vue 源码中我们经常看到`warn函数的调用`, 例如下面组件没有 template 的警告信息

```js
warn(
  `Component ${
    comp.name ? `${comp.name} ` : ``
  } is missing template or render function.`
);
```

那么 vue 是如何处理错误，进行警告呢，我们来看下 vue 源码的实现

```js
const stack: VNode[] = [];

export function warn(msg: string, ...args: any[]) {
  const instance = stack.length ? stack[stack.length - 1].component : null;

  // 用户传入的警告统一处理函数
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  // 获取组件栈
  const trace = getComponentTrace();

  // 如果用户传入了自定义警告函数
  if (appWarnHandler) {
    // 调用 warnHandler 同时处理 warnHandler中可能出现的异常
    callWithErrorHandling(
      appWarnHandler,
      instance,
      ErrorCodes.APP_WARN_HANDLER,
      [
        msg + args.join(""),
        instance && instance.proxy,
        trace
          .map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          )
          .join("\n"),
        trace,
      ]
    );
  } else {
    // 用户没有传入 warnHandler
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    /* istanbul ignore if */
    if (
      trace.length &&
      // avoid spamming console during tests
      !__TEST__
    ) {
      warnArgs.push(`\n`, ...formatTrace(trace));
    }
    // log 警告信息
    console.warn(...warnArgs);
  }
}
```

### 更加直观的查看 log

正常打印一个 ref 是长这样
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c860982b6694cb3afe3da4b82dd93a6~tplv-k3u1fbpfcp-zoom-1.image)

但是我们可以通过一些设置，来直观的查看 log 数据
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bc358c6f8ac411091ae6c4dd9197223~tplv-k3u1fbpfcp-zoom-1.image)
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14b7fdcc9c9b4436a09e5958e34a4731~tplv-k3u1fbpfcp-zoom-1.image)

## 2.2 控制框架代码的体积

可以发现 vue 源码中，有很多 warn 都会配合`__DEV__`常量做检查

```js
if (__DEV__ && isPromise(data)) {
  warn(
    `data() returned a Promise - note data() cannot be async; If you ` +
      `intend to perform data fetching before component renders, use ` +
      `async setup() + <Suspense>.`
  );
}
```

这里的`__DEV__`是通过 rollup 来预定义全局变量，类似`webpack`的`DefinePlugin`
当 Vue.js 在开发环境被使用时，这里`__DEV__`会被直接编译为`true`，如下

```js
if (true && isPromise(data)) {
  warn(
    `data() returned a Promise - note data() cannot be async; If you ` +
      `intend to perform data fetching before component renders, use ` +
      `async setup() + <Suspense>.`
  );
}
```

## 2.3 框架要做到良好的`Tree-Shaking`

首先要实现`tree-shaking`，必须要基于`esm`规范，因为需要静态分析代码，做`dead code`去除。

第二，tree-shaking 的关键是-----副作用, 什么是副作用呢
可以参考我的另一篇文章 [tree-shaking](/frontend/webpack/tree-shaking原理.html#什么是tree-shaking)

不过我们还是举个简单的例子

```js
function foo(obj) {
  obj && obj.foo;
}
foo();
```

上面的代码经过 rollup 编译后，并不会被去除，为什么呢？假如`obj`是一个`Proxy`对象，它有一个 get 函数，如果在 get 函数中产生了副作用，那这个函数也是有副作用的。

所以如果我们想指定这里函数调用，不会产生副作用，我们可以这么做

```js
function foo(obj) {
  obj && obj.foo;
}
/*#__PURE__*/ foo();
```

加上上面的注释后，该代码就会被 tree-shaking， 并且一般来讲`/*#__PURE__*/`都是用在顶层调用的。

我们可以看到在 Vue 源码中也有很多这样的代码
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3fe2e367aa342e78308919154426a78~tplv-k3u1fbpfcp-zoom-1.image)

## 2.4 框架应该输出怎样的构建产物

细心的朋友会发现，vue 源码打包出来后的静态文件，类型非常多，那么它们又分别对应什么环境呢？
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd1b94adb373465091d570435dc2b45a~tplv-k3u1fbpfcp-zoom-1.image)

| 产物                            | 描述                                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| vue.cjs.js                      | 遵循 commonjs 规范，开发环境使用                                           |
| vue.cjs.prod.js                 | 遵循 commonjs 规范，生产环境使用                                           |
| vue.esm-browser.js              | 遵循 esm 规范， 用于 script 标签 type="module"，开发环境使用               |
| vue.esm-browser.prod.js         | 遵循 esm 规范，用于 script 标签 type="module"，生产环境使用                |
| vue.esm-bundler                 | 遵循 esm 规范，开发环境使用                                                |
| vue.global.js                   | iife 立即执行函数，开发环境使用                                            |
| vue.runtime.esm-browser.js      | 遵循 esm 规范， 用于 script 标签 type="module"，开发环境使用，只包含运行时 |
| vue.runtime.esm-browser.prod.js | 遵循 esm 规范， 用于 script 标签 type="module"，生产环境使用，只包含运行时 |
| vue.esm-bundler.js              | 遵循 esm 规范，开发环境使用，只包含运行时                                  |
| vue.runtime.global.js           | iife 立即执行函数，开发环境使用，只包含运行时                              |
| vue.runtime.global.prod.js      | iife 立即执行函数，生产环境使用，只包含运行时                              |

那么 Vue 是如何区分不同的开发环境，引入不同的包呢, 我们不难发现，在 vue 的`index.js`中，有如下代码

```js
if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/vue.cjs.prod.js");
} else {
  module.exports = require("./dist/vue.cjs.js");
}
```

另外，如何区分不同的模块规范？其实一般都是通过`package.json`中的`main`和`module`来指定的

```js
{
  "main": "index.js",
  "module": "dist/vue.runtime.esm-bundler.js" // 优先使用module
}
```

## 2.5 特性开关

在设计框架时，框架会给用户提供诸多特性（或功能），例如我们提供 A、B、C 三个特性给用户，同时还提供了 a、b、c 三个对应的特性开关，用户可以通过设置 a、b、c 为 true 或 false 来代表开启或关闭对应的特性，这将会带来很多益处。

那怎么实现特性开关呢？利用 rollup.js 的预定义常量插件来实现。
```js
{
  __FEATURE_OPTIONS_API__: isBundlerESMBuild ? `__VUE_OPTIONS_API__` : true,
}
```

对于`非esm`的构建资源，`__FEATURE_OPTIONS_API__`会被直接替换成true, 例如
```js
// support for 2.x options
if (__FEATURE_OPTIONS_API__) {
  currentInstance = instance
  pauseTracking()
  applyOptions(instance, Component)
  resetTracking()
  currentInstance = null
}

// 源码最终直接变成了true, 此处代码最终会被视为dead code 去除
if (true) {
  currentInstance = instance
  pauseTracking()
  applyOptions(instance, Component)
  resetTracking()
  currentInstance = null
}
```


如果是`esm`的构建资源，`__FEATURE_OPTIONS_API__`会被替换成`__VUE_OPTIONS_API__`, 例如

```js
if (__FEATURE_OPTIONS_API__) {
  currentInstance = instance
  pauseTracking()
  applyOptions(instance, Component)
  resetTracking()
  currentInstance = null
}

// 最后变成

if (__VUE_OPTIONS_API__) {
  currentInstance = instance
  pauseTracking()
  applyOptions(instance, Component)
  resetTracking()
  currentInstance = null
}
```

替换成`__VUE_OPTIONS_API__`, 也就意味着，这个开关是交给用户控制的，例如你可以在你的项目中使用`webpack.DefinePlugin`来控制这个变量，进而控制是否支持vue 2.x的options
```js
// webpack.DefinePlugin 插件配置
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true) // 开启特性
})
```

## 2.6 错误处理
错误处理是框架开发过程中非常重要的环节。框架错误处理机制的好坏直接决定了用户应用程序的健壮性，还决定了用户开发时处理错误的心智负担。

当你写了一大堆try catch, 就会显得非常不优雅。
```js
// utils.js
export default {
  foo(fn) {
    try {
    fn && fn()
    } catch(e) {/* ... */}
  },
  bar(fn) {
    try {
    fn && fn()
    } catch(e) {/* ... */}
  },
}
```

**封装统一的错误处理函数**:
```js
// utils.js
let handleError = null
export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  foo1(fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}

function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    // 将捕获到的错误传递给用户的错误处理程序
    handleError ? handleError(e) : console.error(e)
  }
}
```

上面的代码中，我们不再需要try catch 并且用户可以自定义错误处理方法。



## 2.7 良好的 TypeScript 类型支持
TypeScript 是由微软开源的编程语言，简称 TS，它是 JavaScript 的超集，能够为 JavaScript 提供类型支持。现在越来越多的开发者和团队在项目中使用 TS。使用 TS 的好处有很多，如代码即文档、编辑器自动提示、一定程度上能够避免低级 bug、代码的可维护性更强等。因此对 TS 类型的支持是否完善也成为评价一个框架的重要指标。
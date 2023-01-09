# webpack 动态加载原理

## 前言

在 vue 中我们经常用到动态导入页面组件，那么它是如何实现的呢，本文将通过简单的案例，快速了解实现原理

## 例子

```js
// index.js
import("./test").then((fn) => {
  console.log(fn.default());
});
```

```js
// test.js
export default function func() {
  return 1;
}
```

打包后的代码包含两个文件 `bundle.js` 和 `0.js`

## 1. 模块加载

webpack 通过`__webpack_require__`加载模块代码

```js
// bundle.js
function __webpack_require__(moduleId)
  // 如果模块已经加载，直接返回模块导出
	if(installedModules[moduleId]) {
		return installedModules[moduleId].exports;
	}

  // 模块导出和模块信息
	var module = installedModules[moduleId] = {
		i: moduleId,
		l: false,
		exports: {}
	}
  // 执行模块代码
	modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
	module.l = true // 标记模块已经加载完成
	return module.exports;
}
```

```js
__webpack_require__("index.js");
```

然后执行`index.js`编译后的代码，如下。

```js
Promise.all(
  [
    __webpack_require__.e(0)
  ]
).then(
  __webpack_require__.bind(null, "./src/test.js")
).then(function (fn) {
  console.log(fn.default());
}));
```

## 2. jsonp 动态加载 script

先一步步来，看下`__webpack_require__.e`这个方法，它是最先调用的。

```js
// bundle.js

__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];

  var installedChunkData = installedChunks[chunkId];

  // 如果这个chunk已经加载过了 就不需要加载了
  if (installedChunkData !== 0) {
    // 0 means "already installed"
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // 为这个chunk创建一个promise
      var promise = new Promise(function (resolve, reject) {
        // 记录这个chunk对应promise的resolve和reject方法
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });

      // promises数组里添加这个chunk对应的promise
      promises.push((installedChunkData[2] = promise));

      // ============== 动态创建script =================
      var script = document.createElement("script");
      var onScriptComplete;
      script.charset = "utf-8";
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute("nonce", __webpack_require__.nc);
      }
      script.src = jsonpScriptSrc(chunkId);
      // create error before stack unwound to get useful stacktrace later
      var error = new Error();
      // =================================================

      onScriptComplete = function (event) {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            var errorType =
              event && (event.type === "load" ? "missing" : event.type);
            var realSrc = event && event.target && event.target.src;
            error.message =
              "Loading chunk " +
              chunkId +
              " failed.\n(" +
              errorType +
              ": " +
              realSrc +
              ")";
            error.name = "ChunkLoadError";
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      };
      var timeout = setTimeout(function () {
        onScriptComplete({ type: "timeout", target: script });
      }, 120000);
      script.onerror = script.onload = onScriptComplete;
      document.head.appendChild(script);
    }
  }
  return Promise.all(promises);
};
```

总结一下，上述代码做的事情

- 如果 chunk 没有被加载过，会为这个 chunk`创建一个promise对象`
- 将 promise 对象存在`promises数组`中
- 将 promise 的`resolve 和 reject`存在`installedChunks[chunkId]`中

## 3. 执行异步脚本

经过上面的过程，会动态加载`0.js`的脚本代码

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [0],
  {
    "./src/test.js": function (
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return func; });\nfunction func() {\n  return 1;\n}\n\n//# sourceURL=webpack:///./src/test.js?'
      );

      /***/
    },
  },
]);
```

可以看到 window 上有一个`webpackJsonp`数组，那么这个东西是从哪里来的呢？，我们来看下面的代码。

```js
// bundle.js
var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
jsonpArray.push = webpackJsonpCallback;
jsonpArray = jsonpArray.slice();
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;
```

其实一开始初始化时已经覆盖实现了`webpackJsonp.push`方法

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{
  // test.js引入的模块代码
})

// 等价于

webpackJsonpCallback([[0],{
  // test.js引入的模块代码
})
```

下面再看看`webpackJsonpCallback`代码的实现

## 4. webpackJsonpCallback

```js
// bundle.js

function webpackJsonpCallback(data) {
  // chunkid
  var chunkIds = data[0];
  // chunkid对应的模块
  var moreModules = data[1];
  var moduleId,
    chunkId,
    i = 0,
    resolves = [];

  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (
      Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      // 收集chunk对应的resolve方法
      resolves.push(installedChunks[chunkId][0]);
    }
    // 标记该chunk已经加载
    installedChunks[chunkId] = 0;
  }
  for (moduleId in moreModules) {
    if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      // 添加chunk模块，到全局modules对象中
      modules[moduleId] = moreModules[moduleId];
    }
  }
  if (parentJsonpFunction) parentJsonpFunction(data);

  // 依次执行chunk对应promise的resolve方法
  while (resolves.length) {
    resolves.shift()();
  }
}
```

还是总结一下上面代码的过程

- 收集 chunk 对应的 resolve 方法, 前面执行`__webpack_require__.e`时放在了`installedChunks[chunkId]`里
- 将异步 chunk 下的所有模块 添加到 全局 modules
- 依次执行 chunk 对应 promise 的 resolve 方法

## 5. 执行异步模块代码

回到一开始`index.js`的代码

```js
Promise.all(
  [
    __webpack_require__.e(0)
  ]
).then(
  __webpack_require__.bind(null, "./src/test.js")
).then(function (fn) {
  console.log(fn.default());
}));
```

经过上面的步骤，此时 promise 已经 resolve 了，`__webpack_require__.bind(null, "./src/test.js")` 会被执行，
此时异步模块的代码已经在`modules`上了，所以可以直接加载。

最后，执行 fn 方法

```js
console.log(fn.default());
```

## 流程图

![webpack动态加载流程 (1).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ef4ee3b49a8473a870421ed1201b98e~tplv-k3u1fbpfcp-watermark.image?)

## 总结

webpack 动态 import 的实现还是比较简单的，具体细节大家可以自己翻阅下打包后的代码~

# Webpack 原理系列之彻底搞懂 loader 原理

## 前言

loader 是 webpack 打包过程中非常重要的一环，通过了解 loader 的执行过程，不仅可以学习到很多设计思想，还可以在以后遇到 webpack 配置问题，处理起来得心应手

## 如何写一个 loader

loader 本质是一个函数，接收文件内容，返回处理过后的源码，下面是一个简单的 loader 示例

```js
module.exports = function (source) {
  const code = transform(source); // 在这里你可以对文件内容进行转换或处理
  return code;
};
```

以上实现了一个简单的 loader, 看起来是不是很简单。下面稍微升级一点难度。实现一个简单的`style-loader`

```js
function loader(source) {
  let script = `let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(
      source
    )}; document.head.appendChild(style); `;
  return script;
}
module.exports = loader;
```

当我们配置上`style-loader`后，遇到`import 'a.css'`时会将其原本的内容替换成一段 JS 脚本，并将样式代码插入到`head`标签中

## loader 的种类

虽说要实现一个 loader 很简单，但是需要注意的是，在 webpack 中 loader 可以分以下几种类型：

- **pre loader**
- **normal loader**
- **inline loader**
- **post loader**

以上 loader 的执行是`从上到下`执行的。也就是 `pre-loader => normal loader => inline loader => post loader`，我们先来看一个例子。

代码包含两个文件`index.js`和`test.js`, 在导入`test.js`时使用了`inline-loader`, 我们先不关心各种 Loader 是怎么写的。

```js
// index.js
import test from 'inline-loader2!inline-loader1!./test'
export default function func() {
  return test
}

// test.js
export default 1
```

下面的代码配置了另外三种 loader

```js
const path = require("path");

function loaderPath(loaders) {
  return loaders.map((loader) =>
    path.resolve(__dirname, "loaders", loader + ".js")
  );
}
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      // pre loader
      {
        test: /\.js$/,
        enforce: "pre",
        use: loaderPath(["pre-loader1", "pre-loader2"]),
      },
      // normal loader
      {
        test: /\.js$/,
        use: loaderPath(["normal-loader1", "normal-loader2"]),
      },
      // post loader
      {
        test: /\.js$/,
        enforce: "post",
        use: loaderPath(["post-loader1", "post-loader2"]),
      },
    ],
  },
};
```

看下运行结果

```js
// index.js 执行的loader
pre - loader2;
pre - loader1;
normal - loader2;
normal - loader1;
post - loader2;
post - loader1;

// test.js 执行的loader
pre - loader2;
pre - loader1;
normal - loader2;
normal - loader1;
inline - loader2;
inline - loader1;
post - loader2;
post - loader1;
```

### inline loader 的写法

通过上面的示例，我们大体了解了 loader 的执行顺序，大家先留个印象。但是大家可能比较疑惑，`inline-loader`的写法怎么这么奇怪。有时候我们项目在编译的时候经常会看到类似的 log, 比如 vue 编译的时候, 有这么一长串：

```js
-!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib/index.js??vue-loader-options!./app.vue?vue&type=template&id=5ef48958&scoped=true&
```

上面的内容其实可以分为四部分

```js
-!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options

!../node_modules/vue-loader/lib/index.js??vue-loader-options

!./app.vue

?vue&type=template&id=5ef48958&scoped=true&
```

`inline-loader`其实是通过`!`将 loader 进行分割，例如

```js
import test from "inline-loader2!inline-loader1!./test";
// 包含 inline-loader2 和 inline-loader1
```

那么`-!`这个前缀又是什么呢，其实前缀有多种写法：
[Webpack 中文文档](https://webpack.js.org/concepts/loaders/#configuration)

| 符号 | 变量                 | 含义                                |
| ---- | -------------------- | ----------------------------------- |
| -!   | noPreAutoLoaders     | 不要前置和普通 loader               |
| !    | noAutoLoaders        | 不要普通 loader                     |
| !!   | noPrePostAutoLoaders | 其他 loader 都不要，只要内联 loader |

比如我们在前面加了`!!`前缀，那么`normal`, `pre`, `post` loader 都不会执行，
所以内联 loader 是比较灵活的，在日常项目中并不推荐使用

## loader 是如何执行的

其实 webpack 为了实现 loader 的功能，单独开发了一个 loader 执行器，也就是[loader-runnner](https://www.npmjs.com/package/loader-runner)。下面看个简单的例子

```js
import { runLoaders } from "loader-runner";

runLoaders({
    resource: "/abs/path/to/file.txt?query", // 需要处理的文件路径
    loaders: ["/abs/path/to/loader.js"], // loader文件路径
    context: { minimize: true }, // loader上下文，可通过this获取
    processResource: (loaderContext, resourcePath, callback) => { ... },
    readResource: fs.readFile.bind(fs)
}, function(err, result) {
   // 处理后的文件内容
})
```

在执行 runLoaders 过后，会获取到文件最终的内容。上面的例子在执行后，会经过如下的流程。

1. 按照`post -> inline -> normal -> pre`顺序， `从左到右`执行相同类型的`loader.pitch`
2. 按照`pre -> normal -> inline -> post`顺序， `从右到左`执行相同类型的`loader`

![未命名文件 (12).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a162416559644448c6d1438c7967ae0~tplv-k3u1fbpfcp-watermark.image?)

> pitch 和 normal 执行顺序完全相反，pitch 先执行

### pitch loader

看了上面 loader 执行的过程，大家可能又比较疑惑`pitch loader`是什么。其实在开发 Loader 时，我们可以在导出的函数上添加一个  `pitch`  函数，就像下面这样：

```js
function loader(source) {
  console.log("normal-loader1");
  return source;
}

/**
 *
 * @param {*} remainingRequest 剩余需要执行的pitch loader
 * @param {*} precedingRequest 已经执行过得pitch loader
 * @param {*} data
 */
loader.pitch = function (remainingRequest, precedingRequest, data) {
  console.log(remainingRequest);
  console.log(precedingRequest);
  console.log(data);
};

module.exports = loader;
```

当文件经过该 loader 处理时，pitch 会先执行，并打印出下面内容

```js
D:\code\pre-loader1.js!D:\code\pre-loader2.js!D:\code\webpack-demo\src\test.js  // 剩余需要执行的pitch loader

D:\code\post-loader1.js!D:\code\post-loader2.js!D:\code\normal-loader1.js // 已经执行过得pitch loader

{} // 空对象
```

再测试下一开始的例子，将会打印下面的内容

```js
// pitch 优先执行了，并且是从post开始
post-loader1 pitch
post-loader2 pitch
inline-loader1 pitch
inline-loader2 pitch
normal-loader1 pitch
normal-loader2 pitch
pre-loader1 pitch
pre-loader2 pitch

pre-loader2
pre-loader1
normal-loader2
normal-loader1
inline-loader2
inline-loader1
post-loader2
post-loader1
```

### pitch loader 的熔断机制

当 pitch 返回一个`非空`的值时，将会跳过后面`pitch loader`和`normal loader`的执行

```js
function loader(source) {
  console.log("normal-loader1");
  return source;
}
loader.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("normal-loader1 pitch");
  return "let a = 0"; // 这里返回了非空值
};
module.exports = loader;
```

我们在`normal-loader1`的 pitch 函数中返回了非空值测试下：

```js
post-loader1 pitch
post-loader2 pitch
inline-loader1 pitch
inline-loader2 pitch
normal-loader1 pitch
inline-loader2
inline-loader1
post-loader2
post-loader1
```

可以看到 loader 只执行到了`normal-loader1 pitch`, `normal-loader1`自身的 loader 也不会执行。
并且`normal-loader1 pitch`的返回值，将作为`inline-loader2`的`source`参数（**大家注意下面红色箭头**）

![未命名文件 (13).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2940e87b4ec247b48816f160cb34c488~tplv-k3u1fbpfcp-watermark.image?)

## loader 上下文

我们再回到前面的例子

```js
import { runLoaders } from "loader-runner";

runLoaders({
    resource: "/abs/path/to/file.txt?query", // 需要处理的文件路径
    loaders: ["/abs/path/to/loader.js"], // loader文件路径
    context: { minimize: true }, // loader上下文，可通过this获取
    processResource: (loaderContext, resourcePath, callback) => { ... },
    readResource: fs.readFile.bind(fs)
}, function(err, result) {
   // 处理后的文件内容
})
```

大家会发现有一个`context`属性，那它是干嘛的呢。下面举个简单的例子

```js
function loader(source) {
  const callback = this.async();
  setTimeout(() => {
    callback(null, source); // 等同于this.callback
  }, 2000);
}
```

上面的代码，我们通过`this`调用了`async`方法，获取一个`callback`, 这种方式可以让我们在 Loader 中实现`异步操作`。

什么是 loader 上下文呢，简单来讲就是`this`, loader 的 this 上有许多变量和函数，能方便我们获取当前需要处理的文件，或者异步处理文件内容。原理也很简单, 就是通过 apply 来实现

```js
loader.apply(loaderContext, args);
```

### loader-runner 自带的上下文属性

其实 loader 上下文的属性可以分为`loader-runner内置`的上下文属性 和 `webpack内置`的上下文属性，什么意思呢？**抛开 webpack 这个构建工具，如我们只是单纯使用`loader-runner`它将包含下面这些上下文属性**。

```js
function loader(source) {
  this.resource; // 需要处理的资源路径
  this.request; // 完整的请求
  this.loaders; // loader对象数组
  this.readResource; // 读取资源的方法，默认fs.readFile
  this.loaderIndex; // 当前正在执行的loader索引
  this.callback; // 回调方法
  this.async; // 异步方法，返回一个回调函数
  this.remainingRequest; // 剩余请求
  this.currentRequest; // 当前请求
  this, previousRequest; // 已经处理过得请求
  this.data; // 当前loader的公共数据
  return source;
}
module.exports = loader;
```

### webpack 的 loader 上下文属性

前面我们知道在执行`runLoaders`方法时，可以传一个`自己的context`，最终会和内置的上下文属性合并。我们直接来看下 webpack 的源码。

```js
// webpack\lib\NormalModule.js
doBuild(options, compilation, resolver, fs, callback) {
  // 创建loader上下文
  const loaderContext = this.createLoaderContext(
    resolver,
    options,
    compilation,
    fs
  );
  // 执行Loader
  runLoaders(
    {
      resource: this.resource,
      loaders: this.loaders,
      context: loaderContext,
      readResource: fs.readFile.bind(fs)
    },
    (err, result) => {
      return callback();
    }
  );
}
```

loaderContext 源码如下

```js
// webpack\lib\NormalModule.js
createLoaderContext(resolver, options, compilation, fs) {
    // ..
    const loaderContext = {
        version: 2,
        emitWarning: warning => {
        },
        emitError: error => {
        },
        getLogger: name => {
        },
        // TODO remove in webpack 5
        exec: (code, filename) => {
        },
        resolve(context, request, callback) {
        },
        getResolve(options) {
        },
        emitFile: (name, content, sourceMap, assetInfo) => {
        },
        rootContext: options.context,
        webpack: true,
        sourceMap: !!this.useSourceMap,
        mode: options.mode || "production",
        _module: this,
        _compilation: compilation,
        _compiler: compilation.compiler,
        fs: fs
    };
    compilation.hooks.normalModuleLoader.call(loaderContext, this);
    return loaderContext;
}
```

从上面的代码可以知道`normalModuleLoader hook`可以方便的获取到 loaderContext, 并且`扩展loader功能`

```js
compiler.hooks.compilation.tap("LoaderPlugin", (compilation) => {
  compilation.hooks.normalModuleLoader.tap(
    "LoaderPlugin",
    (loaderContext, module) => {
      // 扩展loaderContext
    }
  );
});
```

另外，关于 webpack 中`loaderContext`的属性用法，大家感兴趣可以看下

**[Webpack 中文文档](https://www.webpackjs.com/api/loaders/#loader-%E4%B8%8A%E4%B8%8B%E6%96%87)**

## 实现 loader-runner

前面介绍了`loader-runner`用法，不如趁热打铁实现一波~， 实现起来也是非常简单的, 先来看下整体流程图

![loader-runner流程图.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9940abf03e2940b89596cac5bc05b60e~tplv-k3u1fbpfcp-watermark.image?)

在实现之前我们先来回顾下`runLoaders`用法

```js
import { runLoaders } from "loader-runner";

runLoaders({
    resource: "/abs/path/to/file.txt?query", // 需要处理的文件路径
    loaders: ["/abs/path/to/loader.js"], // loader文件路径
    context: { minimize: true }, // loader上下文，可通过this获取
    processResource: (loaderContext, resourcePath, callback) => { ... },
    readResource: fs.readFile.bind(fs)
}, function(err, result) {
   // 处理后的文件内容
})
```

### 1. 初始化 loaderContext

先来实现初始化逻辑

```js
function createLoaderObject(loader) {
  // 获取loader函数
  let normal = require(loader);

  // 获取pitch函数
  let pitch = normal.pitch;

  // 如果为true loader接收的是Buffer，否则是字符串
  let raw = normal.raw;

  return {
    path: loader,
    normal,
    pitch,
    raw,
    data: {}, // 每个loader可以携带一个自定义的数据对象
    pitchExecuted: false, // pitch是否执行
    normalExecuted: false, // normal是否执行
  };
}

function runLoaders(options, finalCallback) {
  const {
    resource, // 资源路径
    loaders = [], // loader配置
    context = {}, // 上下文对象
    readResource = fs.readFile,
  } = options;

  const loaderObjects = loaders.map(createLoaderObject);
  const loaderContext = context;
  loaderContext.resource = resource;
  loaderContext.loaders = loaderObjects;
  loaderContext.readResource = readResource;
  loaderContext.loaderIndex = 0; // 当前正在执行的Loader索引
  // 调用它会执行下一个loader
  loaderContext.callback = null;
  // 默认Loader是同步的
  loaderContext.async = null;

  // 定义request getter
  Object.defineProperty(loaderContext, "request", {
    get() {
      // loader1!loader2!loader3!./a.js
      return loaderContext.loaders
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  // 定义remainingRequest getter
  Object.defineProperty(loaderContext, "remainingRequest", {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex + 1)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  // 定义currentRequest getter
  Object.defineProperty(loaderContext, "currentRequest", {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  // 定义previousRequest getter
  Object.defineProperty(loaderContext, "previousRequest", {
    get() {
      return loaderContext.loaders
        .slice(0, loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  // 定义data getter
  Object.defineProperty(loaderContext, "data", {
    get() {
      return loaderContext.loaders[loaderContext.loaderIndex];
    },
  });

  let processOptions = {
    resourceBuffer: null, // 本次要读取的资源文件Buffer
    readResource,
  };

  // 迭代执行pitch
  iteratePitchingLoader(processOptions, loaderContext, (err, result) => {
    // 最终的回调
    finalCallback &&
      finalCallback(err, {
        result,
        resourceBuffer: processOptions.resourceBuffer,
      });
  });
}

exports.runLoaders = runLoaders;
```

上面的代码中，主要做了这么几件事

- 为每个 loader 创建 loader 对象
- 基于传入的`context`，再初始化一些内置上下文
- 定义一些`request`的`getter`，因为这样才能根据`loaderIndex`实时获取到当前`正在执行loader`的 request 信息
- 迭代 pitch

下面我们详细看下`iteratePitchingLoader`的实现

### 2. iteratePitchingLoader

```js
function iteratePitchingLoader(
  processOptions,
  loaderContext,
  pitchingCallback
) {
  // 从左向右执行，越界了，就可以读取文件了
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return processResource(processOptions, loaderContext, pitchingCallback);
  }
  // 获取当前要执行的loader
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];

  // 没有pitch的情况会执行
  if (currentLoader.pitchExecuted) {
    loaderContext.loaderIndex++;
    return iteratePitchingLoader(
      processOptions,
      loaderContext,
      pitchingCallback
    );
  }
  let fn = currentLoader.pitch;
  currentLoader.pitchExecuted = true;
  // 没有pitch的情况会执行
  if (!fn) {
    return iteratePitchingLoader(
      processOptions,
      loaderContext,
      pitchingCallback
    );
  }

  runSyncOrAsync(
    fn,
    loaderContext,
    [
      loaderContext.remainingRequest,
      loaderContext.previousRequest,
      loaderContext.data,
    ],
    (err, ...args) => {
      // pitch返回值不为空 跳过后续loader， 掉头执行前一个Loader的normal
      if (args.length && args.some((e) => e)) {
        loaderContext.loaderIndex--;
        iterateNormalLoaders(
          processOptions,
          loaderContext,
          args,
          pitchingCallback
        );
      } else {
        return iteratePitchingLoader(
          processOptions,
          loaderContext,
          pitchingCallback
        );
      }
    }
  );
}
```

上面的代码主要做了这几件事

- 从左向右执行，判断是否越界了，超过就代表就可以读取文件了（调用`processResource`方法），同时也代表`pitch`都`没有返回值`
- 没有 pitch 的情况, 继续向后迭代，并使`loaderIndex++`
- 存在`pitch`, 就调用`runSyncOrAsync`

### 3. runSyncOrAsync

```js
function runSyncOrAsync(fn, loaderContext, args, runCallback) {
  let isSync = true;

  loaderContext.callback = (...args) => {
    runCallback(...args);
  };
  loaderContext.async = function () {
    isSync = false;
    return loaderContext.callback;
  };
  const result = fn.apply(loaderContext, args);
  if (isSync) {
    runCallback(null, result);
  }
}
```

`runSyncOrAsync`实现比较简单，只是在`loaderContext`上挂载了一些回调方法。其实最后执行的都是`loaderContext.callback`。
在执行完上面的内容后，会通过`runCallback`拿到返回结果，并判断结果是否为空，如果为空就继续迭代。否则就开始迭代`normal loader`

### 4. iterateNormalLoaders

看完上面 iteratePitchingLoader 的实现后，其实大家也能猜到这个方法的实现了，其实就是反过来迭代了。

```js
function convertArgs(args, raw) {
  if (raw && !Buffer.isBuffer(args[0])) {
    args[0] = Buffer.from(args[0]);
  } else if (!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString();
  }
}

function iterateNormalLoaders(
  processOptions,
  loaderContext,
  args,
  pitchingCallback
) {
  // 如果超出左边边界，就调用结束回调
  if (loaderContext.loaderIndex < 0) {
    return pitchingCallback(null, ...args);
  }
  // 获取当前loader
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoader.normalExecuted) {
    loaderContext.loaderIndex--;
    return iterateNormalLoaders(
      processOptions,
      loaderContext,
      args,
      pitchingCallback
    );
  }
  let normalFn = currentLoader.normal;
  currentLoader.normalExecuted = true;
  convertArgs(args, currentLoader.raw);
  // 执行normal loader
  runSyncOrAsync(normalFn, loaderContext, args, (err, ...returnArgs) => {
    return iterateNormalLoaders(
      processOptions,
      loaderContext,
      returnArgs,
      pitchingCallback
    );
  });
}

function processResource(processOptions, loaderContext, pitchingCallback) {
  // 调用readResource 读取文件内容，读取完成后，拿到文件内容向左迭代
  processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
    processOptions.resourceBuffer = resourceBuffer;
    loaderContext.loaderIndex--;
    // 迭代执行normal loader
    iterateNormalLoaders(
      processOptions,
      loaderContext,
      [resourceBuffer],
      pitchingCallback
    );
  });
}
```

以上就是`loader-runner`的执行过程，是不是非常简单~，源码已放入[github](https://github.com/fyhhub/loader-runner)

## 预告

下一篇我将基于本文内容，分析一下**vue-loader**源码，大家敬请期待

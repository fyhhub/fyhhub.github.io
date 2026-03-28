# Webpack5 新特性

[官方文档](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/)

## 启动命令

- Webpack4

```json
"scripts": {
  "dev": "webpack-dev-server"
}
```

- Webpack5

```json
"scripts": {
  "dev": "webpack serve"
}
```

**注意：都需要安装 webpack-dev-server**

## 持久化缓存

webpack5 内置了 cache-loader

```js
// webpack.config.js
module.exports = {
  cache: {
    type: "filesystem", // or memory
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"),
  },
};
```

**注意：如果开启 filesystem 缓存，安装模块时不要使用 cnpm 安装，原因请看下面的 issue**

[issues 335](https://github.com/cnpm/cnpm/issues/335)

build 后会生成.cache

![image.png](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gx7ok9tpq6j317w0bkacb.jpg)

`第一次build和第二次build对比`

![image.png](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gx7okjpnr1j31880litq3.jpg)

`手动修改部分代码后build`
![image.png](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gx7okuy8dvj318e05ctcj.jpg)

- webpack 会缓存生成的 webpack 模块和 chunk 来改善构建速度

- 缓存在 webpack5 中默认开启，默认是在内存中，也可以手动设置

- webpack 追踪了每个模块依赖，并创建文件快照，如果模块快照和对应模块对比有变化，就会重新构建该模块

## 资源模块

webpack5 不再需要`file-loader、url-loader、raw-loader`, 内置这些功能

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg)/,
        type: "asset/resource", // 相当于file-loader
      },
      {
        test: /\.ico/,
        type: "asset/inline", // 相当于url-loader 生成base64
      },
      {
        test: /\.txt/,
        type: "asset/source", // 相当于raw-loader
      },
      {
        test: /\.jpg/,
        type: "asset", // 大于maxSize生成资源文件，否则生成base64
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.sass$/,
        type: "stylesheet",
        use: "sass-loader",
      },
    ],
  },
};
```

## URIS

**字符串导出**

```js
import data from "data:text/javascript,export default 'title'";
```

## moduleIds 和 chunkIds 优化

- module: 每个文件都是一个 module
- chunk: webpack 打包生成的文件，一个文件代表一个 chunk

配置

| 可选值        | 作用                                                       | 示例          |
| ------------- | ---------------------------------------------------------- | ------------- |
| natural       | 按使用顺序的数字 id                                        | 1             |
| named         | 方便调试的可读性 id                                        | src_two_js.js |
| deterministic | 根据模块名称生成简短 hash 值（文件名修改，chunk 名才会变） | 999           |
| size          | 根据模块大小生成数字 id                                    | 0             |

```js
// webpack.config.js
optimization: {
  moduleIds: 'deterministic',
  chunkIds: 'deterministic'
}
```

::: tip
优点：**webpack5 之前，动态 import 每次打包之后的 chunk 文件名是根据顺序来设置的，如果代码中删除中间某个动态 import，那么所有的 chunk 文件名都会改变，这就会导致缓存失效，所有 chunk 都会重新加载，deterministic 可以很好解决以上问题**
:::

## tree shaking 优化

例 1

```js
export function func1() {
  console.log("1");
}
export function func2() {
  console.log("1");
}
import { func1 } from "./views/module1";
func1();
```

打包后

```js
(() => {
  "use strict";
  console.log("1");
})();
```

例 2

```js
// views/one.js
console.log(123);
document.title = "123";
export function func() {
  return 123;
}
import "./views/one";
```

打包后

```js
(() => {
  "use strict";
  console.log(123), (document.title = "123");
})();
```

## nodejs polyfill 移除

在早期，webpack 的目的是为了让大多数的 Node.js 模块运行在浏览器中，但如今模块的格局已经发生了变化，现在许多模块主要是为前端而编写。webpack <= 4 的版本中提供了许多 Node.js 核心模块的 polyfills，一旦某个模块引用了任何一个核心模块（如 cypto 模块），webpack 就会自动引用这些 polyfills。

尽管这会使得使用为 Node.js 编写模块变得容易，但它在构建时给 bundle 附加了庞大的 polyfills。在大部分情况下，这些 polyfills 并非必须。

从 webpack 5 开始不再自动填充这些 polyfills，而会专注于前端模块兼容。提高 web 平台的兼容性。

```js
resolve: {
  extensions: ['.js', '.jsx'],
  fallback: {
    'crypto': require.resolve('crypto-browserify'), // 手动配置polyfill
    'stream': require.resolve('stream-browserify'),
    'buffer': require.resolve('buffer'),
  }
}
```

## 模块联邦

ModuleFederationPlugin 配置参数
|属性 |类型 |作用|
|---|---|---|
|name |String 必传值，即输出的模块名，被远程引用时路径为${name}/${expose}|
|library |Object |声明全局变量的方式，name 为 umd 的 name|
|filename |String |构建输出的文件名|
|remotes |Object |远程引用的应用名及其别名的映射，使用时以 key 值作为 name|
|exposes |Object |被远程引用时可暴露的资源路径及其别名|
|shared |Object |与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同-份依赖|

### 生产远程组件

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      // 组件的全局变量名
      name: "remote",
      // 远程组件文件
      filename: "remoteEntry.js",
      exposes: {
        // 共享组件
        "./NewList": "./src/components/NewList.js",
      },
      shared: ["react", "react-dom"], // 共享react
    }),
  ],
};
```

### 消费远程组件

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        // 远程组件name
        remote: "remote@http://localhost:8080/remoteEntry.js",
      },
    }),
  ],
};
```

## 支持 TopAwait

```js
import React from "react";
await import("./App.js"); // 可以不用声明async函数  直接await
```

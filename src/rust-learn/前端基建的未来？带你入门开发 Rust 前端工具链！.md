# 前端基建的未来？带你入门开发 Rust 前端工具链！

## 前言

JavaScript是一个非常古老且富有活力的编程语言，发展至今已经应用于每个计算机的浏览器中。甚至后来发展成可以运行后端服务的运行时平台NodeJS, 并且逐渐形成非常庞大的生态，例如：

*   `Gulp`:  基于 node 强大的流(stream)能力来处理代码。
*   `Webpack`: 用于现代 JavaScript 应用程序的静态模块打包工具
*   `Babel`: 现代前端底层javascript编译工具
*   `Prettier`: 代码格式化工具

...

我们可以发现不管什么工具，其实都是用`Javscript`来实现的，也就是我们常说的`V8`来执行的。

用一张图来解释下javascript的执行过程:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5edd283b16f1459d904cdf89cf2bb9dc~tplv-k3u1fbpfcp-watermark.image?)

**可以发现，javascript的执行其实经历了多个过程，从初始的js代码，到最终的二进制代码所经历的过程，其实消耗了不少性能，那么有没有办法直接获取二进制呢？**

其实是可以的。目前来讲，有两种方式可以用 `Javascript` 执行`二进制文件`：

1.  第一种：**由 NodeJS去执行的二进制文件，如esbuild, swc 就是基于此实现的**

    ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b81406498a9a41f282e94506529cc9ea~tplv-k3u1fbpfcp-watermark.image?)

2.  第二种：**WebAssembly， 它是一种低层次、类汇编的语言，使用了一种紧凑的二级制格式，可以用`Rust`、`Go`、`C++`编译生成，wasm的模块执行速度堪比原生。同时也支持在浏览器、Node环境中执行**


## 一、聊聊esbuild、swc 那些你应该知道的事

在Vite 2.x 发布之初，其内置的 esbuild 以超快的构建速度，给大多数前端er留下了深刻印象。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b783574cdd21456193a71bc47f6ba15d~tplv-k3u1fbpfcp-watermark.image?)

截止目前Vite甚至生产打包也使用esbuild，将esbuild推上了新的高度。

社区中也有不少基于`esbuild`开发的前端工具, 如 [tsup](https://tsup.egoist.dev/)（可以无配置的打包TS项目，基于esbuild），另外umi也支持esbuild打包代码等。。

然而，这样就解决了目前所有代码构建中存在的问题吗？

其实并不一定，俗话说术业有专攻。`esbuild`虽然提供了代码的编译、打包功能。但是在语法和api降级方面还不够完善，只能处理`es6`以上的语法和api。

我们知道前端代码中其实存在非常多高版本的语法和api, 而常见的解决方案就是借助`babel`, 将语法和api降级。

但是`babel`是用js实现的，目前前端工具链其实都建立在对`AST`操作上进行的。babel在对代码的处理过程占据了代码打包的很大一部分，且受限于js本身的性能。依然无法达到最优解。



**所以`swc`出现了，它是一个对标babel的web编译器，是用rust编写的**，我们可以看看官方的介绍，相当强悍。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/674f81ac8ea543fd84f2c6a293554d16~tplv-k3u1fbpfcp-watermark.image?)

我们可以注意到关键点：

1.  知名项目 Next.js、Parcel和Deno 等工具 以及 Vercel、字节跳动、腾讯、Shopify等公司都在使用它。
2.  单线程情况下比`babel`快`20倍`，4核情况下快`70倍`

由于swc支持将代码转为`AST`抽象语法树，且受益于`rust`超快的执行速度，以及内存操作的安全性。
**似乎正在掀起一场基于rust重构前端工具链的新赛道**。


从近两年的前端工具链的不断更迭，大家可以发现，越来越多的工具开始使用`rust`开发，有的也是直接基于`swc`的进一步开发。

## 二、为什么说Rust正在统一前端工具链

### 1. [swc](https://swc.rs/)

前面已经简单介绍过了 swc，下面来说说swc的一些生态:

官方生态：

*   [@swc/jest](https://swc.rs/docs/usage/jest): 提高了单元测试中，代码的编译速度。
*   [swc-loader](https://swc.rs/docs/usage/swc-loader): 用于webpack的swc loader
*   [@swc/wasm-web](https://swc.rs/docs/usage/wasm): 可以在浏览器的运行时中使用wasm模块编译并转换js代码。
*   [swcpack](https://swc.rs/docs/usage/bundling): swc的打包工具，目前还处于开发试验阶段，也非常值得期待
*   [stc](https://github.com/dudykr/stc): 众所周知 tsc 的语法检查和生成声明文件的速度，非常感人。。。而swc作者计划逐步实现tsc的功能, 也就是`stc`这个库，目前swc作者表示没有多余的精力去开发这个库，由社区贡献者来逐步完善。当然我个人也是非常期待`stc`能够正式发布的。

非官方生态：

*   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)：使用swc编译react代码，也是vite的官方插件
*   ...

### 2.[Rome](https://rome.tools/)

Rome 涵盖了编译、代码检测、格式化、打包、 测试框架等工具。它旨在成为 处理 JavaScript 源代码的综合性工具。它的底层也是基于`rust`实现的。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaeda4295bea4a7daf3a0f6d5a60306f~tplv-k3u1fbpfcp-watermark.image?)

虽然它的生态没有发展起来，且不温不火，但是也给前端提供了新的思考方向：**一个库统一前端所有工具链，并且有极高的性能。**

### 3. [Rspack](https://www.rspack.dev/)

大厂还是舍得卷，字节开源的基于`rust`开发的web构建工具，它的底层其实是基于`swc`实现代码编译的。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa344db2eb2749ae845fafd74413ad1c~tplv-k3u1fbpfcp-watermark.image?)

最重要的是， **rspack几乎完美兼容了webpack生态**，从旧项目迁移到rspack改动非常少。当然这个框架也是在字节内部经受住了不少考验，有条件的项目可以试试迁移过去。

### 4. [Turbopack](https://turbo.build/pack)

这个打包工具更加离谱，刚发布时宣称`比Webpack快700倍，比Vite快10倍`，但是很快被尤大打脸。

[尤大亲自回答](https://github.com/yyx990803/vite-vs-next-turbo-hmr/discussions/8)
：作为 Vite 的作者，很高兴看到像 Vercel 这样资金雄厚的公司在改进前端工具方面进行了大量投资。在适用的情况下，甚至未来可能在 Vite 中利用 Turbopack。然而，开源工具的竞争应该建立在公开沟通、公平比较和相互尊重的基础上，令人失望和担忧的是，看到激进的营销使用了精心挑选的、未经同行评审的、边缘误导性的数字，这些数字通常只在商业竞争中出现，相信 Vercel 可以做得更好。



<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/679837d3730e4bc3a13aa1c296e154f8~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />


另外`Turbopack`吸取了`Webpack`的经验，取代`Webpack`是它的最终目标。


然而，`Webpack` 的社区有`丰富的插件`供开发者使用，未来 Turbopack 也会遇到同样的问题。与Vite不同的地方，Turbopack 由同一个作者开发，和 Webpack 是继承关系，但作者表示并不会对 Webpack 和 Turbopack 做 1:1 的兼容，意味着 Webpack 的插件是无法在 Turbopack 上使用，同时作者也表示会将在 Webpack 上广泛被使用的插件移植到 Turbopack。因此 Turbopack 想替代 Webpack，未来还有很长的路要走。



### 5. [Deno](https://deno.land/)

Deno同样使用`Rust`编写，是一个`Javascript`的`运行时平台`。

*   默认支持 ES Modules
*   默认支持 TypeScript
*   尽可能兼容 Web 标准 APIs
*   默认采用沙箱模式运行代码，更安全
*   去中心化第三方模块机制
*   提供标准库

虽然生态远不如Node繁荣，但也不妨碍我们了解它。

### 6. 未来的 `Vue Compiler` ？

两周前，尤大关注了一个仓库

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fda7060271e421c8c78e78df10382fb~tplv-k3u1fbpfcp-watermark.image?)

它是一个正在开发的，使用`Rust`编写的`VueCompiler`，可以想象。

在Vite现有同时存在`esbuild (代码打包) + swc(代码转译)`的情况下，如果再加上`VueCompiler Rust`版本，速度完全可以提升一个新的档次

然而尤大表示，可以更卷一点，想用zig重写Vue编译器 🤣

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/525651dfc5d44a55907733104af93879~tplv-k3u1fbpfcp-watermark.image?" alt="" width="30%" />

### 7. 未来的 `postcss`

前面我们提到的其实都是对`JS`或 `Vue`代码的构建，很难不联想到对`css`的编译，能不能也用rust去做呢？

你能想到的其实都有了， 其中就包括 [postcss-rs](https://github.com/postcss-rs/postcss-rs)
这个库，不用多想，性能方面肯定也是吊打`js`编写的`postcss`。

然而目前仍处于建设阶段，但是依旧让人期待后续的表现。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61e8746504c442d7803720a109171390~tplv-k3u1fbpfcp-watermark.image?)

### 8. 未来的...

`rust`让前端性能的提升有了更多可能，大家可以想象，任何用js都可以用rust编写，并具备原生的性能。

那么我们从另一个视角来看看前端，其实 `前端工程化` 都是对 `assets` 静态资源的处理：

*   javascript：js的编译和打包
*   css：less, scss的编译和打包
*   html：html的解析
*   image：图片压缩、读取等
*   ...

受制于`javascript`性能限制，`rust`未来又会带来什么变化呢，我们拭目以待。

**当然也欢迎大家卷一卷`rust`语言，为前端基建添砖加瓦**

***

前面我们讲了一下`Rust`在前端领域的生态，以及现阶段的发展状况。后面我们将着手了解`WebAssembly`并上手编写`Rust`代码。

## 三、Rust 与 WebAssembly

### 1. WebAssembly 的工作原理

WebAssembly 是一种低级汇编语言，采用紧凑的二进制格式，其运行性能接近原生语言。WebAssembly可以在现代浏览器中运行，不仅提供了比传统JavaScript更高的执行速度，还能更好地利用硬件资源，从而使Web应用程序能够在浏览器中运行更快、更流畅。

WebAssembly不被解释，而是由开发者提前编译为WebAssembly二进制格式，如下图所示。由于变量类型都是预知的，因此浏览器加载WebAssembly文件时，JavaScript引擎无须监测代码。它可以简单地将这段代码的二进制格式编译为机器码。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbb2e550553e4b5b80a3e220edd5899d~tplv-k3u1fbpfcp-watermark.image?)

当然，我们还可以用`Go`、`Rust`等其他语言来编写`wasm`模块。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08bc9701de9e47caad24625d416c0c54~tplv-k3u1fbpfcp-watermark.image?)

例如设计网站`Figma`就在使用 `wasm`， 以提高部分js的运行时性能。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/314a3a214765415683023eb33cf91603~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

### 2. WebAssembly 的兼容性

WebAssembly 于 2015 年公布，2017 年 3 月首次发布，2019 年 12 月 5 日成为 [W3C 推荐标准](https://link.juejin.cn?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fwasm-core-1%2F "https://www.w3.org/TR/wasm-core-1/")。W3C 维护着 WebAssembly 标准，所有主要浏览器供应商和其他相关方都参与了标准的贡献。从 2017 年以来，WebAssembly 的浏览器支持实现了普及。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdd52e331ca34b9a8023432ba4240469~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />

### 3. Rust为什么更适合编写 WebAssembly

Rust被认为是编写WebAssembly的一种理想语言，主要是因为它的设计特点使其与WebAssembly的目标和优势高度契合。

*   **内存安全：** Rust是一门强调内存安全的系统编程语言。它通过引入所有权、借用和生命周期等概念，可以在编译时预防多种常见的内存错误，如空指针、数据竞争等。这在WebAssembly中非常有价值，因为WebAssembly应用程序会与浏览器的内存模型交互，需要确保安全性。
*   **零成本抽象：** Rust提供了高级抽象（如高级数据结构、模式匹配等），而且这些抽象在编译时会被优化为高效的底层代码，这意味着你可以在不牺牲性能的前提下编写可维护且易于理解的代码。
*   **跨平台支持：** Rust支持多个平台，并且可以将代码编译成多种目标架构的二进制文件。这使得使用Rust编写的WebAssembly代码可以在不同的浏览器和平台上运行，而无需太多适配工作。
*   **与WebAssembly集成：** Rust拥有良好的WebAssembly支持，可以直接通过工具链将Rust代码编译成WebAssembly模块。这种集成使得将现有的Rust代码移植到WebAssembly变得相对容易。

## 四、用Rust编写你第一个 WASM 模块

前面说了那么多，如何用rust去编写一个`wasm`模块，并且在页面中调用其中的导出方法呢。

其实已经有非常完善的工具了：[wasm-pack](https://rustwasm.github.io/wasm-pack/)

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d0863aae547417b9bfa20477af9b4d6~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

先来安装一下全局cli命令:

    npm install -g wasm-pack

然后使用`new`命令初始化一个项目:

    wasm-pack new hello-wasm

跟着提示一步步来，你就会看到下面这样的目录结构：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c964ea718ec0429e9851f557db942443~tplv-k3u1fbpfcp-watermark.image?" alt="" width="30%" />

我们需要关心的其实仅仅是`hello-wasm/src/lib.rs`这个文件中的内容:

```rust
mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, hello-wasm!");
}
```

没有学过`rust`并没有关系，我们只需要知道这几个点：

1.  `#[wasm_bindgen]` 实现了`wasm`和`js`之间的交互
2.  `pub`关键字意味着导出了`greet`方法
3.  `alert` 其实就是浏览器中的弹框提示函数

其实还是比较简单的，下面我们来实现一个`斐波那契数列求值方法`，同时我们还会对比用原生js实现的版本，来看看`wasm`的性能是否真的如前面所说的那么优秀。

修改一下代码`hello-wasm/src/lib.rs`：

```rust
mod utils;
use wasm_bindgen::prelude::*;
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n == 0 {
        return 0;
    } else if n == 1 {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```

执行命令打包`wasm`模块：

```shell
wasm-pack build --target=web
```

创建一个`index.html`文件, 动态加载`hello_wasm.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script type="module">
    ;(async () => {
      const { default: init } = await import('./pkg/hello_wasm.js')
      const { fibonacci } = await init()
      console.time('wasm');
      console.log(fibonacci(40));
      console.timeEnd('wasm');



      function fibonacci_js(n) {
        if (n == 0 ){
            return 0;
        } else if (n == 1) {
            return 1;
        } else {
          return fibonacci_js(n - 1) + fibonacci_js(n - 2);
        }
      }
      console.time('js');
      console.log(fibonacci_js(40));
      console.timeEnd('js');
    })()
  </script>
</body>
</html>
```

我们来对比一下运行时的时间：

| Wasm                                                                                                                              | Javascript                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f347fcd94c0a4b11a17a2a43f757d01e~tplv-k3u1fbpfcp-watermark.image?) | ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7316083756948679ed417cf21692558~tplv-k3u1fbpfcp-watermark.image?) |

可以看到在这个例子中， `Wasm`比`Javascript`的执行时间快了`一倍`, 当然本次只是简单的测试，涉及到复杂场景, 可能有更明显的提升。

**对此，我们完全可以在一些对性能有要求的情况中使用`wasm`，因为它真的太快了。**




### 1. Wasm模块如何在多平台使用

`wasm-pack`支持编译成`浏览器`、`nodejs`平台的模块：

```rust
wasm-pack build --target nodejs
```

通过`--target`这个参数，我们就可以指定`wasm`模块在什么环境中使用：

| 选项                    | 说明                                         |
| --------------------- | ------------------------------------------ |
| `--target=web`        | 编译为浏览器平台，使用了`浏览器 esm`模块                    |
| `--target=nodejs`     | 编译为Nodejs平台，使用了`commonjs`模块                |
| `--target=bundler`    | 编译为`esm`模块通用模块                             |
| `--target=no-modules` | 编译为`iife`模块, 可以通过`wasm_bindgen.xxx`来访问模块方法 |


### 2. wasm一定比js执行快吗
**在此之前介绍一下，`web_sys`这个`rust`三方库，提供了在`rust`中操作`dom`的能力。**


我们尝试在`rust的wasm`中获取`dom`
```rust
use std::error::Error;

use wasm_bindgen::prelude::*;
use web_sys::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn get_dom(query: &str) -> Option<Element> {
    log(query);
    let win: Window = window().expect("未获取到window对象");
    log("1");
    let document = win.document().expect("未获取到document对象");
    log("2");

    let dom = document.query_selector(query);

    if let Ok(Some(el)) = dom {
        log(format!("查询到{}", el.tag_name().as_str()).as_str());
        return Some(el);
    } else {
        log(format!("未查询到{}", query).as_str());
        return None;
    }
}

```

然后在`index.html`中，分别用`wasm`和`js`来获取dom

```js
    (async () => {
      await wasm_bindgen()

      console.time('wasm');
      const body = wasm_bindgen.get_dom('body');
      console.log(body);
      console.timeEnd('wasm');

      console.time('js');
      let b = document.querySelector('body');
      console.log(b);
      console.timeEnd('js');
    })()
```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ed2f29b835249babc7bd05d8b4432e9~tplv-k3u1fbpfcp-watermark.image?)


可以发现，`wasm`在操作dom上，比`js`慢了不少。所以在`wasm`中建议不要有原生操作，主要慢在了与js交互的过程。

所以，请在涉及`复杂` 、`大量` 计算中使用它，例如`Canvas`动画，`WebGL`等场景。


### 3. webpack支持wasm模块

+ webpack4 安装 [wasm-module-webpack-plugin](https://github.com/zhouzhi3859/wasm-module-webpack-plugin)

    配置插件
    ```js
    const WasmModuleWebpackPlugin = require('wasm-module-webpack-plugin');
    
    
     {
       // 配置rules
        module: {
            rules: [
                {
                  test: /.m?js$/,
                  // exclude: /(node_modules|bower_components)/, // Do not set {exclude}
                  include: [ '{your_code_dir}', path.join(process.cwd(), './node_modules/{wasm_module_name}') ],
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: [
                      '@babel/plugin-syntax-dynamic-import',
                      // '@babel/plugin-transform-runtime', // Do not use plugin-transform-runtime
                       WasmModuleWebpackPlugin.BabelPlugin
                     ]
                    }
                  }
                }
            ]
        },
        // 配置plugins
        plugins: [
          new WasmModuleWebpackPlugin.WebpackPlugin()
        ]
     }
    ```
+ webpack5：
  ```js
    module.exports = {
        ...,
        experiments: {
            asyncWebAssembly: true,
        },
        module: {
            rules: [
                ...,
               {
                    test: /.wasm$/,
                    type: 'webassembly/async',
                },
             ],
        },
    }
  ```

## 五、用 napi-rs 开发 rust 前端工具链

前面介绍了`wasm-pack`，可以将rust代码编译成`wasm`模块，再通过js引入。其实在NodeJS中有更加直接的方式，那就是`直接执行二进制文件`, 当然这种方式其实并不能在`浏览器环境`中使用的。

那么，怎么能实现编写`rust`，js可以调用的`npm`包呢。

这就不得不介绍 [napi-rs](https://link.juejin.cn?target=https%3A%2F%2Fnapi.rs "https://napi.rs") 这个库了。这个库可以说是 Rust 前端工具链的基石，搭建了 Node.js 和 Rust 之间语言通信的桥梁。在这篇文章中，我们将会使用 napi-rs 来编写一个 Rust 的前端工具，来感受一下 Rust 和 Node.js 中间的交互。

下面我们来动手实践！

### 1. 项目初始化

```js
npm install -g @napi-rs/cli
napi new
```

首先通过上面的命令初始化一个项目，经过一系列的提示创建完成后，生成这样的目录结构：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3216f9b7a7e446469d6cc55147bce163~tplv-k3u1fbpfcp-watermark.image?" alt="" width="30%" />

详细解释下各个目录和文件作用：

*   `src`: 主要用于编写rust代码，也就是我们实际需要提供的代码逻辑都在这里。
*   `index.js`: 这个文件是我们的入口文件，也就是说，外部调用我们的包的时候，实际上是调用了这个文件。
*   `build.rs`: napi-rs 会在编译的时候自动调用这个脚本文件，用来生成一些编译时需要的代码。
*   `npm`: 这个目录下存放我们的二进制文件，napi-rs 会在 GitHub Actions 上自动帮我们编译出不同平台的二进制文件，并且将其放在这个目录下。这些平台在初始化项目的时候我们已经选择好了。

我们先来看下`index.js`入口文件，它是外部调用时的入口，其中涉及一些比较核心的逻辑：

```js
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'hello-napi.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.android-arm64.node')
          } else {
            nativeBinding = require('hello-napi-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'hello-napi.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.android-arm-eabi.node')
          } else {
            nativeBinding = require('hello-napi-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'hello-napi.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.win32-x64-msvc.node')
          } else {
            nativeBinding = require('hello-napi-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'hello-napi.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('hello-napi-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'hello-napi.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('hello-napi-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'hello-napi.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./hello-napi.darwin-universal.node')
      } else {
        nativeBinding = require('hello-napi-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'hello-napi.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.darwin-x64.node')
          } else {
            nativeBinding = require('hello-napi-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'hello-napi.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.darwin-arm64.node')
          } else {
            nativeBinding = require('hello-napi-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'hello-napi.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./hello-napi.freebsd-x64.node')
      } else {
        nativeBinding = require('hello-napi-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'hello-napi.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./hello-napi.linux-x64-musl.node')
            } else {
              nativeBinding = require('hello-napi-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'hello-napi.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./hello-napi.linux-x64-gnu.node')
            } else {
              nativeBinding = require('hello-napi-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'hello-napi.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./hello-napi.linux-arm64-musl.node')
            } else {
              nativeBinding = require('hello-napi-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'hello-napi.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./hello-napi.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('hello-napi-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(
          join(__dirname, 'hello-napi.linux-arm-gnueabihf.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./hello-napi.linux-arm-gnueabihf.node')
          } else {
            nativeBinding = require('hello-napi-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { sum } = nativeBinding

module.exports.sum = sum

```

我们可以注意到，其中有一大段`switch case`的逻辑，其实作用也很明显，会根据操作系统和 CPU 架构来加载不同的二进制文件。

另外，也可以注意到，每块逻辑都有一个判断:

```js
if (localFileExisted) {
  nativeBinding = require('./hello-napi.linux-arm-gnueabihf.node')
} else {
  nativeBinding = require('hello-napi-linux-arm-gnueabihf')
}
```

作用是判断 `本地build的二进制文件` 还是 `npm包`，发布到 npm 后，当执行`npm i @xxx/hello-napi`时，会自动下载`@xxx/hello-napi-darwin-arm64` 对应的二进制npm包 (此处针对不同的CPU架构会不一样)。

我们其实可以看看下载`esbuild`后的效果：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69aaa79607a44a80b92e648bde5fbc32~tplv-k3u1fbpfcp-watermark.image?)

调用过程如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d1ce5e7238549e3a321d8ed8cfeb18c~tplv-k3u1fbpfcp-watermark.image?)
(此图摘自[如何基于 napi-rs 打造 Rust 前端工具链？](https://juejin.cn/post/7243413934765408315?searchId=202308212000304BCD82BB562679DE002A))

### 2. 编写 Rust 代码

同样使用上面的例子，实现并导出一个`斐波那契数列函数`，由于篇幅有限，大家可以尝试更多复杂的功能。

```js
#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn fibonacci(n: u32) -> u32 {
  if n == 0 {
      return 0;
  } else if n == 1 {
      return 1;
  } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
```

然后执行`npm run build`, 目录下生成了一些文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8eeb41b3ed224d7b92bb7d088b70dfdd~tplv-k3u1fbpfcp-watermark.image?)

其中`index.js`导出了我们所需要的`斐波那契数列函数`， 并且生成了类型文件：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d9654c0ba7647989be5b74672962dac~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa7141db2fd1488d895c5f0da29d6426~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />


后续可以直接按照node模块来调用即可。


## 六、结语
Rust作为近些年比较火的语言，解决了很多内存安全和性能问题。让人没想到的是，它可以在前端领域大放异彩。

当然`Rust`语言的学习成本是非常高的，其中`所有权`、`借用`、`生命周期`、`智能指针`、`模式匹配`等概念，还有许多奇特的语法，很容易劝退`前端 到 rust`的同学，我自己也是在学习的过程中。

最后，希望能在后续合适的时机使用`rust`开发一些工具，并用在公司项目，还是挺有价值的。

# 参考

*   [V8是如何执行JavaScript代码的？](https://juejin.cn/post/7249228528574545981?searchId=202308121232440D04C3A8DDC6438A7D5F)

*   [你知道WebAssembly吗？](https://juejin.cn/post/7194623444749647929?searchId=202308141805115660B59C21DBC21103E0)

*   [初识Turbopack](https://juejin.cn/post/7194970654716723255?searchId=20230817205852009E9852DC8EE8261784)

*   [初探webAssembly | 京东物流技术团队](https://juejin.cn/post/7260140790546104375?searchId=202308211627005861A0F4C3FFC5BB2017)

*   [如何基于 napi-rs 打造 Rust 前端工具链？](https://juejin.cn/post/7243413934765408315?searchId=202308212000304BCD82BB562679DE002A)

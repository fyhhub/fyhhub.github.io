---
index: false
---
# 前端性能优化


## 1. 构建速度优化

+ 使用 webpack5 持久化缓存，能明显提高构件速度
+ 使用 `lazyCompilation` 可以懒编译，能明显提高开发构建速度
+ 约束loader的`include`和`exclude`，可以跳过某些编译。
+ 使用`module.noParse` 可以跳过对某些文件的编译，因为有些三方库是已经编译过的，并且没有导出，如jquery
+ 优化`source-map`的配置，使用`eval-cheap-source-map`可以提高构建速度, eval可缓存。
+ 借助`swc`, `esbuild`等高性能编译器，优化构建速度, 例如terser插件可以指定使用`swc`或`esbuild`对代码进行压缩
+ 采用并行压缩，例如：`thread-loader`、`terser`插件自带的`parallel`参数。



## 2. 构建体积优化


+ 尽量使用 `export {}` 导出代码， 若`export default {}`, 会被全部导出, 失去tree-shaking效果

+ 不要使用babel将esm转为cjs， 若代码是`commonjs`代码，将失去tree-shaking优化，需要设置`baberc`配置中的`modules: false`

+ `babel`搭配`transform-runtime`插件，可以将`babel runtime`的代码模块化引入，减少了代码冗余， 同时设置`preset-env`的`useBuiltIns: 'usage'`

+ `babel` 通过`targets`配置可以有效减少`core-js`的体积

+ `lib库` 酌情使用 `sideEffects`，通过设置`package.json`中的`sideEffects`字段，可以告诉webpack哪些是纯的（无副作用），进而对`lib库` tree-shaking

+ 使用 `unplugin-vue-components` 或 `babel-plugin-import` 按需引入组件

+ 可以使用 `/*#__PURE__ */` 标记哪些函数没有副作用，进而tree-shaking

+ 合理配置`split-chunk-plugin`，例如其中的`maxInitialRequests`和`maxAsyncRequests`属性，用于控制异步模块和入口模块的拆分粒度。能有效减少重复打包的模块。如果是Vite或Rollup， 可以借助 `manualChunks` 对代码进行拆包

+ 三方模块，尽量提取为CDN, 可以有效减小包体积大小。

+ gzip压缩

+ 路由懒加载，可以有效减小入口文件的大小，减少白屏率。

+ 使用插件对图片进行压缩




## 3. 网络优化
+ 使用http2的多路复用，可以突破HTTP 1.x 的请求并发限制，头部压缩等功能。
+ 采用CDN
+ prefetch：优先级较低，可以在浏览器空闲时加载一些资源，例如提前加载下一个页面的资源，增加后续的打开速度
+ preload：优先级高，提前加载必要的资源
+ modulepreload: 原生esm可以进行预加载
+ DNS 预解析, 通过 dns-prefetch 技术将这一过程提前，降低 DNS 解析的延迟时间


## 4. 运行时优化
+ 虚拟列表
+ 防抖、节流
+ 图片懒加载，并且使用CDN
+ requestAnimationFrame 优化动画或一些阻塞浏览器渲染的操作
+ 动画操作使用`transform`，减少触发重排与重绘
+ 使用骨架屏优化用户体验
+ v-memo优化列表渲染性能


## 5. 其他优化
+ 服务端渲染



# 总结
总结了一些工作中对项目优化的手段，欢迎补充~